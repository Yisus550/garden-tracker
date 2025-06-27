import { ref, computed } from 'vue';
import { fetchGardensByUserId, addGarden, fetchGardenByIdAndUserId } from '../api/firebase/garden';
import type { GardenType, DraftGardenType } from '../types';
import useStore from '../store';

export function useUserGardens() {
  const store = useStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const userId = computed(() => store.getUserId);
  const userGardens = computed(() => store.getGardens);

  const loadUserGardens = async () => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const gardens = await fetchGardensByUserId(userId.value);
      store.setGardens(gardens);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load gardens';
      console.error('Error loading user gardens:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const createGarden = async (gardenData: DraftGardenType) => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      throw new Error('User not authenticated');
    }

    isLoading.value = true;
    error.value = null;

    try {
      const gardenId = await addGarden(gardenData, userId.value);
      
      await loadUserGardens();
      
      return gardenId;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create garden';
      console.error('Error creating garden:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getUserGarden = async (gardenId: string): Promise<GardenType | null> => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      return null;
    }

    try {
      return await fetchGardenByIdAndUserId(gardenId, userId.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch garden';
      console.error('Error fetching user garden:', err);
      return null;
    }
  };

  return {
    isLoading,
    error,
    userGardens,
    loadUserGardens,
    createGarden,
    getUserGarden,
  };
}

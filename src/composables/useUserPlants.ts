import { ref, computed } from 'vue';
import { 
  fetchPlantsByUserId, 
  fetchPlantsByGardenIdAndUserId, 
  addPlant, 
  fetchPlantByIdAndUserId 
} from '../api/firebase/plants';
import type { PlantType, DraftPlantType } from '../types';
import useStore from '../store';

export function useUserPlants() {
  const store = useStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const userId = computed(() => store.getUserId);
  const userPlants = computed(() => store.getPlants);

  const loadUserPlants = async () => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const plants = await fetchPlantsByUserId(userId.value);
      store.setPlants(plants);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load plants';
      console.error('Error loading user plants:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadPlantsByGarden = async (gardenId: string): Promise<PlantType[]> => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      return [];
    }

    try {
      return await fetchPlantsByGardenIdAndUserId(gardenId, userId.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load garden plants';
      console.error('Error loading garden plants:', err);
      return [];
    }
  };

  const createPlant = async (plantData: DraftPlantType) => {
    console.log('createPlant called with:', plantData);
    console.log('Current userId:', userId.value);
    console.log('Current user:', store.getUser);
    
    if (!userId.value) {
      error.value = 'User not authenticated';
      console.error('User authentication failed - no userId available');
      throw new Error('User not authenticated');
    }

    isLoading.value = true;
    error.value = null;

    try {
      const result = await addPlant(plantData, userId.value);
      
      await loadUserPlants();
      
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create plant';
      console.error('Error creating plant:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const getUserPlant = async (plantId: string): Promise<PlantType | null> => {
    if (!userId.value) {
      error.value = 'User not authenticated';
      return null;
    }

    try {
      return await fetchPlantByIdAndUserId(plantId, userId.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch plant';
      console.error('Error fetching user plant:', err);
      return null;
    }
  };

  return {
    isLoading,
    error,
    userPlants,
    loadUserPlants,
    loadPlantsByGarden,
    createPlant,
    getUserPlant,
  };
}

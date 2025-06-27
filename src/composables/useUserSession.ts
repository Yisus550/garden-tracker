import { onMounted } from 'vue';
import useStore from '../store';
import type { UserDataType } from '../types';

export function useUserSession() {
  const store = useStore();

  const initializeSession = () => {
    console.log('Initializing user session...');
    const savedUser = localStorage.getItem('user');
    console.log('Saved user data:', savedUser);
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser) as UserDataType;
        console.log('Parsed user data:', userData);
        store.setUser(userData);
        console.log('User set in store:', store.getUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('No saved user data found');
    }
  };

  const clearSession = () => {
    localStorage.removeItem('user');
    store.logout();
  };

  onMounted(() => {
    initializeSession();
  });

  return {
    initializeSession,
    clearSession,
  };
}

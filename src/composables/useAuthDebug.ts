import { computed } from 'vue';
import useStore from '../store';

export function useAuthDebug() {
  const store = useStore();

  const debugInfo = computed(() => ({
    user: store.getUser,
    userId: store.getUserId,
    isAuthenticated: store.getIsAuthenticated,
    localStorage: localStorage.getItem('user'),
  }));

  const logAuthState = () => {
    console.group('🔍 Auth Debug Info');
    console.log('Current User:', debugInfo.value.user);
    console.log('User ID:', debugInfo.value.userId);
    console.log('Is Authenticated:', debugInfo.value.isAuthenticated);
    console.log('LocalStorage User:', debugInfo.value.localStorage);
    console.groupEnd();
  };

  return {
    debugInfo,
    logAuthState,
  };
}

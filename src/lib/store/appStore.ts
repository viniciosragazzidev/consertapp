// store/appStore.ts
'use client';

import { useOrgStore } from './orgStore';

export const useAppStore = () => {
  return {
    org: useOrgStore(),
    // Adicione outros stores aqui conforme necessário
  };
};

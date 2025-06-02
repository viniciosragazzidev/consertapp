// store/orgStore.ts
'use client';

import { Organization } from '@/generated/prisma';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OrgState {
  currentOrg: Organization| null;
  setCurrentOrg: (org: Organization) => void;
  clearOrg: () => void;
}

export const useOrgStore = create<OrgState>()(
  persist(
    (set) => ({
      currentOrg: null,
      setCurrentOrg: (org) => set({ currentOrg: org }),
      clearOrg: () => set({ currentOrg: null }),
    }),
    {
      name: 'org-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

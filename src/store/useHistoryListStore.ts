import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ListHistory,} from '.'
const storeCreator: StateCreator<ListHistory<any[]>> = (set) => ({
    data: [],
    setData: ((data) => set(() => ({ data }))),
})
export const useHistoryListStore = create(
    persist(storeCreator, {
        name: 'word-list-storage',
        storage: createJSONStorage(() => localStorage)
    })
)
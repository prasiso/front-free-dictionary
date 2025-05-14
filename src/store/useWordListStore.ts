import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ListState, Result } from '.'
const storeCreator: StateCreator<ListState<string[]>> = (set) => ({
    result: {
        page: 1,
        entrie: '',
        data: [],
        limit: 10,
        search: '',
    },
    setResult:
        (body: Partial<Result<string[]>>) => set((state) => ({ result: { ...state.result, ...body }, })),
    reset: () => set({
        result: {
            page: 1,
            entrie: '',
            data: [],
            limit: 10,
            search: '',
        },
    })
})
export const useWordListStore = create(
    persist(storeCreator, {
        name: 'word-list-storage',
        storage: createJSONStorage(() => localStorage)
    })
)
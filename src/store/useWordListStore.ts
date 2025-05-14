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
        tab: 'word',
        totalDocs: 0,
        hasPrev: false,
        hasNext: false
    },
    setResult:
        (body: Partial<Result<string[]>>) => set((state) => ({ result: { ...state.result, ...body }, })),
    resetSearch: () => set((state) => {
        return {
            result: {
                page: 1,
                hasPrev: false,
                hasNext: false,
                entrie: state.result.entrie,
                data: [],
                tab: state.result.tab,
                limit: 50,
                search: state.result.search,
            }
        }
    }),
    reset: () => set({
        result: {
            page: 1,
            hasPrev: false,
            hasNext: false,
            tab: 'word',
            totalDocs: 0,
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
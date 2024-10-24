import { create } from "zustand"

export type FilterStore = {
  search: string
  onSearchChange: (search: string) => void
}

export const useFilterStore = create<FilterStore>(set => {
  return {
    search: "",
    onSearchChange: (search: string) => {
      set({ search })
    },
  }
})

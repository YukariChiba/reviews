import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    viewMode: 'card' as 'card' | 'list',
    type: null as string | null,
    status: null as string | null,
    scoreRange: [0, 10] as[number, number],
    recommendOnly: false,
    sortBy: 'date',
    sortOrder: 'desc'
  })
})

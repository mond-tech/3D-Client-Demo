import { proxy, useSnapshot } from 'valtio'

export const store = proxy({ open: false })
export const useStore = () => useSnapshot(store)

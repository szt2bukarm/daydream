import { create } from 'zustand'

interface Store {
    pageTransition: boolean;
    setPageTransition: (pageTransition: boolean) => void

    loaded: boolean;
    setLoaded: (loaded: boolean) => void

    showPlayer: boolean;
    setShowPlayer: (showPlayer: boolean) => void

    isMobile: boolean;
    setIsMobile: (isMobile: boolean) => void
}

export const useStore = create<Store>((set) => ({
    pageTransition: false,
    setPageTransition: (pageTransition) => set({ pageTransition }),

    loaded: false,
    setLoaded: (loaded) => set({ loaded }),

    showPlayer: false,
    setShowPlayer: (showPlayer) => set({ showPlayer }),

    isMobile: false,
    setIsMobile: (isMobile) => set({ isMobile })
}))
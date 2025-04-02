import { create } from 'zustand'

interface Store {
    pageTransition: boolean;
    setPageTransition: (pageTransition: boolean) => void

    fadelayer: any;
    setFadeLayer: (fadelayer: any) => void

    scrollPos: number;
    setScrollPos: (scrollPos: number) => void,

    loaded: boolean;
    setLoaded: (loaded: boolean) => void
}

export const useStore = create<Store>((set) => ({
    pageTransition: false,
    setPageTransition: (pageTransition) => set({ pageTransition }),

    fadelayer: null,
    setFadeLayer: (fadelayer) => set({ fadelayer }),

    scrollPos: 0,
    setScrollPos: (value) => set({ scrollPos: value }),

    loaded: false,
    setLoaded: (loaded) => set({ loaded })
}))
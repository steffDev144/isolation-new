// store/aboutStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface SliderItem {
    id: number;
    urlImage: string;
}

export interface AboutData {
    id: string;
    title_section_one?: string;
    title_section_two?: string;
    descr_section_one?: string;
    descr_section_two?: string;
    text_link?: string;
    slider_scroll?: SliderItem[];
}

interface AboutState {
    info: AboutData[];
    load: boolean;
    error: string | null;
    fetchInfo: () => Promise<void>;
    getTitle: () => AboutData | undefined;
    getDescription: () => AboutData | undefined;
    getSlider: () => AboutData | undefined;
    clearError: () => void;
}

export const useAbout = create<AboutState>((set, get) => ({
    info: [],
    load: false,
    error: null,

    fetchInfo: async (): Promise<void> => {
        set({ load: true, error: null });

        try {
            const { data } = await axios.get<AboutData[]>(
                "https://0275d3dd1dabf767.mokky.dev/about-section"
            );
            set({ info: data, load: false });
        } catch (err) {
            console.error('Error fetching about data:', err);
            set({
                error: 'Failed to fetch about data',
                load: false,
                info: []
            });
        }
    },

    getTitle: (): AboutData | undefined => {
        return get().info.find((item: AboutData) => item.id === "Title");
    },

    getDescription: (): AboutData | undefined => {
        return get().info.find((item: AboutData) => item.id === "Descr");
    },

    getSlider: (): AboutData | undefined => {
        return get().info.find((item: AboutData) => item.id === "Slider");
    },

    clearError: (): void => {
        set({ error: null });
    }
}));
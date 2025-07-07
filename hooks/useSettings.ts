import { useState, useEffect } from 'react';
import type { Settings } from '../types';

const defaultSettings: Settings = {
    tagCount: 5,
    maxTitleLength: 60,
    maxDescriptionLength: 155,
};

export const useSettings = (): [Settings, React.Dispatch<React.SetStateAction<Settings>>] => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('seoAppSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                // Ensure all keys are present, falling back to defaults if not
                return { ...defaultSettings, ...parsed };
            }
        } catch (error) {
            console.error("Failed to parse settings from localStorage", error);
        }
        return defaultSettings;
    });

    useEffect(() => {
        try {
            localStorage.setItem('seoAppSettings', JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save settings to localStorage", error);
        }
    }, [settings]);

    return [settings, setSettings];
};

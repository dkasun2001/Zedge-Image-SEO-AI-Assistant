import { useState, useEffect, useCallback } from 'react';

export const useApiKey = (): [string, (key: string) => void, () => void] => {
    const [apiKey, setApiKeyInternal] = useState<string>('');

    useEffect(() => {
        try {
            const savedKey = localStorage.getItem('geminiApiKey');
            if (savedKey) {
                setApiKeyInternal(savedKey);
            }
        } catch (error) {
            console.error("Failed to read API key from localStorage", error);
        }
    }, []);

    const saveApiKey = useCallback((key: string) => {
        if (!key) return;
        try {
            localStorage.setItem('geminiApiKey', key);
            setApiKeyInternal(key);
        } catch (error) {
            console.error("Failed to save API key to localStorage", error);
        }
    }, []);
    
    const removeApiKey = useCallback(() => {
         try {
            localStorage.removeItem('geminiApiKey');
            setApiKeyInternal('');
        } catch (error) {
            console.error("Failed to remove API key from localStorage", error);
        }
    }, []);

    return [apiKey, saveApiKey, removeApiKey];
};

import React from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { SettingsPanel } from '../components/SettingsPanel';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { FAQ } from '../components/FAQ';
import { AdBanner } from '../components/AdBanner';
import type { ImageData, SeoData, Settings } from '../types';

interface HomePageProps {
    settings: Settings;
    onSettingsChange: React.Dispatch<React.SetStateAction<Settings>>;
    apiKey: string;
    onSaveApiKey: (key: string) => void;
    onRemoveApiKey: () => void;
    images: ImageData[];
    seoResults: Record<string, SeoData | { error: string }>;
    loadingStates: Record<string, boolean>;
    onImagesUpload: (newImages: ImageData[]) => void;
    onGenerateSeo: (image: ImageData, settings: Settings) => void;
    onRemoveImage: (id: string) => void;
    onRemoveAll: () => void;
    onGenerateAllSeo: () => void;
    onDownloadCsv: () => void;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
    const {
        settings, onSettingsChange, apiKey, onSaveApiKey, onRemoveApiKey,
        images, seoResults, loadingStates, onImagesUpload,
        onGenerateSeo, onRemoveImage, onRemoveAll, onGenerateAllSeo, onDownloadCsv
    } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-8 space-y-8">
                    <SettingsPanel 
                        settings={settings} 
                        onSettingsChange={onSettingsChange}
                        apiKey={apiKey}
                        onSaveApiKey={onSaveApiKey}
                        onRemoveApiKey={onRemoveApiKey}
                    />
                    <AdBanner type="tower" />
                </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
                <AdBanner type="banner" />
                <ImageUploader onImagesUpload={onImagesUpload} />

                {images.length > 0 && (
                    <ResultsDisplay
                        images={images}
                        seoResults={seoResults}
                        loadingStates={loadingStates}
                        settings={settings}
                        apiKey={apiKey}
                        onGenerate={onGenerateSeo}
                        onRemove={onRemoveImage}
                        onRemoveAll={onRemoveAll}
                        onGenerateAll={onGenerateAllSeo}
                        onDownloadCsv={onDownloadCsv}
                    />
                )}
                <FAQ />
                <AdBanner type="banner" />
            </div>
        </div>
    );
};
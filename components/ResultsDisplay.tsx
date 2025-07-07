import React, { useState } from 'react';
import type { ImageData, SeoData, Settings } from '../types';
import { Spinner } from './Spinner';
import { IconCopy, IconTrash, IconCheck, IconExclamationTriangle, IconWand, IconDownload } from './Icon';

interface ResultsDisplayProps {
    images: ImageData[];
    seoResults: Record<string, SeoData | { error: string }>;
    loadingStates: Record<string, boolean>;
    settings: Settings;
    apiKey: string;
    onGenerate: (image: ImageData, settings: Settings) => void;
    onRemove: (id: string) => void;
    onRemoveAll: () => void;
    onGenerateAll: () => void;
    onDownloadCsv: () => void;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors duration-200">
            {copied ? <IconCheck className="h-4 w-4 text-green-400" /> : <IconCopy className="h-4 w-4" />}
        </button>
    );
};

const ResultCard: React.FC<{ 
    image: ImageData;
    result: SeoData | { error: string } | undefined;
    isLoading: boolean;
    settings: Settings;
    apiKey: string;
    onGenerate: (image: ImageData, settings: Settings) => void;
    onRemove: (id: string) => void;
}> = ({ image, result, isLoading, settings, apiKey, onGenerate, onRemove }) => {
    const seoData = result && !('error' in result) ? result : null;
    const errorData = result && 'error' in result ? result : null;
    const canGenerate = !!apiKey;

    return (
        <div className="bg-slate-800/50 rounded-xl ring-1 ring-slate-700 overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4 p-4">
                    <img src={image.base64} alt={image.file.name} className="rounded-lg object-cover w-full h-48" />
                    <div className="mt-3 text-xs text-slate-400 space-y-1">
                        <p className="font-medium text-slate-300 truncate" title={image.file.name}>{image.file.name}</p>
                        <p>{(image.file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>

                <div className="md:col-span-8 p-4 md:pl-0 flex flex-col">
                    {isLoading && (
                        <div className="flex-grow flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    {!isLoading && !result && (
                         <div className="flex-grow flex items-center justify-center">
                            <button 
                                onClick={() => onGenerate(image, settings)} 
                                disabled={!canGenerate}
                                title={!canGenerate ? "Please set your API key in the settings" : "Generate SEO"}
                                className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed">
                                Generate SEO
                            </button>
                        </div>
                    )}
                    {errorData && (
                        <div className="flex-grow flex flex-col items-center justify-center text-center bg-red-900/20 rounded-lg p-4">
                             <IconExclamationTriangle className="h-8 w-8 text-red-400 mb-2"/>
                            <p className="text-sm font-semibold text-red-400">Generation Failed</p>
                            <p className="text-xs text-slate-400 mt-1">{errorData.error}</p>
                        </div>
                    )}
                    {seoData && (
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold text-cyan-400">Title</h4>
                                    <CopyButton textToCopy={seoData.title} />
                                </div>
                                <p className="text-sm text-slate-300 bg-slate-700/50 p-2 rounded">{seoData.title}</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold text-cyan-400">Description</h4>
                                    <CopyButton textToCopy={seoData.description} />
                                </div>
                                <p className="text-sm text-slate-300 bg-slate-700/50 p-2 rounded">{seoData.description}</p>
                            </div>
                            <div>
                                 <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold text-cyan-400">Tags</h4>
                                    <CopyButton textToCopy={seoData.tags.join(', ')} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {seoData.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-xs font-mono bg-slate-700 text-slate-300 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
             <button onClick={() => onRemove(image.id)} className="absolute top-2 right-2 p-1.5 bg-slate-800/50 hover:bg-red-500/50 rounded-full text-slate-400 hover:text-white transition-colors">
                <IconTrash className="h-4 w-4" />
            </button>
        </div>
    );
};


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ images, seoResults, loadingStates, settings, apiKey, onGenerate, onRemove, onRemoveAll, onGenerateAll, onDownloadCsv }) => {
    const imagesToProcessCount = images.filter(image => !seoResults[image.id]).length;
    const isGenerating = Object.values(loadingStates).some(Boolean);
    const canGenerateAll = imagesToProcessCount > 0 && !isGenerating && !!apiKey;
    const generateAllTitle = !apiKey ? "Please set your API key first" : (isGenerating ? "Generation in progress..." : (imagesToProcessCount === 0 ? "All images processed" : "Generate for all pending images"));
    const hasSuccessfulResults = Object.values(seoResults).some(res => res && !('error' in res));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
                 <h2 className="text-2xl font-bold text-white">Uploaded Images</h2>
                 <div className="flex items-center space-x-2">
                    <button 
                        onClick={onGenerateAll} 
                        disabled={!canGenerateAll}
                        title={generateAllTitle}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed">
                        <IconWand className="h-4 w-4"/>
                        <span>Generate All</span>
                    </button>
                    <button 
                        onClick={onDownloadCsv} 
                        disabled={!hasSuccessfulResults}
                        title={hasSuccessfulResults ? "Download all results as CSV" : "No results to download"}
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-slate-600 hover:bg-green-400 rounded-lg transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed">
                        <IconDownload className="h-4 w-4"/>
                        <span>Download CSV</span>
                    </button>
                    <button 
                        onClick={onRemoveAll} 
                        className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-red-500/50 rounded-lg transition-colors">
                        <IconTrash className="h-4 w-4"/>
                        <span>Clear All</span>
                    </button>
                 </div>
            </div>
            <div className="space-y-4">
                {images.map(image => (
                    <ResultCard
                        key={image.id}
                        image={image}
                        result={seoResults[image.id]}
                        isLoading={loadingStates[image.id] || false}
                        settings={settings}
                        apiKey={apiKey}
                        onGenerate={onGenerate}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
};
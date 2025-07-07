import React, { useState } from 'react';
import type { Settings } from '../types';
import { IconKey, IconSave, IconTrash, IconCheck, IconExclamationTriangle, IconQuestionMarkCircle } from './Icon';
import { validateApiKey } from '../services/geminiService';
import { MiniSpinner } from './Spinner';


interface SettingsPanelProps {
    settings: Settings;
    onSettingsChange: React.Dispatch<React.SetStateAction<Settings>>;
    apiKey: string;
    onSaveApiKey: (key: string) => void;
    onRemoveApiKey: () => void;
}

const SettingInput: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, min, max, step, onChange }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">{label}</label>
            <span className="px-2 py-0.5 text-xs font-mono bg-slate-700 text-cyan-400 rounded">{value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb"
        />
        <style>{`
          .range-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: #22d3ee;
            cursor: pointer;
            border-radius: 50%;
          }
          .range-thumb::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #22d3ee;
            cursor: pointer;
            border-radius: 50%;
          }
        `}</style>
    </div>
);

const ApiKeyGuide: React.FC = () => {
    const [showGuide, setShowGuide] = useState(false);

    return (
        <div>
            <button
                onClick={() => setShowGuide(s => !s)}
                className="flex items-center space-x-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors w-full text-left"
            >
                <IconQuestionMarkCircle className="h-4 w-4 flex-shrink-0" />
                <span>How do I get a Gemini API Key?</span>
                <span className="flex-grow text-right">{showGuide ? '▲' : '▼'}</span>
            </button>
            {showGuide && (
                 <div className="mt-3 p-4 bg-slate-900/50 rounded-lg text-sm ring-1 ring-slate-700/50">
                    <h4 className="font-semibold text-slate-200 mb-2">Steps to create your API Key:</h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs">
                        <li>
                            Go to <a href="https://aistudio.google.com/app" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-medium">Google AI Studio</a>.
                        </li>
                        <li>
                            Click the <strong>"Get API key"</strong> button, usually in the top left menu.
                        </li>
                        <li>
                            Select <strong>"Create API key"</strong>. You might be asked to create it in a new Google Cloud project.
                        </li>
                        <li>
                            Your new key will be generated. Click the copy icon next to it.
                        </li>
                        <li>
                            Return here, paste the key into the input field above, and click "Save Key".
                        </li>
                    </ol>
                </div>
            )}
        </div>
    );
};

const ApiKeyManager: React.FC<{
    apiKey: string;
    onSave: (key: string) => void;
    onRemove: () => void;
}> = ({ apiKey, onSave, onRemove }) => {
    const [keyInput, setKeyInput] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const isKeySet = !!apiKey;

    const handleSave = async () => {
        if (!keyInput.trim()) return;

        setIsValidating(true);
        setValidationError(null);

        const { isValid, error } = await validateApiKey(keyInput.trim());

        setIsValidating(false);

        if (isValid) {
            onSave(keyInput.trim());
            setKeyInput('');
        } else {
            setValidationError(error);
        }
    };
    
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <IconKey className="h-5 w-5 text-cyan-400"/>
                <span>API Key</span>
            </h3>
            {isKeySet ? (
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-green-400 p-2 bg-green-500/10 rounded-md">
                        <IconCheck className="h-5 w-5 flex-shrink-0" />
                        <span>API Key is saved and active.</span>
                    </div>
                    <button 
                        onClick={onRemove}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-red-500/50 rounded-lg transition-colors">
                        <IconTrash className="h-4 w-4"/>
                        <span>Remove API Key</span>
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-amber-400 p-2 bg-amber-500/10 rounded-md">
                         <IconExclamationTriangle className="h-5 w-5 flex-shrink-0" />
                        <span>API Key is required for generation.</span>
                    </div>
                    <input 
                        type="password"
                        value={keyInput}
                        onChange={(e) => {
                            setKeyInput(e.target.value);
                            if (validationError) setValidationError(null);
                        }}
                        placeholder="Enter your Google Gemini API Key"
                        className={`w-full bg-slate-700/50 border rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:border-cyan-500 transition-colors ${
                            validationError ? 'border-red-500/80 ring-red-500/50' : 'border-slate-600 focus:ring-cyan-500'
                        }`}
                    />
                     {validationError && (
                        <p className="text-xs text-red-400 flex items-center space-x-1.5 -mt-1">
                           <IconExclamationTriangle className="h-3 w-3 flex-shrink-0" />
                           <span>{validationError}</span>
                        </p>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={!keyInput.trim() || isValidating}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed">
                        {isValidating ? (
                            <>
                               <MiniSpinner />
                               <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <IconSave className="h-4 w-4"/>
                                <span>Save Key</span>
                            </>
                        )}
                    </button>
                    <hr className="border-slate-700/50 pt-2" />
                    <ApiKeyGuide />
                </div>
            )}
        </div>
    );
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, apiKey, onSaveApiKey, onRemoveApiKey }) => {
    const handleChange = (field: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange(prev => ({ ...prev, [field]: parseInt(e.target.value, 10) }));
    };

    return (
        <div className="bg-slate-800/50 rounded-xl p-6 ring-1 ring-slate-700 space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Generation Settings</h2>
                <div className="space-y-6">
                    <SettingInput
                        label="Number of Tags"
                        value={settings.tagCount}
                        min={1}
                        max={50}
                        step={1}
                        onChange={handleChange('tagCount')}
                    />
                    <SettingInput
                        label="Max Title Length"
                        value={settings.maxTitleLength}
                        min={20}
                        max={200}
                        step={5}
                        onChange={handleChange('maxTitleLength')}
                    />
                    <SettingInput
                        label="Max Description Length"
                        value={settings.maxDescriptionLength}
                        min={50}
                        max={200}
                        step={10}
                        onChange={handleChange('maxDescriptionLength')}
                    />
                </div>
            </div>
            <hr className="border-slate-700" />
            <ApiKeyManager 
                apiKey={apiKey}
                onSave={onSaveApiKey}
                onRemove={onRemoveApiKey}
            />
        </div>
    );
};
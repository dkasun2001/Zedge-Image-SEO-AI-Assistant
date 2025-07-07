import React from 'react';
import { AdBanner } from '../components/AdBanner';

export const GuidePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl ring-1 ring-slate-700 p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">How to Use the Image SEO AI Assistant</h1>
                <p className="text-slate-300 leading-relaxed">
                    Welcome to the guide! This page will walk you through the simple steps to get the most out of our AI-powered SEO tool.
                </p>
            </div>
            
            <div className="space-y-6 text-slate-300">
                <div>
                    <h2 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3">Step 1: Set Your API Key</h2>
                    <p className="leading-relaxed">
                        Before you can generate any SEO data, you need to provide your Google Gemini API Key. If you don't have one, follow the guide in the settings panel on the main page.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 mt-3 pl-4 text-sm">
                        <li>Navigate to the <strong className="text-cyan-400">Home</strong> page.</li>
                        <li>In the left-hand "Generation Settings" panel, find the "API Key" section.</li>
                        <li>Paste your key into the input field and click "Save Key."</li>
                        <li>The app will validate your key. A green checkmark indicates success.</li>
                    </ol>
                </div>
                
                <AdBanner type="banner" />

                <div>
                    <h2 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3">Step 2: Customize Generation Settings</h2>
                    <p className="leading-relaxed">
                        In the same settings panel, you can customize the output to fit your needs. Adjust the sliders for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 pl-4 text-sm">
                        <li><strong>Number of Tags:</strong> Control how many tags the AI should generate.</li>
                        <li><strong>Max Title Length:</strong> Set a character limit for the image title.</li>
                        <li><strong>Max Description Length:</strong> Set a character limit for the meta description.</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3">Step 3: Upload Your Images</h2>
                    <p className="leading-relaxed">
                        You have three easy ways to upload your images:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 pl-4 text-sm">
                        <li><strong>Drag & Drop:</strong> Simply drag your image files from your computer and drop them into the upload box.</li>
                        <li><strong>Browse Files:</strong> Click the "Browse Files" button to open a file dialog and select your images.</li>
                        <li><strong>Paste from Clipboard:</strong> Copy an image (e.g., from a screenshot tool) and press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">V</kbd> to paste it.</li>
                    </ul>
                </div>

                <AdBanner type="banner" />

                 <div>
                    <h2 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3">Step 4: Generate and Review</h2>
                    <p className="leading-relaxed">
                        Once your images are uploaded, you have two options for generation:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 pl-4 text-sm">
                        <li><strong>Generate Individually:</strong> Click the "Generate SEO" button on any individual image card.</li>
                        <li><strong>Generate All:</strong> Click the "Generate All" button in the results header to process all pending images at once.</li>
                    </ul>
                    <p className="mt-3 leading-relaxed">
                        The AI will analyze each image and fill in the Title, Description, and Tags. You can easily copy any field using the copy icon next to it.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-3 border-l-4 border-cyan-400 pl-3">Step 5: Download Your Data</h2>
                    <p className="leading-relaxed">
                        After generating SEO for one or more images, the "Download CSV" button will become active. Click it to download a CSV file containing all the generated data, perfectly formatted for use in spreadsheets or for uploading to your CMS.
                    </p>
                </div>
            </div>
        </div>
    );
};
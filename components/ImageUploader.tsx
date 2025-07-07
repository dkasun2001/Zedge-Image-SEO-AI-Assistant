import React, { useState, useCallback, useEffect } from 'react';
import type { ImageData } from '../types';
import { IconUpload, IconClipboard } from './Icon';

interface ImageUploaderProps {
    onImagesUpload: (images: ImageData[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const processFiles = useCallback((files: FileList) => {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) return;

        const newImagesData: ImageData[] = [];
        let loadedCount = 0;

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    newImagesData.push({
                        id: `${file.name}-${Date.now()}-${Math.random()}`,
                        file,
                        base64: e.target.result
                    });
                }
                loadedCount++;
                if (loadedCount === imageFiles.length) {
                    onImagesUpload(newImagesData);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [onImagesUpload]);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    }, [processFiles]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
    };

    const handlePaste = useCallback((e: ClipboardEvent) => {
        if (e.clipboardData && e.clipboardData.files.length > 0) {
            processFiles(e.clipboardData.files);
        }
    }, [processFiles]);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    return (
        <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-cyan-400 bg-slate-800' : 'border-slate-600 hover:border-slate-500'}`}
        >
            <div className="p-8 text-center">
                <IconUpload className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-lg font-semibold text-slate-300">Drag & drop images here</p>
                <p className="mt-1 text-sm text-slate-400">or click to browse</p>
                
                <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
                 <label htmlFor="file-upload" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 cursor-pointer">
                    Browse Files
                </label>
                <div className="mt-4 text-xs text-slate-500 flex items-center justify-center space-x-2">
                    <IconClipboard className="h-4 w-4" />
                    <span>You can also paste images from your clipboard</span>
                </div>
            </div>
        </div>
    );
};

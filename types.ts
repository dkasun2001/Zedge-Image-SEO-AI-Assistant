export interface Settings {
    tagCount: number;
    maxTitleLength: number;
    maxDescriptionLength: number;
}

export interface ImageData {
    id: string;
    file: File;
    base64: string;
}

export interface SeoData {
    title: string;
    description: string;
    tags: string[];
}

export type Page = 'home' | 'about' | 'contact' | 'terms' | 'guide';
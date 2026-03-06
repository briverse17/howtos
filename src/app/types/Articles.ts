export interface NoteMetadata {
    title?: string;
    description?: string;
    date?: string;
    category?: string;
    tags?: string[];
    status?: string;
    featured?: boolean;
    toc?: boolean;
    related?: string[];
}

export type ArticlesType = Record<string, string>;

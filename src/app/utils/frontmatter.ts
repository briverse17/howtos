import { NoteMetadata } from '../types/Articles';

export interface ParsedFrontmatter {
    data: NoteMetadata;
    content: string;
}

export function parseFrontmatter(markdown: string, fallbackFileName?: string): ParsedFrontmatter {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    const data: NoteMetadata = {};
    let content = markdown;

    // We do not have frontmatter in this file
    if (!match) {
        if (fallbackFileName) {
            data.title = fallbackFileName.replace(/\.md$/i, '').replace(/[-_]/g, ' ');
        }
    } else {
        const frontmatterBlock = match[1];
        content = match[2].trimStart();

        for (const line of frontmatterBlock.split('\n')) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Strip surrounding quotes
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            if (key === 'tags' || key === 'related') {
                if (value.startsWith('[') && value.endsWith(']')) {
                    data[key] = value.slice(1, -1).split(',').map((t) => {
                        let s = t.trim();
                        if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) s = s.slice(1, -1);
                        return s;
                    }).filter(Boolean);
                }
            } else if (key === 'featured' || key === 'toc') {
                data[key] = value.toLowerCase() === 'true';
            } else if (key === 'title' || key === 'description' || key === 'date' || key === 'category' || key === 'status') {
                data[key] = value;
            }
        }
    }

    // Apply default fallbacks
    data.title = data.title || (fallbackFileName ? fallbackFileName.replace(/\.md$/i, '').replace(/[-_]/g, ' ') : 'Untitled Note');
    data.category = data.category || 'Uncategorized';
    data.tags = data.tags || [];

    return { data, content };
}

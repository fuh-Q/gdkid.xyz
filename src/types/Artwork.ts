export interface RawArtwork {
    date: string;
    description?: string | string[];
    links: string[];
}

export interface Artwork {
    date: Date;
    description: string;
    links: string[];
}

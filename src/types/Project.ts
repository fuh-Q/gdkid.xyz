export interface ImageScrollerProps {
    images: [string, string][];
}

export interface Project {
    name: string;
    description: string[] | string;
    images?: [string, string][];
    inviteUrl?: string;
}

export interface RawNote {
    id: number,
    timestamp: string,
    note: string,
}

export interface Note {
    id: number,
    timestamp: Date,
    note: string,
}

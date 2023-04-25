import type { MouseEventHandler } from "react";

export interface RawScream {
    day: string;
    notes?: string;
}

export interface Scream {
    day: Date;
    notes?: string;
}

export interface CalendarProps {
    year: number;
    month: number;
    marks: Scream[];
}

export interface CalendarParentProps {
    tracking: Date;
    yearCache: { [key: number]: Scream[] };
    inStartBounds: boolean;
    inEndBounds: boolean;
    arrowClickHandler: MouseEventHandler<HTMLButtonElement>;
}

export interface ArrowProps {
    direction: number;
    invisible: boolean;
    callback: MouseEventHandler<HTMLButtonElement>;
}

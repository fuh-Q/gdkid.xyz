import CalendarContent from "../components/Calendar";
import Metadata from "../components/Metadata";
import NoteItem from "../components/NoteItem";
import SimplePage from "../components/SimplePage";
import SitePage from "../components/SitePage";
import type { RawScream, Scream } from "../types/ScreamCalendar";

import { useState } from "react";
import type { MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

type YearCache = { [key: number]: Scream[] };

function deserializeScreamDate(data: RawScream[]): Scream[] {
    return data.map((item) => {
        return {
            day: new Date(item.day),
            notes: item.notes,
        };
    });
}

async function fetchYear(year: number, parse: false): Promise<RawScream[] | null>;
async function fetchYear(year: number, parse: true): Promise<Scream[] | null>;
async function fetchYear(year: number, parse: boolean): Promise<(Scream[] | RawScream[]) | null> {
    const req = await fetch(`http://localhost:3000/api/screamdates?year=${year}`);
    if (req.status == 429) {
        return null;
    }

    const data: RawScream[] = await req.json();
    if (!parse) {
        return data;
    }

    return deserializeScreamDate(data);
}

export default function Calendar({ data }: { data: RawScream[] | null }) {
    if (!data) {
        return <SimplePage msg="stop spamming lol" head="🛑" />;
    }

    const rn = new Date(),
        year = rn.getFullYear(),
        month = rn.getMonth(),
        initMarks = deserializeScreamDate(data),
        [tracking, setTracking] = useState<Date>(rn),
        [inStartBounds, setInStartBounds] = useState<boolean>(isWithinStartBounds(tracking)),
        [inEndBounds, setInEndBounds] = useState<boolean>(false),
        [yearCache, _] = useState<YearCache>({ [year]: initMarks }),
        [marks, setMarks] = useState<Scream[]>(initMarks),
        [notedMarks, setNotedMarks] = useState<Scream[]>(marks.filter((m) => notedMarkFilter(m)));

    function notedMarkFilter(m: Scream, yr = year, mo = month) {
        // list of noted marks are for the full year, here we narrow it down to the month
        return m.notes && m.day.getFullYear() === yr && m.day.getMonth() === mo;
    }

    function isWithinStartBounds(current: Date) {
        // we only started counting from february, 2023
        return current.getFullYear() >= 2023 && current.getMonth() > 1;
    }

    function isOutOfEndBounds(current: Date) {
        // out of bounds if we are past the current date
        return current.getFullYear() >= year && current.getMonth() >= month;
    }

    async function arrowClickHandler(e: MouseEvent<HTMLButtonElement>) {
        const thisYear = tracking.getFullYear();

        const newDate = new Date(tracking.toISOString());
        newDate.setMonth(tracking.getMonth() + Number.parseInt(e.currentTarget.id));

        // if we're switching into a different year
        const newYear = newDate.getFullYear();
        if (thisYear !== newYear) {
            if (!yearCache[newYear]) {
                const newData: Scream[] | null = await fetchYear(newYear, true);

                if (newData) {
                    yearCache[newYear] = newData;
                } else {
                    return; // hit a 429, nothing will happen
                }
            }

            setMarks(yearCache[newYear]);
        }

        setInStartBounds(isWithinStartBounds(newDate));
        setInEndBounds(!isOutOfEndBounds(newDate));

        setTracking(newDate);
        setNotedMarks(marks.filter((m) => notedMarkFilter(m, newDate.getFullYear(), newDate.getMonth())));
    }

    return (
        <>
            <Metadata
                title="calendar"
                ogDescription="every day since feb. 2023 that my parents have yelled at me"
                ogImageAlt="send help aaaaaaaaaaa"
            />

            <SitePage pageName="days my parents yelled at me<br/>(since feb. 2023)" backTo="/idk">
                <CalendarContent
                    tracking={tracking}
                    yearCache={yearCache}
                    inStartBounds={inStartBounds}
                    inEndBounds={inEndBounds}
                    arrowClickHandler={arrowClickHandler}
                />

                <div className="notes">
                    {notedMarks.map((m) => (
                        <li key={uuidv4()}>
                            <NoteItem timestamp={m.day} note={m.notes} />
                        </li>
                    ))}
                </div>
            </SitePage>
        </>
    );
}

export async function getServerSideProps() {
    const data: RawScream[] | null = await fetchYear(new Date().getFullYear(), false);

    return { props: { data } };
}

import type { ArrowProps, CalendarProps, CalendarParentProps, Scream } from "../types/ScreamCalendar";
import { DAYS, MONTHS } from "../utils/time";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function getCell(current: Date, month: number, week: number, day: number): JSX.Element {
    if (
        (week == 0 && day < current.getDay()) || // before the current month
        current.getMonth() != month // after the current month
    ) {
        return (
            <td className="blankDay" key={uuidv4()}>
                {"\u200b"}
            </td>
        );
    } else {
        const currentDate = current.getDate();
        const elem = (
            <td className="calendarDay" id={`${currentDate}`} key={uuidv4()}>
                {currentDate}
            </td>
        );

        current.setDate(currentDate + 1);
        return elem;
    }
}

function generateBody(date: Date, month: number): JSX.Element {
    // each month spans 6 weeks, with 7 days in a week
    const rows = [...Array<number>(6).keys()].map((i) => (
        <tr className="weekRow" key={uuidv4()}>
            {[...Array<number>(7).keys()].map((j) => getCell(date, month, i, j))}
        </tr>
    ));

    return <tbody>{rows}</tbody>;
}

function handleMarks(marks: Scream[], year: number, month: number): void {
    marks.map((mark) => {
        if (mark.day.getFullYear() != year || mark.day.getMonth() != month) return;
        const elem = document.getElementById(`${mark.day.getDate()}`) as HTMLTableCellElement;
        elem.classList.add("marked");

        if (mark.notes) {
            elem.classList.add("hasNote");
        }
    });
}

function ScreamCal({ year, month, marks }: CalendarProps) {
    const date = new Date(year, month);
    const body = generateBody(date, month);
    useEffect(() => handleMarks(marks, year, month));

    const header = (
        <thead>
            <tr className="header-month">
                <th colSpan={7}>{`${MONTHS[month]}, ${year}`}</th>
            </tr>
            <tr className="header-days">
                {DAYS.map((day) => (
                    <th key={uuidv4()}>{day}</th>
                ))}
            </tr>
        </thead>
    );

    const tip = (
        <tfoot>
            <tr className="calendar-tip">
                <th colSpan={7}>
                    <span>underline</span> -- i put comments below
                </th>
            </tr>
        </tfoot>
    );

    return (
        <table className="calendar">
            {header}
            {body}
            {tip}
        </table>
    );
}

const LEFT_ARROW = "M12 4L3 12L12 20 M7 12 M20 4L11 12L20 20";
const RIGHT_ARROW = "M12 20L21 12L12 4 M17 12 M4 4L13 12L4 20";
export function MoveArrow({ direction, invisible, callback }: ArrowProps) {
    return (
        <button
            id={`${direction}`}
            className={`hoverable calendar-move ${invisible ? "invis" : ""}`}
            disabled={invisible}
            onClick={callback}
        >
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#696969"
            >
                <path d={direction == 1 ? RIGHT_ARROW : LEFT_ARROW} />
            </svg>
        </button>
    );
}

export default function CalendarContent({
    tracking,
    yearCache,
    inStartBounds,
    inEndBounds,
    arrowClickHandler,
}: CalendarParentProps) {
    return (
        <div id="calendarContent" className="page-content">
            <MoveArrow direction={-1} invisible={!inStartBounds} callback={arrowClickHandler} />
            <ScreamCal
                year={tracking.getFullYear()}
                month={tracking.getMonth()}
                marks={yearCache[tracking.getFullYear()]}
            />
            <MoveArrow direction={1} invisible={!inEndBounds} callback={arrowClickHandler} />
        </div>
    );
}

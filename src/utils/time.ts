export const MONTHS = Object.freeze([
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
]);

export const DAYS = Object.freeze(["s", "m", "t", "w", "t", "f", "s"]);

export default function formatDate(timestamp: Date, precise: boolean = true): string {
    let ret = [`${MONTHS[timestamp.getMonth()].slice(0, 3)}.`, `${timestamp.getDate()}`, `${timestamp.getFullYear()}`];

    if (precise) {
        let hour = timestamp.getHours();
        let minute = timestamp.getMinutes();

        const ampm = hour >= 12 && hour ? "pm" : "am";
        const hours = hour % 12 || 12;
        const minutes = minute < 10 ? "0" + minute : minute;

        ret = ret.concat(["@", `${hours}:${minutes} ${ampm}`]);
    }

    return ret.join(" ");
}

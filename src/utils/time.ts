export const MONTHS = Object.freeze([
    "jan.",
    "feb.",
    "mar.",
    "apr.",
    "may.",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "oct.",
    "nov.",
    "dec.",
]);

export default function formatDate(timestamp: Date, precise: boolean = true): string {
    let ret = [`${MONTHS[timestamp.getMonth()]}`, `${timestamp.getDate()}`, `${timestamp.getFullYear()}`];

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

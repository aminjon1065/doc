export default function convertLocalToUtc(localDateStr) {
    const localDate = new Date(localDateStr);
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
    return utcDate.toISOString();
}

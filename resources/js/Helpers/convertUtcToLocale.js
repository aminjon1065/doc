export default function  convertUtcToLocal(utcDateStr) {
    const utcDate = new Date(utcDateStr);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16); // Форматирование в формат yyyy-MM-ddTHH:mm
}

export default function formatForDatetimeLocal(dateStr) {
    try {
        // Создаем объект Date из входной строки
        const parsedDate = new Date(dateStr);

        if (isNaN(parsedDate)) {
            return "Invalid date";
        }

        // Преобразование в UTC
        const year = parsedDate.getUTCFullYear();
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0'); // +1 потому что месяцы начинаются с 0
        const day = String(parsedDate.getUTCDate()).padStart(2, '0');
        const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
        const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
        console.error(e);
        return "Invalid date";
    }
}

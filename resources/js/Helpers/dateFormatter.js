const formatDay = new Intl.DateTimeFormat("tj-TJ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dushanbe'
});

const formatterDay = (date) => {
    // Преобразуем входную дату в объект Date
    const parsedDate = new Date(date);

    if (isNaN(parsedDate)) {
        console.warn('Invalid date:', date);
        return "Invalid date";
    }

    // Форматируем дату с учетом UTC
    return formatDay.format(parsedDate);
};

export default formatterDay;



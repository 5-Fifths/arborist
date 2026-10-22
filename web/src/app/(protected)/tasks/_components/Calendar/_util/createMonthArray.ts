interface CalendarDate {
    date: number,
    monthOffset: 'prev' | 'curr' | 'next';
}

export function createMonthArray(date: Date) {
    const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthArray = [];

    // Fill with empty days
    for (let i = 0; i < firstDay; i++) {

    }
}
interface CalendarDate {
    date: number,
    monthOffset: 'prev' | 'curr' | 'next';
}

export function createDayArray(date: Date) {
    const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const dayArray: CalendarDate[] = [];

    // Fill with empty days
    for (let i = firstDay - 1; i >= 0; i--) {
        dayArray.push({
            date: daysInPreviousMonth - i,
            monthOffset: 'prev'
        })
    }

    // Fill days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        dayArray.push({
            date: i,
            monthOffset: 'curr'
        })
    }

    // If the array is longer than 35, then we need to account for a 6th row
    const MIN_THRESHOLD = 35;
    
    // Fill the remainder of the 5th row with days from the next month
    if (dayArray.length <= MIN_THRESHOLD) {
        for (let i = 1; i <= MIN_THRESHOLD - dayArray.length; i++) { 
            dayArray.push({
                date: i,
                monthOffset: 'next'
            })
        }
    }
    // Fill the remainder of the 6th row, if it exists
    else {
        const MAX_LENGTH = 42;

        for (let i = 1; dayArray.length < MAX_LENGTH; i++) {
            dayArray.push({
                date: i,
                monthOffset: 'next'
            })
        }
    }

    return dayArray;
}
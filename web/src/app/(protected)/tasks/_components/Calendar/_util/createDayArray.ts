import { formatDate } from "@/app/(protected)/_util/formatDate";

interface CalendarDate {
    date: number,
    dateString: string,
    monthOffset: 'prev' | 'curr' | 'next';
}

// Creates an array for the month based on the date passed
export function createDayArray(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const dayArray: CalendarDate[] = [];    

    // Fill with empty days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPreviousMonth - i;
        const temp = new Date(year, month - 1, day);

        dayArray.push({
            date: day,
            dateString: formatDate(temp),
            monthOffset: 'prev'
        })
    }

    // Fill days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const temp = new Date(year, month, i);

        dayArray.push({
            date: i,
            dateString: formatDate(temp),
            monthOffset: 'curr'
        })
    }

    // If the array is longer than 35, then we need to account for a 6th row (42 cells)
    const MIN_LENGTH = 35;
    const MAX_LENGTH = 42;
    const CURR_LENGTH = dayArray.length;
    
    // Fill the remainder of the 5th row with days from the next month
    if (dayArray.length <= MIN_LENGTH) {
        for (let i = 1; i <= MIN_LENGTH - CURR_LENGTH; i++) { 
            const temp = new Date(year, month + 1, i);

            dayArray.push({
                date: i,
                dateString: formatDate(temp),
                monthOffset: 'next'
            });
        }
    }
    // Fill the remainder of the 6th row, if it exists
    else if (dayArray.length > MIN_LENGTH) {
        for (let i = 1; dayArray.length < MAX_LENGTH; i++) {
            const temp = new Date(year, month + 1, i);

            dayArray.push({
                date: i,
                dateString: formatDate(temp),
                monthOffset: 'next'
            });
        }
    }

    return dayArray;
}
import { formatDate } from "@/app/(protected)/_util/formatDate";

interface CalendarDate {
    date: number,
    dateString: string,
    monthOffset: 'prev' | 'curr' | 'next';
}

// Creates an array for the month based on the date passed
export function createDayArray(date: Date) {
    const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const dayArray: CalendarDate[] = [];

    const temp = new Date(date);

    temp.setMonth(date.getMonth() - 1);

    // Fill with empty days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPreviousMonth - i;

        temp.setDate(day);

        dayArray.push({
            date: day,
            dateString: formatDate(temp),
            monthOffset: 'prev'
        })
    }

    // Fill days of the current month
    temp.setMonth(date.getMonth());

    for (let i = 1; i <= daysInMonth; i++) {
        temp.setDate(i);

        dayArray.push({
            date: i,
            dateString: formatDate(temp),
            monthOffset: 'curr'
        })
    }

    // If the array is longer than 35, then we need to account for a 6th row
    const MIN_THRESHOLD = 35;
    
    // Fill the remainder of the 5th row with days from the next month
    temp.setMonth(date.getMonth() + 1);

    if (dayArray.length < MIN_THRESHOLD) {
        for (let i = 1; i <= MIN_THRESHOLD - dayArray.length; i++) { 
            temp.setDate(i);

            dayArray.push({
                date: i,
                dateString: formatDate(temp),
                monthOffset: 'next'
            });
        }
    }
    // Fill the remainder of the 6th row, if it exists
    else if (dayArray.length > MIN_THRESHOLD) {
        const MAX_LENGTH = 42;

        for (let i = 1; dayArray.length < MAX_LENGTH; i++) {
            temp.setDate(i);

            dayArray.push({
                date: i,
                dateString: formatDate(temp),
                monthOffset: 'next'
            });
        }
    }

    return dayArray;
}
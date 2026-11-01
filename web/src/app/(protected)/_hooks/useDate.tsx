export function useDate() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(
        undefined,
        {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }
    ).replace(/,/g, ' ּּּ· ');

    return { date, formattedDate };
}
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
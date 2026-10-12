export function debounce<T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number
) {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: T) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args)
        }, delay);
    }
}
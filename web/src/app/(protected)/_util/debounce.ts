export function debounce<T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number
) {
    let timeout: ReturnType<typeof setTimeout>;

    const debounced =  (...args: T) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args)
        }, delay);
    }

    debounced.cancel = () => {
        clearTimeout(timeout);
    }

    return debounced;
}
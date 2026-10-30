import { useState, useEffect } from "react";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const open = () => {
        setIsOpen(true);
    }

    const close = () => {
        setError(undefined);
        setIsOpen(false);
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        }

        if (isOpen)
            window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        }
    },[ isOpen, close])

    return {
        isOpen,
        setError,
        error,
        open,
        close
    }
}
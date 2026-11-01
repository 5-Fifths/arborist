import styles from "./styles.module.css";

interface ModalProps {
    children: React.ReactNode,
    error: string | undefined,
    onClose: () => void
}

// Modal container
export default function Modal({ children, error, onClose }: ModalProps) {
    return (
        <div className={styles.overlay}>
            {error ? 
                <div className={styles.error}>
                    {error}
                </div>
                :
                null
            }
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className={styles.controls}>
                    <p><kbd>Esc</kbd> to cancel</p>
                    <p><kbd>Tab</kbd> to navigate</p>
                </div>
            </div>
        </div>
    )
}
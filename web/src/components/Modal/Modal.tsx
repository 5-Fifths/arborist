import styles from "./styles.module.css";

interface ModalProps {
    children: React.ReactNode,
    error: string | undefined,
    onClose: () => void
}

// Opens modal container; populate using modal content as children
export default function Modal({ children, error, onClose }: ModalProps) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            {error ? 
                <div className={styles.error}>
                    {error}
                </div>
                :
                null
            }
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
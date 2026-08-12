import { useState } from "react";

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
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                {error ? 
                    <div className={styles.error}>
                        {error}
                    </div>
                    :
                    null
                }
                {children}
            </div>
        </div>
    )
}
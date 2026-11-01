import Image from "next/image";

import styles from "./styles.module.css";

interface ButtonImageProps {
    src: string,
    onClick: () => void,
    width?: number,
    height?: number
}

export default function ButtonImage({ 
    src, 
    onClick,
    width = 20,
    height= 20
}: ButtonImageProps) {
    return (
        <button onClick={onClick} className={styles.button}>
            <Image
                src={src}
                alt="Log out"
                width={width}
                height={height}
            />
        </button>
    )
}
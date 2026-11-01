import styles from "./styles.module.css";

interface TagProps {
    content: string,
    color?: string,
    bgColor?: string
}

export default function Tag({
    content,
    color="currentcolor",
    bgColor="#c7cdbf"
}: TagProps) {
    return (
        <span className={styles.tag} style={{"backgroundColor": bgColor, "color": color}}>{content}</span>
    )
}
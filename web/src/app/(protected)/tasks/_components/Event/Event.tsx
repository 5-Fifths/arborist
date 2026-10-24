import { WorkItem } from "@/types/WorkItem";

import styles from "./styles.module.css";

interface EventProps {
    workItem: WorkItem
}

export default function Event({ workItem }: EventProps) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{workItem.title}</p>
        </div>
    )
}
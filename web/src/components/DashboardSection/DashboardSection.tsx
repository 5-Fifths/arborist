import { WorkItem } from "@/types/WorkItem";

import styles from "./styles.module.css";

interface DashboardSectionProps<T extends WorkItem> {
    title: string,
    workItems: T[],
    renderItem: (item: T) => React.ReactNode,
    onAdd: () => void
}

export default function DashboardSection<T extends WorkItem>({
    title, 
    workItems, 
    renderItem,
    onAdd
}: DashboardSectionProps<T>) { 
    return (
        <section className={styles.container}>
            <div className={styles.sectionTitle}>
                <p>{title}</p>
                <button className={styles.addButton} onClick={onAdd}>+ Add</button>
            </div>
            <div className={styles.content}>
                {workItems.map((item, index) => {
                    return (
                        <div key={index} className={styles.itemWrapper}>
                            <p className={styles.number}>{index < 10 ? `0${index + 1}` : index + 1}</p>
                            {renderItem(item)}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
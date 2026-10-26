import { WorkItem } from "@/types/WorkItem";

import ProjectListItem from "../WorkItems/ProjectListItem/ProjectListItem";
import TaskListItem from "../WorkItems/TaskListItem/TaskListItem";

import styles from "./styles.module.css";

interface ListContainerProps<T extends WorkItem> {
    title: string,
    workItems: T[],
    onItemComplete: (workItem: WorkItem) => void,
    onAdd: () => void
}

export default function ListContainer<T extends WorkItem>({
    title, 
    workItems,
    onItemComplete,
    onAdd
}: ListContainerProps<T>) { 
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
                            <p className={styles.number}>{index < 9 ? `0${index + 1}` : index + 1}</p>
                            {
                                item.item_type === "Project" ? 
                                    <ProjectListItem
                                        project={item}
                                        onComplete={onItemComplete}
                                    /> :
                                    <TaskListItem
                                        task={item}
                                        onComplete={onItemComplete}
                                    />
                            }
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
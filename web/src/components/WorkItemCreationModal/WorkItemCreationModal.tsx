'use client';

import { MouseEventHandler, useState } from "react";
import Tag from "../Tag/Tag";

import styles from "./styles.module.css";

interface WorkItemCreationModalProps {
    type: "Task" | "Project" | "Urgent Task",
    onSubmit: () => void,
    onClose: () => void,
}

export default function WorkItemCreationModal({
    type, 
    onSubmit, 
    onClose
}: WorkItemCreationModalProps) {   
    const [currentTag, setCurrentTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string>();

    const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const tag = currentTag.trim();

        if (!tag) {
            setError("Please enter a valid tag.");
            return;
        }

        if (tags.includes(tag)) {
            setError("This tag has already been added.");
            return;
        }

        if (tags.length >= 10) {
            setError("There is a limit of 10 tags.");
            return;
        }
        
        setTags(prev => [...prev, tag]);
        setError(undefined);
        setCurrentTag("");
    }

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
                <div className={styles.header}>Create a New {type}</div>
                <form className={styles.form}>
                    <div className={styles.horizontal}>
                        <input type="text" className={`${styles.input} ${styles.title}`} placeholder="Title" />
                        <input type="date" className={styles.input} placeholder="1/1/2000" />
                    </div>
                    <textarea name="description" className={`${styles.input} ${styles.description}`} placeholder="Description" />
                    <div className={styles.horizontal}>
                        <input 
                            type="text" 
                            className={`${styles.input}`} 
                            placeholder="Tag"
                            value={currentTag}
                            onChange={(e) => {setCurrentTag(e.target.value);}}
                         />
                        <button 
                            className={`${styles.createButton} ${styles.button}`}
                            onClick={(e) => {
                                handleAddTag(e);
                            }}
                        >+ Add</button>
                    </div>
                    <p className={styles.tagTitle}>Current Tags ({tags.length} / 10)</p>
                    <div className={styles.tagContainer}>
                        {tags.map((tag, index) => {
                            return (
                                <Tag 
                                    content={tag}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    <div className={styles.actions}>
                        <button onClick={onClose} className={`${styles.input} ${styles.cancelButton} ${styles.button}`}>Cancel</button>
                        <button onClick={onSubmit} className={`${styles.input} ${styles.createButton} ${styles.button}`}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
'use client';

import { useState } from "react";

import { ItemType, WorkItem } from "@/types/WorkItem";
import Tag from "@/components/Tag/Tag";

import styles from "./styles.module.css";

interface WorkItemCreationModalProps {
    onSubmit: (workItem: WorkItem) => void,
    onClose: () => void,
    setError: (error: string | undefined) => void
}

export default function WorkItemCreationModal({
    onSubmit, 
    onClose,
    setError
}: WorkItemCreationModalProps) {   
    const [currentTag, setCurrentTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

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

    function createWorkItem(formData: FormData) {
        const [year, month, date] = (formData.get("due_date") as string).split('-').map(Number);
        const [hours, minutes] = (formData.get("due_time") as string).split(":").map(Number);

        const workItem: WorkItem = {
            item_id: crypto.randomUUID(),
            
            item_type: formData.get("item_type") as ItemType,
            title: formData.get("title") as string,
            description: formData.get("description") as string ?? "",
            due_date: new Date(year, month - 1, date, hours, minutes),
            tags: tags ?? [],
            complete: false
        }

        return workItem;
    }


    return (
        <>
            <div className={styles.header}>Create a New Item</div>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget); 
                    
                    const workItem = createWorkItem(formData);

                    if (!workItem) {
                        setError("Work item creation failed; please try again later.");

                        return;
                    }

                    onSubmit(workItem);
                }}
            >
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="title">Title</label>
                    <input 
                        name="title"
                        type="text"  
                        placeholder="Title"
                        className={`${styles.input} ${styles.title}`}
                        required
                    />
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="item_type">Item Type</label>
                        <select name="item_type" className={styles.input}>
                            <option className={styles.option} value="Task">Task</option>
                            <option className={styles.option} value="Project">Project</option>
                        </select>  
                    </div>               
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="due_date">Due Date</label>
                        <input
                            name="due_date" 
                            type="date" 
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="due_time">Due Time</label>
                        <input className={styles.input} type="time" name="due_time"/>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="Description">Description</label>
                    <textarea
                        name="description" 
                        placeholder="Description" 
                        className={`${styles.input} ${styles.description}`} 
                    />  
                </div>
                <div className={styles.horizontal}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="tags">Tags</label>
                        <input 
                            name="tags"
                            type="text" 
                            className={`${styles.input}`} 
                            placeholder="Tag"
                            value={currentTag}
                            onChange={(e) => {setCurrentTag(e.target.value);}}
                        />
                    </div>
                    
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
                    <button type="button" onClick={onClose} className={`${styles.input} ${styles.cancelButton} ${styles.button}`}>Cancel</button>
                    <button 
                        type="submit" 
                        className={`${styles.input} ${styles.createButton} ${styles.button}`}
                    >Create</button>
                </div>
            </form>
        </>
    )
}
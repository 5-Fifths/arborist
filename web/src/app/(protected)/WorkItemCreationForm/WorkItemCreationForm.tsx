'use client';

import { useState, useContext } from "react";
import { WorkItem } from "@/types/WorkItem";
import { AuthContext } from "@/providers/AuthProvider";
import Tag from "../../../components/Tag/Tag";

import styles from "./styles.module.css";

interface WorkItemCreationModalProps {
    type: "Task" | "Project" | "Urgent Task",
    onSubmit: (workItem: WorkItem) => void,
    onClose: () => void,
    setError: (error: string | undefined) => void
}

export default function WorkItemCreationModal({
    type, 
    onSubmit, 
    onClose,
    setError
}: WorkItemCreationModalProps) {   
    const { user, loading } = useContext(AuthContext);

    const [currentTag, setCurrentTag] = useState<string>("");
    const [tags, setTags] = useState(type !== "Task" ? ["Urgent"] : []);

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
        const uid = user?.uid;
        const itemType = type === "Project" ? "Project" : "Task";

        if (!uid) {
            setError("User ID cannot be found.");

            return undefined;
        }

        const workItem: WorkItem = {
            user_id: uid,
            item_id: crypto.randomUUID(),
            
            item_type: itemType,
            title: formData.get("title") as string,
            description: formData.get("description") as string ?? "",
            due_date: new Date(formData.get("due_date") as string),
            tags: tags ?? undefined,
            complete: false
        }

        return workItem;
    }

    if (!loading && !user) {
        // TODO: Display loading; and start timer?
    }

    return (
        <>
            <div className={styles.header}>Create a New {type}</div>
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
                <div className={styles.horizontal}>
                    <input 
                        name="title"
                        type="text"  
                        placeholder="Title"
                        className={`${styles.input} ${styles.title}`}
                        required
                    />
                    <input
                        name="due_date" 
                        type="date" 
                        className={styles.input}
                        required
                    />
                </div>
                <textarea
                    name="description" 
                    placeholder="Description" 
                    className={`${styles.input} ${styles.description}`} 
                />  
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
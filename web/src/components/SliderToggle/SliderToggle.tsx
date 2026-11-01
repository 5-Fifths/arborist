import styles from "./styles.module.css";

interface SliderToggleProps {
    options: { first: string, second: string },
    value: boolean, 
    setter: () => void
}

export default function SliderToggle({ options, value, setter }: SliderToggleProps) {
    return (
        <label htmlFor="slider" className={styles.container}>
            <p className={`${styles.option} ${value ? styles.active : ""}`}>{options.first}</p>
            <p className={`${styles.option} ${value ? "" : styles.active}`}>{options.second}</p>
            <input 
                id="slider"
                name="slider"
                type="checkbox"
                className={styles.input}
                checked={value}
                onChange={setter}
            />
        </label>
    )
}
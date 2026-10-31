import styles from "./styles.module.css";

interface SliderToggle {
    options: { first: string, second: string },
    setter: () => void
}

export default function SliderToggle() {
    return (
        <label htmlFor="slider" className={styles.container}>
            <span className={styles.slider}></span>
            <input name="slider" type="checkbox" className={styles.input} onChecked/>
        </label>
    )
}
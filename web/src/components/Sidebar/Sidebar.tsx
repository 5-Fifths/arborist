import LinkWithIcon from "../LinkWithIcon/LInkWithIcon";
import Image from "next/image";

import styles from "./styles.module.css";

export default function Sidebar() {
    return (
        <aside className={styles.container}>
            <div className={styles.logoContainer}>
                <Image src="nurture_logo.svg" alt="" width={30} height={30} />
                <h1 className={styles.brand}>nurture</h1>
            </div>
            <nav className={styles.navWrapper}>
                <LinkWithIcon src="/DashboardIcon.svg" href="/dashboard" link_name="Dashboard" />
                <LinkWithIcon src="/ChecklistIcon.svg" href="/tasks" link_name="All Tasks" />
                <LinkWithIcon src="/CalendarIcon.svg" href="/calendar" link_name="Calendar" />
                <LinkWithIcon src="/StopwatchIcon.svg" href="/focus" link_name="Focus Timer" />
                <LinkWithIcon src="/PottedPlantIcon.svg" href="/garden" link_name="My Garden" />
            </nav>
        </aside>
    )
}
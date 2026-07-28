'use client';

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { signOutUser } from "@/firebase/auth/signOutUser";
import LinkWithIcon from "../LinkWithIcon/LinkWithIcon";
import ButtonImage from "../ButtonImage/ButtonImage";
import Image from "next/image";

import styles from "./styles.module.css";

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    const displayName = user?.displayName ?? user?.email;

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
                <div className={styles.profileSection}>
                    <p>{displayName}</p>
                    <ButtonImage 
                        src={"/LogoutIcon.svg"}
                        onClick={signOutUser}
                    />
                </div>
            </nav>  
        </aside>
    )
}
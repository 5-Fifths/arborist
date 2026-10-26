'use client';

import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { signOutUser } from "@/firebase/auth/signOutUser";
import LinkWithIcon from "../LinkWithIcon/LinkWithIcon";
import ButtonImage from "../ButtonImage/ButtonImage";
import Image from "next/image";

import Logo from "@/assets/icons/Logo.svg";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import ChecklistIcon from "@/assets/icons/ChecklistIcon.svg";
import StopwatchIcon from "@/assets/icons/StopwatchIcon.svg";
import PottedPlantIcon from "@/assets/icons/PottedPlantIcon.svg";
import LogoutIcon from "@/assets/icons/LogoutIcon.svg";

import styles from "./styles.module.css";

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    const displayName = user?.displayName ?? user?.email;

    return (
        <aside className={styles.container}>
            <div className={styles.logoContainer}>
                <Image src={Logo} alt="" width={30} height={30} />
                <h1 className={styles.brand}>arborist</h1>
            </div>
            <nav className={styles.navWrapper}>
                <LinkWithIcon src={CalendarIcon} href="/dashboard" link_name="Dashboard" />
                <LinkWithIcon src={ChecklistIcon} href="/tasks" link_name="All Tasks" />
                <LinkWithIcon src={StopwatchIcon} href="/focus" link_name="Focus Timer" />
                <LinkWithIcon src={PottedPlantIcon} href="/garden" link_name="My Garden" />
                <div className={styles.profileSection}>
                    <p>{displayName}</p>
                    <ButtonImage 
                        src={LogoutIcon}
                        onClick={signOutUser}
                    />
                </div>
            </nav>  
        </aside>
    )
}
import Sidebar from "@/components/Sidebar/Sidebar";

import styles from "./layout.module.css";

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className={styles.container}>
            <Sidebar />
            {children}
        </div>
    )
}
import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

interface LinkWithIconProps {
    link_name: string,
    href: string,
    src: string
}

export default function LinkWithIcon({link_name, href, src}: LinkWithIconProps) {
    return (
        <Link href={href} className={styles.link}>
            <Image src={src} width={20} height={20} alt="" />
            <p className={styles.name}>{link_name}</p>
        </Link>
    )
}
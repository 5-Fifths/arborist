import { useState } from "react";
import Image from "next/image";

interface ToggleButtonWithIconProps {
    onSrc: string;
    offSrc: string;
    size: number;
    alt: string;
    additionalFunction: () => void;
    className?: string; 
}

export default function ToggleButtonWithIcon({
    onSrc, 
    offSrc, 
    size = 32,
    alt,
    additionalFunction,
    className
}: ToggleButtonWithIconProps) {
    const [isOn, setIsOn] = useState(false);
    const imageSrc = isOn ? onSrc : offSrc;

    function handleClick() {
        setIsOn(prev => !prev);

        additionalFunction();
    }

    return (
        <button className={`${className || ''}`} type="button" onClick={handleClick}>
            <Image 
                src={imageSrc}
                width={size}
                height={size}
                alt={alt}
            />
        </button>
    )
}
import Image from "next/image";

interface ToggleButtonWithIconProps {
    onSrc: string;
    offSrc: string;
    size: number;
    alt: string;
    isOn: boolean;
    onToggle: () => void;
    className?: string; 
}

export default function ToggleButtonWithIcon({
    onSrc,
    offSrc, 
    size = 32,
    alt,
    isOn,
    onToggle,
    className
}: ToggleButtonWithIconProps) {
    const imageSrc = isOn ? onSrc : offSrc;

    return (
        <button className={`${className || ''}`} type="button" onClick={onToggle}>
            <Image 
                src={imageSrc}
                width={size}
                height={size}
                alt={alt}
            />
        </button>
    )
}
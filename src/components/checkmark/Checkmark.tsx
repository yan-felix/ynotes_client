"use client";

type Props = {
    diameter: number,
};

export default function Checkmark(props: Props){
    return (
        <div className="flex items-center justify-center h-full bg-transparent">
            <svg width={props.diameter ? props.diameter : "40"} height={props.diameter ? props.diameter : "40"} viewBox="0 0 40 40" className="relative">
                <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="3"
                className="animate-draw-circle"
                strokeLinecap="round"
                />
                <path
                d="M12 20 l5 5 l10 -10"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw-check"
                strokeDasharray="100"
                strokeDashoffset="100"
                />
            </svg>
        </div>
    )
};
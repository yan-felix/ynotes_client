"use client";

type Props = {
    name: string;
    type: string;
    value: string;
    placeholder: string;
    icon: React.ReactNode;
    handle_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    alert: boolean;
    alert_message: React.ReactNode;
};

export default function Input(props: Props){
    return (
        <div className="w-full flex flex-col gap-2">
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.handle_change}
                className={`w-full p-4 text-placeholder border-2 ${props.alert ? "border-red-600":"border-placeholder"} rounded-2xl bg-transparent`}
            />
            {
                props.alert && (props.alert_message)
            }
        </div>
        
    )
};
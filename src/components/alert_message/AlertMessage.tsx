"use client";

type Props = {
    text: string;
};

export default function AlertMessage(props: Props){
    return(
        <small className="w-full text-red-700">
            {props.text}
        </small>
    )
};
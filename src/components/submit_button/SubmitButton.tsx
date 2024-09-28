"use client";

type Props = {
    text: string,
};

export default function SubmitButton(props: Props){
    return <button className="text-center text-white w-[250px] bg-submit_button_bg p-2 text-2xl rounded-lg hover:bg-main_colour">{props.text}</button>
};
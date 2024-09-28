"use client";

type Props = {
    legend: string;
    action: string;
    children: React.ReactNode;
    submit: (event: React.FormEvent<HTMLFormElement>) => void,
};

export default function Form(props: Props){
    return(
        <form
            action={props.action}
            onSubmit={props.submit}
            className="w-full max-w-[400px] mx-auto flex flex-col gap-12 p-10"
        >
            <legend className="text-titles_colour font-normal text-3xl">
                {props.legend}
            </legend>
            {props.children}
        </form>
    )
};
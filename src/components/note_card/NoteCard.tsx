"use client";

import PriorityToggler from "../priority_toggler/PriorityToggler";
import { useRouter } from "next/navigation";
import Api from "@/api/Api";

type Props = {
    id: string;
    title: string;
    content: string;
    priority: boolean;
};

export default function NoteCard(props: Props) {
    const cardType = props.priority ? 'bg-[#E1531E] text-white' : 'bg-white text-[#1C1919]';
    const router = useRouter();

    const deleteNote = () => {
        Api.delete(`/delete_note/${props.id}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    return (
        <div
            key={props.id}
            className={`w-full max-w-[320px] h-[325px] mx-auto relative flex flex-col items-start gap-6 p-8 rounded-[0.8rem] ${cardType}`}
        >
            <header className="w-full flex flex-col items-end gap-6">
                <svg
                    className={`w-[25px] h-[29px] fill-current cursor-pointer ${props.priority ? 'text-[rgba(255,255,255,0.80)]' : 'text-[rgba(154,151,151,0.80)]'}`}
                    onClick={deleteNote}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 19"
                >
                    <path d="M1.15385 2.01243C0.847827 2.01243 0.554342 2.13279 0.337954 2.34702C0.121566 2.56126 0 2.85183 0 3.1548V4.29717C0 4.60015 0.121566 4.89072 0.337954 5.10495C0.554342 5.31919 0.847827 5.43955 1.15385 5.43955H1.73077V15.7209C1.73077 16.3269 1.9739 16.908 2.40668 17.3365C2.83945 17.7649 3.42642 18.0056 4.03846 18.0056H10.9615C11.5736 18.0056 12.1605 17.7649 12.5933 17.3365C13.0261 16.908 13.2692 16.3269 13.2692 15.7209V5.43955H13.8462C14.1522 5.43955 14.4457 5.31919 14.662 5.10495C14.8784 4.89072 15 4.60015 15 4.29717V3.1548C15 2.85183 14.8784 2.56126 14.662 2.34702C14.4457 2.13279 14.1522 2.01243 13.8462 2.01243H9.80769C9.80769 1.70945 9.68613 1.41889 9.46974 1.20465C9.25335 0.990413 8.95987 0.870056 8.65385 0.870056H6.34615C6.04013 0.870056 5.74665 0.990413 5.53026 1.20465C5.31387 1.41889 5.19231 1.70945 5.19231 2.01243H1.15385ZM4.61538 6.58192C4.76839 6.58192 4.91514 6.6421 5.02333 6.74922C5.13152 6.85634 5.19231 7.00162 5.19231 7.15311V15.1497C5.19231 15.3012 5.13152 15.4465 5.02333 15.5536C4.91514 15.6607 4.76839 15.7209 4.61538 15.7209C4.46238 15.7209 4.31563 15.6607 4.20744 15.5536C4.09925 15.4465 4.03846 15.3012 4.03846 15.1497V7.15311C4.03846 7.00162 4.09925 6.85634 4.20744 6.74922C4.31563 6.6421 4.46238 6.58192 4.61538 6.58192ZM7.5 6.58192C7.65301 6.58192 7.79975 6.6421 7.90795 6.74922C8.01614 6.85634 8.07692 7.00162 8.07692 7.15311V15.1497C8.07692 15.3012 8.01614 15.4465 7.90795 15.5536C7.79975 15.6607 7.65301 15.7209 7.5 15.7209C7.34699 15.7209 7.20025 15.6607 7.09205 15.5536C6.98386 15.4465 6.92308 15.3012 6.92308 15.1497V7.15311C6.92308 7.00162 6.98386 6.85634 7.09205 6.74922C7.20025 6.6421 7.34699 6.58192 7.5 6.58192ZM10.9615 7.15311V15.1497C10.9615 15.3012 10.9008 15.4465 10.7926 15.5536C10.6844 15.6607 10.5376 15.7209 10.3846 15.7209C10.2316 15.7209 10.0849 15.6607 9.97667 15.5536C9.86847 15.4465 9.80769 15.3012 9.80769 15.1497V7.15311C9.80769 7.00162 9.86847 6.85634 9.97667 6.74922C10.0849 6.6421 10.2316 6.58192 10.3846 6.58192C10.5376 6.58192 10.6844 6.6421 10.7926 6.74922C10.9008 6.85634 10.9615 7.00162 10.9615 7.15311Z" />
                </svg>

                <p className="w-full overflow-hidden text-left text-ellipsis whitespace-nowrap text-[32px] font-medium leading-normal">
                    {props.title}
                </p>
            </header>

            <p className="w-full h-[160px] overflow-hidden text-[16px] font-normal leading-normal max-h-[7em]">
                {props.content}
            </p>

            <PriorityToggler id={props.id} priority={props.priority}/>
        </div>
    );
};

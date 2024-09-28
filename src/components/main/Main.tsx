"use client";

type Props = { 
    children: React.ReactNode;
};

export default function Main(props: Props){
    return (
        <main className={`w-full h-full mt-[140px] flex flex-col p-10 items-center justify-center`}>
            {props.children}
        </main>
    )
};
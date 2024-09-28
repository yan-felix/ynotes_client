"use client";

import React from 'react';

type Props = {
    text: string;
    handle_click: (event: React.MouseEvent<HTMLParagraphElement>) => void;
};

export default function EditLink(props: Props){
    return(
        <p onClick={props.handle_click} className='w-min block p-2 cursor-pointer text-main_colour text-base font-sans font-normal border-b-2 border-main_colour'>{props.text}</p>
    )
};
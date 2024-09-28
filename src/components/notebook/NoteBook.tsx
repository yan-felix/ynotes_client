"use client";

import SubmitButton from "../submit_button/SubmitButton"

type Props = {
    submit: (event: React.FormEvent<HTMLFormElement>) => void;
    get_title: (event: React.ChangeEvent<HTMLInputElement>) => void;
    get_content: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

};

export default function NoteBook(props: Props){
    return(
        <form id='annotations_form' onSubmit={props.submit} className="w-[290px] p-8 flex relative flex-col gap-5 text-center justify-center items-center bg-white animate-fade-in-up">
            <strong className="text-black font-inter text-4xl not-italic font-normal leading-normal">Criar anotação</strong>
              
            <div className="flex w-min-28.8rem py-5 px-2.5 border-b border-gray-400">
                <label className="hidden absolute w-1px h-1px p-0 m--1px overflow-hidden clip-rect whitespace-nowrap border-0" htmlFor="Title">Título da anotação</label>
                <input
                  className="w-full text-black font-inter text-xl not-italic font-normal border-0"
                  name="Title" 
                  id="Title" 
                  type="text" 
                  placeholder="Título da anotação"
                  onChange={props.get_title}
                />
            </div>
            
            <div className="flex w-min-28.8rem py-5 px-2.5 border-b border-gray-400">
                <label className="hidden absolute w-1px h-1px p-0 m--1px overflow-hidden clip-rect whitespace-nowrap border-0" htmlFor="Note">Anotação</label>
                <textarea
                    className="w-full text-black font-inter text-xl font-normal border-none"
                    name="Note"
                    id="Note"
                    cols={30}
                    rows={10}
                    placeholder="Anotação"
                    onChange={props.get_content}
                >
                </textarea>
            </div>

            <SubmitButton text="Salvar"/>
        </form>
    )
};
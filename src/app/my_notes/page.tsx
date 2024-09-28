"use client";

import Auth from "@/auth/Auth";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import NotesLink from "@/components/notes_link/NotesLink";
import ConfigLink from "@/components/account_link/ConfigLink";
import LogoutButton from "@/components/logout_button/LogoutButton";
import PlusIcon from "@/components/plus_icon/PlusIcon";
import MenuIcon from "@/components/menu_icon/MenuIcon";
import CloseButton from "@/components/close_button/CloseButton";
import BackIcon from "@/components/back_icon/BackIcon";
import NoteBook from "@/components/notebook/NoteBook";
import NoteCard from "@/components/note_card/NoteCard";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Api from "@/api/Api";

interface MyNotes {
    id: string;
    title: string;
    content: string;
    priority: boolean;
};

export default function MyNotes(){
    const [mobleNavOpen, setMobleNavOpen] = useState<boolean>(false);
    const [notebook, setNotebook] = useState<boolean>(false);
    const [prioritiesOnly, setPrioritiesOnly] = useState(false);
    const [myNotes, setMyNotes] = useState<MyNotes[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const router = useRouter();

    const toggleNotebook = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        setNotebook(!notebook);
    };
    const get_title = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTitle(event.target.value);
    };
    const get_content = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setContent(event.target.value);
    };
    const set_all = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPrioritiesOnly(false);
    }
    const set_priority = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPrioritiesOnly(true)
    };
    const navigateToConfig = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        router.push('/my_account');
    };
    const toggleMobleNavBar = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        setMobleNavOpen(!mobleNavOpen);
    };
    const logout = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        router.push('/')
    };
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Api.post('/create_note', {
            title: title,
            content: content
        }).then(()=> window.location.reload()).catch(error => console.log(error))
    };
    
    useEffect(() => {
        Api.get('/my_notes').then(response => {
            const myNotes = response.data
            const sortedNotes = myNotes.sort((a: any, b: any) => b.priority - a.priority);
            setMyNotes(sortedNotes)
        }).catch(error => {
            console.log(error)
        });
    }, []);

    return (
        <Auth>
            <Header mobleNavOpen={mobleNavOpen} page_title="Notas">
                <div className="hidden sm:flex sm:flex-row sm:gap-10 sm:justify-between">
                    <NotesLink focus={true} handle_click={() => {}}/>
                    <ConfigLink focus={false} handle_click={navigateToConfig}/>
                    <LogoutButton handle_click={logout}/>
                </div>
                <div className="sm:hidden">
                    <div className={`${notebook? "hidden":"block"} sm:hidden ${ notebook? "pointer-events-none":"pointer-events-auto cursor-pointer"} sm:pointer-events-none`}>
                        <PlusIcon handle_click={toggleNotebook}/>
                    </div>
                    <div className={`${notebook? "block":"hidden"} sm:hidden ${ notebook? "pointer-events-auto":"pointer-events-none cursor-pointer"} sm:pointer-events-none`}>
                        <BackIcon handle_click={toggleNotebook}/>
                    </div>
                </div>
                <div className={`${mobleNavOpen || notebook? "hidden pointer-events-none":"block pointer-events-auto cursor-pointer"} sm:hidden sm:pointer-events-none`}>
                    <MenuIcon handle_click={toggleMobleNavBar}/>
                </div>
                <div className={`${mobleNavOpen? "block pointer-events-auto cursor-pointer":"hidden pointer-events-none"} sm:hidden sm:pointer-events-none`}>
                    <CloseButton handle_click={toggleMobleNavBar}/>
                </div>
                
            </Header>
            <Main>
                <div className={`w-full h-full flex flex-col justify-start items-start gap-10 sm:grid-cols-[minmax(0,400px)_1fr] sm:grid sm:items-start`}>
                    <aside className="w-full flex sm:flex sm:flex-col sm:gap-14">
                        <div className={`w-full h-full justify-center items-start ${notebook? "flex":"hidden"} sm:flex ${notebook? "pointer-events-auto":"pointer-events-none"} sm:pointer-events-auto`}>
                            <NoteBook submit={submit} get_title={get_title} get_content={get_content}/>
                        </div>

                        <div id="booleans_container" className={`${notebook? 'hidden':'flex'} w-full h-full justify-center items-start flex-row gap-14`}>
                            <div className="boolean">
                                <input type="radio" name="radio_option" id="all_notes" value="all" defaultChecked onChange={() => {
                                    setPrioritiesOnly(false)
                                }} />
                                <label htmlFor="all_notes">TODOS</label>
                            </div>

                            <div className="boolean">
                                <input type="radio" name="radio_option" id="priorities_notes" value="priorities" onClick={() => {
                                    setPrioritiesOnly(true)
                                }} />
                                <label htmlFor="priorities_notes">PRIORIDADES</label>
                            </div>
                        </div>
                    </aside>
                    {
                        myNotes.length > 0 ? (  
                            <div className={`w-full h-full ${notebook ? "hidden":"flex flex-col"} justify-between items-center gap-10 md:flex md:flex-col lg:grid lg:grid-cols-2 lg:items-start xl:grid-cols-3 xl:items-start animate-fade-in-up`}>
                                {
                                    
                                    prioritiesOnly?
                                        myNotes.map((note) => (
                                            note.priority&&(
                                                <NoteCard
                                                    key={note.id}
                                                    id={note.id}
                                                    title={note.title}
                                                    content={note.content}
                                                    priority={note.priority}
                                                />
                                            ))
                                        ) : myNotes.map((note) => (
                                            <NoteCard
                                                key={note.id}
                                                id={note.id}
                                                title={note.title}
                                                content={note.content}
                                                priority={note.priority}
                                            />
                                        ))
                                    
                                }
                            </div>
                        ):(
                            <div className='w-full h-full flex flex-col justify-center items-center animate-fade-in'>
                                <h3 className='w-full text-center justify-center font-light text-xl font-sans text-placeholder sm:flex sm:flex-col sm:items-center'>Sem anotações por aqui</h3>
                            </div>
                        )
                    }
                </div>
            </Main>
        </Auth>
    );
};
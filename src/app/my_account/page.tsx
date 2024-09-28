"use client";

import { useState, useEffect } from "react";
import Auth from "@/auth/Auth";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import NotesLink from "@/components/notes_link/NotesLink";
import ConfigLink from "@/components/account_link/ConfigLink";
import LogoutButton from "@/components/logout_button/LogoutButton";
import MenuIcon from "@/components/menu_icon/MenuIcon";
import CloseButton from "@/components/close_button/CloseButton";
import EditLink from "@/components/edit_link/EditLink";
import { useRouter } from "next/navigation";

export default function MyAccount(){
    const [account, setAccount] = useState({ name: '', email: '' });


    const [mobleNavOpen, setMobleNavOpen] = useState<boolean>(false);

    const router = useRouter();

    const navigateToNotes = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        router.push('/my_notes');
    };
    const navigateToDeleteAccount = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        router.push('/delete_my_account');
    };
    const toggleMobleNavBar = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        setMobleNavOpen(!mobleNavOpen);
    };
    const editName = (event: React.MouseEvent<HTMLParagraphElement>) => {
        event.preventDefault();
        router.push('edit/nome')
    };
    const editEmail = (event: React.MouseEvent<HTMLParagraphElement>) => {
        event.preventDefault();
        router.push('edit/e-mail')
    };
    const editPassword = (event: React.MouseEvent<HTMLParagraphElement>) => {
        event.preventDefault();
        router.push('edit/senha')
    };
    const logout = (event: React.MouseEvent<HTMLOrSVGElement>) => {
        event.preventDefault();
        router.push('/')
    };

    useEffect(() => {
        const name = sessionStorage.getItem("name")
        const email = sessionStorage.getItem("email")
        if (name && email) {
            setAccount({ name, email });
        }
    }, [])

    return(
        <Auth>
            <Header mobleNavOpen={mobleNavOpen} page_title="Conta">
                <div className="hidden sm:flex sm:flex-row sm:gap-10 sm:justify-between">
                    <NotesLink focus={false} handle_click={navigateToNotes}/>
                    <ConfigLink focus={true} handle_click={() => {}}/>
                    <LogoutButton handle_click={logout}/>
                </div>
                <div className={`${mobleNavOpen? "hidden pointer-events-none":"block pointer-events-auto cursor-pointer"} sm:hidden sm:pointer-events-none`}>
                    <MenuIcon handle_click={toggleMobleNavBar}/>
                </div>
                <div className={`${mobleNavOpen? "block pointer-events-auto cursor-pointer":"hidden pointer-events-none"} sm:hidden sm:pointer-events-none`}>
                    <CloseButton handle_click={toggleMobleNavBar}/>
                </div>
            </Header>
            <Main>
                <div className="w-full max-w-[400px] flex flex-col gap-14 justify-center items-center">
                    <div className="w-full max-w-[400px] flex flex-col gap-10 mx-auto animate-slide-in-from-right">
                        <div className="w-full max-w-[400px] flex flex-col gap-4">
                            <div className="w-full flex flex-row justify-between items-center">
                                <h3 className="text-2xl text-titles_colour font-sans font-normal">Nome</h3>
                                <EditLink text="Alterar" handle_click={editName}/>
                            </div>
                            <p className="w-full text-left text-2xl text-placeholder font-sans font-light">{account.name}</p>
                        </div>
                        <div className="w-full max-w-[400px] flex flex-col gap-4">
                            <div className="w-full flex flex-row justify-between items-center">
                                <h3 className="text-2xl text-titles_colour font-sans font-normal">E-mail</h3>
                                <EditLink text="Alterar" handle_click={editEmail}/>
                            </div>
                            <p className="w-full text-left text-2xl text-placeholder font-sans font-light">{account.email}</p>
                        </div>
                        <div className="w-full max-w-[400px] flex flex-col gap-4">
                            <div className="w-full flex flex-row justify-between items-center">
                                <h3 className="text-2xl text-titles_colour font-sans font-normal">Senha</h3>
                                <EditLink text="Alterar" handle_click={editPassword}/>
                            </div>
                            <p className="w-full text-left text-2xl text-placeholder font-sans font-light">**********</p>
                        </div>
                    </div>

                    <div onClick={navigateToDeleteAccount} className="max-w-[192px] p-4 border-b-2 border-alert_colour cursor-pointer animate-fade-in-up">
                        <p className="text-center text-base text-alert_colour">Encerrar minha conta</p>
                    </div>
                </div>
            </Main>
        </Auth>
    )
}
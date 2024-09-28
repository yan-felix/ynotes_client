"use client";

import { useState } from "react";
import Auth from "@/auth/Auth";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import BackIcon from "@/components/back_icon/BackIcon";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import SubmitButton from "@/components/submit_button/SubmitButton";
import AlertMessage from "@/components/alert_message/AlertMessage";
import { useRouter, useParams } from "next/navigation";
import Api from "@/api/Api";

export default function EditAccountInfos(){
    const [newName, setNewName] = useState<string>('');
    const [confirmName, setConfirmName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorType, setErrorType] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [myPassword, setMyPass] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const router = useRouter();
    const params = useParams();
    const editSubject = params.account_info;

    const editName = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Api.post('/change_name', {
            newName: newName, 
            confirmName: confirmName, 
            password: myPassword
        }).then(resp => {
            if(resp.status == 200){
                sessionStorage.setItem("name", newName)
                setSuccess(true);
            };
        }).catch(error => {
            console.log(error);
            setErrorMessage(error.response.data.message);
            setErrorType(error.response.data.type);
        })
    };
    const editEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Api.post('/change_email', {
            newEmail: newEmail, 
            confirmEmail: confirmEmail, 
            password: myPassword
        }).then(resp => {
            if(resp.status == 200){
                sessionStorage.setItem("email", newEmail)
                setSuccess(true);
            };
        }).catch(error => {
            setErrorMessage(error.response.data.message);
            setErrorType(error.response.data.type);
        })
    };
    const editPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Api.post('/change_password', {
            newPassword: newPassword, 
            confirmPassword: confirmPassword, 
            password: myPassword
        }).then(resp => {
            if(resp.status == 200){
                setNewPassword('');
                setConfirmPassword('');
                setSuccess(true);
            };
        }).catch(error => {
            setErrorMessage(error.response.data.message);
            setErrorType(error.response.data.type);
        })
    };
    const goBack = (event: React.MouseEvent<HTMLOrSVGElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.back();
    };

    const sucesseMessage = `${editSubject == 'senha' ? "Sua senha": "Seu "+ editSubject} foi ${editSubject == 'senha' ? "alterada":"alterado"} com sucesso!`;

    return success? (
        <Auth>
            <div className="w-screen h-full flex flex-col gap-24 items-center justify-center p-40">
                <h1 className="w-[250px] text-center text-titles_colour font-sans text-2xl">{sucesseMessage}</h1>
                <button onClick={goBack} className="w-[100px] text-white text-center p-2 text-2xl rounded-lg bg-submit_button_bg hover:bg-main_colour">Ok</button>
            </div>
        </Auth>
    ):(
        <Auth>
            <Header mobleNavOpen={false} page_title="">
                <BackIcon handle_click={goBack}/>
            </Header>
            <Main>
                <div className="w-full animate-fade-in-up">
                    {
                        editSubject == 'nome'? (
                            <Form action="/change_name" submit={editName} legend="Alterar nome">
                                <div className="w-full justify-center items-center flex flex-col gap-14">
                                    <div className="w-full flex flex-col gap-8">
                                        <Input type="text" icon={''} value={newName} alert={errorType === 'string_size' || errorType === 'different_name'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setNewName(event.target.value)} name="new_user_name" placeholder="Novo nome"/>
                                        <Input type="text" icon={''} value={confirmName} alert={errorType === 'different_name'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmName(event.target.value)} name="confirm_new_user_name" placeholder="Confirmar nome"/>
                                        <Input type="password" icon={''} value={myPassword} alert={errorType === 'different_pass'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setMyPass(event.target.value)} name="user_password" placeholder="Sua senha"/>
                                    </div>
                                    <SubmitButton text="Alterar"/>
                                </div>
                            </Form>
                        ) : editSubject == 'e-mail'? (
                            <Form action="/change_email" submit={editEmail} legend="Alterar e-mail">
                                <div className="w-full justify-center items-center flex flex-col gap-14">
                                    <div className="w-full flex flex-col gap-8">
                                        <Input type="text" icon={''} value={newEmail} alert={errorType === 'email' || errorType === 'different_email'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setNewEmail(event.target.value)} name="new_user_email" placeholder="Novo e-mail"/>
                                        <Input type="text" icon={''} value={confirmEmail} alert={errorType === 'different_email'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmEmail(event.target.value)} name="confirm_new_user_email" placeholder="Confirmar e-mail"/>
                                        <Input type="password" icon={''} value={myPassword} alert={errorType === 'different_pass'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setMyPass(event.target.value)} name="user_password" placeholder="Sua senha"/>
                                    </div>
                                    <SubmitButton text="Alterar"/>
                                </div>
                            </Form>
                        ) : (
                            <Form action="/change_password" submit={editPassword} legend="Alterar senha">
                                <div className="w-full justify-center items-center flex flex-col gap-14">
                                    <div className="w-full flex flex-col gap-8">
                                        <Input type="text" icon={''} value={newPassword} alert={errorType === 'pass_format' || errorType === 'different_format'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)} name="new_user_pass" placeholder="Nova senha"/>
                                        <Input type="text" icon={''} value={confirmPassword} alert={errorType === 'different_format'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)} name="confirm_new_user_pass" placeholder="Confirmar senha"/>
                                        <Input type="password" icon={''} value={myPassword} alert={errorType === 'different_pass'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setMyPass(event.target.value)} name="user_password" placeholder="Senha atual"/>
                                    </div>
                                    <SubmitButton text="Alterar"/>
                                </div>
                            </Form>
                        )
                    }
                </div>
            </Main>
        </Auth>
    );
};
"use client";

import React from 'react';
import Auth from '@/auth/Auth';
import Header from '@/components/header/Header';
import Main from '@/components/main/Main';
import BackIcon from '@/components/back_icon/BackIcon';
import Form from '@/components/form/Form';
import Input from '@/components/input/Input';
import SubmitButton from '@/components/submit_button/SubmitButton';
import AlertMessage from '@/components/alert_message/AlertMessage';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Api from '@/api/Api';

export default function DeleteMyAccount(){
    const [myEmail, setMyEmail] = useState<string>('');
    const [myPassword, setMyPass] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorType, setErrorType] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [deleted, setDeleted] = useState<boolean>(false);

    const router = useRouter();

    const goBack = (event: React.MouseEvent<HTMLOrSVGElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.back();
    };
    const goToIndex = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/')
    }
    const deleteAccount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Api.delete('/delete_account', { 
            data: {
                email: myEmail, 
                password: myPassword, 
                confirmPassword: confirmPassword
            }
        }).then(resp => {
            setDeleted(true);
        }).catch(error => {
            setErrorMessage(error.response.data.message);
            setErrorType(error.response.data.type);
        })
    }

    return deleted ? (
        <div className='w-full h-screen'>
            <Header mobleNavOpen={false} page_title=''>
                <></>
            </Header>
            <div className='w-full h-full flex flex-col gap-20 justify-center items-center'>
                <h1 className='text-3xl text-alert_colour text-center font-sans animate-slide-in-from-right'>Sua conta foi encerrada</h1>
                <button onClick={goToIndex} className='p-4 text-main_colour border-2 border-main_colour rounded-lg text-center text-2xl animate-fade-in-up'>Até mais...</button>
            </div>
        </div>
    ):(
        <Auth>
            <Header mobleNavOpen={false} page_title='Encerrar conta'>
                <BackIcon handle_click={goBack}/>
            </Header>
            <Main>
                <Form action="/change_name" submit={deleteAccount} legend="">
                    <div className="w-full justify-center items-center flex flex-col gap-14">
                        <div className="w-full flex flex-col gap-8">
                            <Input type="text" icon={''} value={myEmail} alert={errorType === 'string_size' || errorType === 'different_infos'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setMyEmail(event.target.value)} name="user_email" placeholder="Seu e-mail"/>
                            <Input type="password" icon={''} value={myPassword} alert={errorType === "different_pass" || errorType === 'different_infos' || errorType === "pass_confirmation"} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setMyPass(event.target.value)} name="user_password" placeholder="Sua senha"/>
                            <Input type="password" icon={''} value={confirmPassword} alert={errorType === 'pass_confirmation'} alert_message={errorMessage ? <AlertMessage text={errorMessage}/> : ''} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)} name="confirm_user_password" placeholder="Confirmar senha"/>
                        </div>
                        <SubmitButton text="Excluir conta"/>
                    </div>
                </Form>
            </Main>
        </Auth>
    );
};
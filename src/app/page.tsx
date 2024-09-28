"use client";

import '@/styles/booleans.css'
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import Form from "@/components/form/Form";
import Input from "@/components/input/Input";
import AlertMessage from "@/components/alert_message/AlertMessage";
import SubmitButton from "@/components/submit_button/SubmitButton";
import Checkmark from "@/components/checkmark/Checkmark";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Api from "@/api/Api";

interface userInformations {
  userID: string,
  name: string,
  email: string,
  token: string,
};

function cleanSessionStorage(){
  sessionStorage.setItem("userID", "");
  sessionStorage.setItem("name", "");
  sessionStorage.setItem("email", "");
  sessionStorage.setItem("token", "");
};

function setSessionStorage(userID: userInformations, name: userInformations, email: userInformations, token: userInformations){
  sessionStorage.setItem("userID", `${userID}`);
  sessionStorage.setItem("name", `${name}`);
  sessionStorage.setItem("email", `${email}`);
  sessionStorage.setItem("token", `${token}`);
};

export default function Index() {
  const [isloding, setIsLoading] = useState<boolean>(false);
  const [wellcome, setWellcome] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('')
  const [signUpForm, setSignUpForm] = useState<boolean>(false);
  const [signUpName, setSignUpName] = useState<string>('')
  const [signUpEmail, setSignUpEmail] = useState<string>('')
  const [signUpPassword, setSignUpPassword] = useState<string>('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState<string>('')
  const [errorType, setErrorType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  const router = useRouter();

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Api.post('/login', {
      email: loginEmail,
      password: loginPassword
    }).then(resp => {
      setSessionStorage(resp.data.userID, resp.data.name, resp.data.email, resp.data.token);
      setUserName(resp.data.name)
      setIsLoading(true);
      setTimeout(() => {
        router.push('/my_notes');
      }, 1500);
    }).catch(error => {
      setErrorType(error.response.data.type);
      setErrorMessage(error.response.data.message);
    });
  };
  const signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    Api.post('/sign_up', {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      confirmPassword: signUpConfirmPassword
    }).then(resp => {
      setSessionStorage(resp.data.userID, resp.data.name, resp.data.email, resp.data.token);
      setUserName(resp.data.name)
      setSignUpForm(false);
      setWellcome(true);
    }).catch(error => {
      console.log(error)
      setErrorType(error.response.data.type);
      setErrorMessage(error.response.data.message);
    });
  };

  useEffect(() => {
    cleanSessionStorage()
  }, []);

  return (
    <>
      <Header mobleNavOpen={false} page_title="">
        {<></>}
      </Header>
      <Main>
        <div className={`${!isloding && !wellcome? "w-full h-full max-w-[1200px] flex flex-col justify-center items-start align-middle gap-10 sm:grid-cols-2 sm:grid":"hidden"}`}>
          <div id="login_form" className={`w-full h-full items-start flex ${signUpForm || isloding || wellcome? "hidden pointer-events-none":"block pointer-events-auto"} sm:block sm:pointer-events-auto animate-fade-in-up`}>
            <Form action="/login" submit={login} legend="Login">
              <div className="w-full justify-center items-center flex flex-col gap-14">
                <div className="w-full flex flex-col gap-8">
                  <Input value={loginEmail} type="email" name="login_email" placeholder="E-mail" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(event.target.value)} alert={errorType === "login_empyt_camp" || errorType === "not_found"} alert_message={<AlertMessage text={errorMessage}/>}/>
                  <Input value={loginPassword} type="password" name="login_password" placeholder="Senha" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(event.target.value)} alert={errorType === "login_empyt_camp" || errorType === "different_pass"} alert_message={<AlertMessage text={errorMessage}/>}/>
                </div>

                <SubmitButton text="Entrar"/>

                <small className="text-base text-samll_text sm:hidden sm:pointer-events-none">É novo por aqui? <a href="#" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  setLoginEmail('');
                  setLoginPassword('');
                  setErrorType('');
                  setErrorMessage('');
                  setSignUpForm(true);
                }}
                className="text-base text-main_colour cursor-pointer"
                >Registre-se</a></small>
              </div>
            </Form>
          </div>
          
          <div id="sign_up_form" className={`w-full h-full items-start flex ${signUpForm ? "block":"hidden"} sm:block ${signUpForm? "pointer-events-auto":"pointer-events-none"} sm:pointer-events-auto  animate-fade-in-up`}>
            <Form action="/sign_up" submit={signUp} legend="Sign up">
              <div className="w-full justify-center items-center flex flex-col gap-14">
                <div className="w-full flex flex-col gap-8">
                  <Input value={signUpName} type="text" name="sign_up_name" placeholder="Seu nome" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setSignUpName(event.target.value)} alert={errorType === "sing_up_empyt_camp" || errorType === "name_length"} alert_message={<AlertMessage text={errorMessage}/>}/>
                  <Input value={signUpEmail} type="email" name="sign_up_email" placeholder="Seu e-mail" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setSignUpEmail(event.target.value)} alert={errorType === "sing_up_empyt_camp" || errorType === "email"} alert_message={<AlertMessage text={errorMessage}/>}/>
                  <Input value={signUpPassword} type="password" name="sign_up_password" placeholder="Crie uma senha" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setSignUpPassword(event.target.value)} alert={errorType === "sing_up_empyt_camp" || errorType === "pass_format" || errorType === "pass_confirmation"} alert_message={<AlertMessage text={errorMessage}/>}/>
                  <Input value={signUpConfirmPassword} type="password" name="sign_up_confirm_password" placeholder="Confirme sua senha" icon={<></>} handle_change={(event: React.ChangeEvent<HTMLInputElement>) => setSignUpConfirmPassword(event.target.value)} alert={errorType === "sing_up_empyt_camp" || errorType === "pass_confirmation"} alert_message={<AlertMessage text={errorMessage}/>}/>
                </div>

                <SubmitButton text="Registrar-se"/>

                <small className="text-base text-samll_text sm:hidden sm:pointer-events-none">Já possui conta? <a href="#" onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  setSignUpName('');
                  setSignUpEmail('');
                  setSignUpPassword('');
                  setSignUpConfirmPassword('');
                  setErrorType('');
                  setErrorMessage('');
                  setSignUpForm(false);
                }}
                className="text-base text-main_colour cursor-pointer"
                >Entrar</a></small>
              </div>
            </Form>
          </div>
        </div>
        
        <div className={`w-full h-full ${isloding || wellcome ? "flex  flex-col justify-center items-center":"hidden"}`}>
          <div className={`${!signUpForm && isloding ? "flex flex-col gap-24 justify-center items-center":"hidden"}`}>
            <h1 className="text-3xl text-titles_colour font-sans font-normal text-center animate-fade-in-up">Bom te ver novamente, {userName}</h1>
            <Checkmark diameter={100}/>
            </div>

            <div className={`w-full ${!signUpForm && !isloding && wellcome? "flex flex-col gap-24 justify-center items-center animate-slide-in-from-right":"hidden"}`}>
              <div className="w-full flex flex-col gap-5 justify-center items-center">
                <h1 className="text-3xl text-titles_colour font-sans font-normal text-center">Bem-vindo&#40;a&#41; ao yNotes, {userName}!</h1>
                <small className="text-base text-placeholder font-sans font-normal text-center">Começe a criar suas primeiras anotações</small>
              </div>
              <button onClick={() => router.push('/my_notes')} className="text-2xl text-main_colour text-center p-4 border-2 border-main_colour rounded-lg">Ir para minha conta</button>
              <button onClick={() =>{
                setWellcome(false);
              }} className="text-2xl text-titles_colour text-center p-4 border-b-2 border-titles_colour">Voltar ao Login</button>
            </div>
        </div>
      </Main>
    </>
  );
};

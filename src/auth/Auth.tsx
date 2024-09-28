"use client";

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Api from '@/api/Api';

interface AuthProps {
    children: ReactNode;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
    const router = useRouter();

    Api.get('/auth').then((auth_resp) => {
        console.log(auth_resp.statusText)
    }).catch(() => {
        Api.post('/logout')
        console.log("Falha na autenticação! Faça login novamente e renove suas credenciais.")
        router.push('/');
    });

    return <>{children}</>;
};

export default Auth;
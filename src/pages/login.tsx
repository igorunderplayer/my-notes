import React, { useState } from 'react';
import styles from '../styles/Login.module.css'

import Image from 'next/image'
import { useRouter } from 'next/router';
import axios from 'axios';

const Login: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function login () {
        axios.post('/api/auth', { username, password })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            router.push('/');
        })
    }

  return (
      <div className={styles.container}>
            <div className={styles.login}>
                <h1>Faça login!</h1>

                <div className={styles.itens}>
                    <Image alt="" src="/undraw_fall.svg" height={512} width={512} />

                    <div className={styles.inputs}>
                        <input placeholder="Digite seu nome de usuario aqui" onChange={(e) => setUsername(e.target.value)}/>
                        <input placeholder="Digite sua senha aqui" type="password" onChange={(e) => setPassword(e.target.value)} />

                        <div className={styles.buttons}>
                            <button type="submit" onClick={login}>Login</button>
                            <button type="submit">Register</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default Login;
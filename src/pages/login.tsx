import React, { useState } from 'react';
import styles from '../styles/Login.module.css'

import Image from 'next/image'
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';

import Link from 'next/link'
import Head from 'next/head';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login (e: React.FormEvent) {
      e.preventDefault()
      console.log('oi')
      axios.post('/api/users/login', { username, password })
          axios.post('/api/users/login', { username, password })
          .then(res => {
              if(res.status == 404) {
                  alert('Account not found!')
                  return;
              }
              localStorage.setItem('token', res.data.token);
              router.push('/');
      }).catch((err: Error | AxiosError) => {
          if(axios.isAxiosError(err)) {
              switch (err.response.data.message) {
                  case 'account.notfound':
                      alert('Conta inexistente!')
                      break;
                  case 'password.incorrect':
                      alert('Senha incorreta!')
                      break;
              }
          } else {
              alert('Ocorreu um erro ....')
          }
      })
  }

return (
    <div className={styles.container}>
        <Head>
            <title>MyNotes - Login</title>
        </Head>

          <div className={styles.login}>
              <h1>Faça login!</h1>

              <div className={styles.itens}>
                  <div className={styles.svg}>
                      <Image alt="" src="/undraw_fall.svg" height={512} width={512} />
                  </div>

                  <form className={styles.inputs} onSubmit={login}>
                      <input placeholder="Digite seu nome de usuario aqui" onChange={(e) => setUsername(e.target.value)}/>
                      <input placeholder="Digite sua senha aqui" type="password" onChange={(e) => setPassword(e.target.value)} />

                      <div className={styles.buttons}>
                          <button type="submit" onClick={login}>Login</button>
                          <Link href="/register" passHref><button type="submit">Register</button></Link>
                      </div>
                  </form>
              </div>
          </div>
    </div>
)
}

export default Login;
import React, { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Register.module.css'

const Register: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function register () {
            axios.post('/api/users/me', { username, password })
            .then(res => {
                if (res.status == 200) {
                    alert('Sua conta foi criada com sucesso, você sera redirecionado!')
                    router.push('/login')
                    return;
                } else {
                    alert(`Não foi possivel registra-lo, erro: ${res.data.message}`)
                    router.push('/')
                    return;
                }
        })
    }

  return (
      <div className={styles.container}>
            <div className={styles.login}>
                <h1>Registre-se!</h1>

                <div className={styles.itens}>
                    <div className={styles.svg}>
                        <Image alt="" src="/undraw_before_dawn_.svg" height={512} width={512} />
                    </div>

                    <div className={styles.inputs}>
                        <input placeholder="Digite seu nome de usuario aqui" onChange={(e) => setUsername(e.target.value)}/>
                        <input placeholder="Digite sua senha aqui" type="password" onChange={(e) => setPassword(e.target.value)} />

                        <div className={styles.buttons}>
                            <button type="submit" onClick={register}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default Register;
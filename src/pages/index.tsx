import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export interface IUser {

}

export interface INote {

}

const Home: React.FC = () =>  {
  const [user, setUser] = useState<IUser>()
  const [notes, setNotes] = useState<INote>()

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      router.push('/login')
      return;
    } else {
      axios.get('/api/users/me', {
        headers: {
          token: `Bearer ${token}`
        }
      }).then(res => {
        if(res.status != 200) 
        alert('Hm')

        setUser(res.data)
      })
    }
  }, [router])

  return (
    <div className={styles.container}>
      { !user ? <></> : (
        <>
        </>
      )}
    </div>
  )
}

export default Home

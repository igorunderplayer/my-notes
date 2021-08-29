import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import Note from '../components/Note'
import styles from '../styles/Home.module.css'

export interface IUser {
    username: string;
    password: string;
  }
  
export interface INote {
    title: string;
    value: string;
    id: string
  }

const Home: React.FC = () =>  {
  const [user, setUser] = useState<IUser>()
  const [notes, setNotes] = useState<INote[]>([])

  const router = useRouter()

  const getNotes = async () => {
    const res = await axios.get('/api/notes', {
      headers: {
        token: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setNotes(res.data)
  }

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
      }).then(async res => {
        if(res.status != 200) 
        alert('Hm')

        setUser(res.data)
        await getNotes()
      })
    }
  }, [router])

  return (
    <div className={styles.container}>
      { !user ? <></> : (
        <div className={styles.notes}>
          { notes.map((note, i) => <Note key={i} data={note} />) }
        </div>
      )}
    </div>
  )
}

export default Home

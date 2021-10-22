import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import CreateNotePopup from '../components/CreateNotePopup'
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

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  const getNotes = async () => {
    const res = await axios.get('/api/notes', {
      headers: {
        token: localStorage.getItem('token')
      }
    })

    setNotes(res.data)
  }

  const createNote = async (title: string, value: string) => {
    const token = localStorage.getItem('token');
    if(!token) router.reload();

    if(title.length <= 0) 
      title = "Nota sem titulo";

    if(value.length <= 0)
      value = "Nota sem conteudo";

    const res = await axios.post('/api/notes', { title, value }, {
      headers: {
        token: token
      }
    })

    if(res.status != 200) {
      alert('Não foi possivel criar sua nota')
      return;
    }

    if(res.data.note) {
      setNotes([...notes, res.data.note])
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      router.push('/login')
      return;
    } else {
      axios.get('/api/users/me', {
        headers: {
          token: token
        }
      }).then(async res => {
        if(res.status != 200) 
        alert('Hm')

        setUser(res.data)
        await getNotes()
      })
    }
  }, [router])

  function logout () {
    localStorage.removeItem('token');
    router.reload();
  }

  return (
    <div className={styles.container}>
      { !user ? <></> : (
        <>
          <button onClick={() => setIsOpen(!isOpen)} style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}>Adicionar nova nota</button>

          <button onClick={logout} style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}>Logout...</button>

          { isOpen && <CreateNotePopup onCreateNote={createNote} handleClose={() => setIsOpen(!isOpen)} /> }

          <div className={styles.notes}>
            { notes.map((note, i) => <Note key={i} data={note} />) }
          </div>
        </>
      )}
    </div>
  )
}

export default Home

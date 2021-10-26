import React from 'react';
import axios from 'axios'
import Image from 'next/image'

import styles from './Note.module.css'
import { INote } from '../../pages/index'

interface Props {
  data: INote
  onDeleteNote: () => void
}

const Note: React.FC<Props> = ({ data, onDeleteNote }) => {
  const deleteThisNote = async () => {
    if(window.confirm('Voce realmente deseja apagar esta nota? ela sera apagada para todo o sempre e n tera mais volta :(')) {
      const res = await axios.delete('/api/notes', {
        headers: {
          noteid: data.id,
          token: localStorage.getItem('token')
        }
      })
  
      if(res.status == 200) {
        onDeleteNote()
      }
    }
  }
  return (
      <div className={styles.container}>
        <div className={styles.trashCan}>
          <Image
            
            src="/trash_can.svg"
            alt=""
            height={24}
            width={24}
            onClick={deleteThisNote} />
        </div>
        
        <h2>{data.title}</h2>
          <p>{data.value}</p>
      </div>
  )
}

export default Note;
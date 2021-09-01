import React from 'react';
import styles from './Note.module.css'
import { INote } from '../../pages/index'

interface Props {
  data: INote
}

const Note: React.FC<Props> = ({ data }) => {
  return (
      <div className={styles.container}>
        <h2>{data.title}</h2>
          <p>{data.value}</p>
      </div>
  )
}

export default Note;
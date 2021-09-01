import React, { ReactNode, useState } from 'react';
import Image from 'next/image'

import styles from './CreateNotePopup.module.css';

interface Props {
    handleClose(): void
    onCreateNote(title: string, value: string): Promise<void>
}

const CreateNotePopup: React.FC<Props> = ({ handleClose, onCreateNote }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 24)
            return

        setTitle(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>

            <div className={styles.itens}>
                        <div className={styles.svg}>
                            <Image alt="" src="/undraw_text_field.svg" height={512} width={512} />
                        </div>

                        <div className={styles.inputs}>
                            <h3>Insira algumas informações sobre sua nota</h3>
                            <input
                             type="text"
                             placeholder="Titulo"
                             value={title}
                             onChange={handleTitle}/>
                            <textarea
                             placeholder="Conteudo"
                             value={value}
                             onChange={(e) => setValue(e.target.value)}/>

                            <div className={styles.buttons}>
                                <button type="submit" onClick={() => { 
                                    onCreateNote(title, value)
                                    handleClose();
                                 }}>Create</button>
                                <button onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    )
}

export default CreateNotePopup;
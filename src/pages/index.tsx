import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

export interface IUser {

}

const Home: React.FC = () =>  {
  const [user, setUser] = useState<IUser>()
  return (
    <div className={styles.container}>
    
    </div>
  )
}

export default Home

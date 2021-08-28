import React from 'react';
import Link from 'next/link'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
      <div className={styles.header}>
          <ul>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
          </ul>
      </div>
  );
}

export default Header;
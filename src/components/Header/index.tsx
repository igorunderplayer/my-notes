import React from 'react';
import Link from 'next/link'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
      <div className={styles.header}>
          {/* <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
          </div> */}
      </div>
  );
}

export default Header;
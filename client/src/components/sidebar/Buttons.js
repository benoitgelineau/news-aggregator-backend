import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/sidebar/Buttons.scss';

const Buttons = () => (
  <div className={styles.buttons}>
    <Link to="/bookmarks" className={styles.bookmarks}>
      <i className="fas fa-bookmark" />
      <h3>Bookmarks</h3>
    </Link>
  </div>
);

export default Buttons;

import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.page}>
            <h2 className={styles.title}>404: Not Found</h2>
            <p className={styles.subtitle}>We couldn't find the page you were looking for.</p>
        
            <Link className={styles.primaryButton} to={'/'}>
                Return to Homepage
            </Link>
        <div className={styles.buttonGroup}>

            <Link className={styles.secondaryButton} to={'/todos'}>
                Go to My Todos
            </Link>
            <Link className={styles.secondaryButton} to={'/profile'}>
                Go to My Profile
            </Link>
            <Link className={styles.secondaryButton} to={'/about'}>
                About
            </Link>
        </div>
    </div>
  );
}
export default NotFoundPage;
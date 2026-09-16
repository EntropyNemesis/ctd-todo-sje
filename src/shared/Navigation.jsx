import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navigation.module.css';

function Navigation() {

    const {isAuthenticated} = useAuth();

    return (
        <>
        <nav>
            <ul className={styles.navList}>
                <li><NavLink to='/about' className={navLinkStyle}>About</NavLink></li>

                {isAuthenticated 
                ? (
                    <>
                    <li>
                        <NavLink to='/todos' className={navLinkStyle}>Todos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile' className={navLinkStyle}>Profile</NavLink>
                    </li>
                    </>
                    )
                : (<li>
                        <NavLink to='/login' className={navLinkStyle}>Login</NavLink>
                    </li>)
                }
            </ul>
        </nav>
        </>
    )
}


function navLinkStyle({isActive}) {
    return isActive 
        ? `${styles.navLink} ${styles.navLinkActive}`
        : styles.navLink;
};

export default Navigation;
import { NavLink, Outlet } from 'react-router-dom';
import planet from '../planet.png';
import styles from '../css/Navbar.module.css';

function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <img className={styles.logo} src={planet} alt="Logo" />
          <h1 className={styles.h1}>Space Travelers&apos; Hub</h1>
        </div>
        <div className={styles.rigth}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  const active = isActive ? styles.active : styles.navLink;
                  return active;
                }}
              >
                Missions
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to="rockets"
                className={({ isActive }) => {
                  const active = isActive ? styles.active : styles.navLink;
                  return active;
                }}
              >
                Rockets
              </NavLink>
            </li>
            <li className={styles.li}>
              <NavLink
                to="profile"
                className={({ isActive }) => {
                  const active = isActive ? styles.active : styles.navLink;
                  return active;
                }}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

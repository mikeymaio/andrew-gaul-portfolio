import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styles from './navigation.module.css';
import { iOSSafari } from '../../utils';

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]', {
    offset: 50,
  })
}

export default (props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(null);

  useEffect(() => {
    scrollOnLoad();
    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  function handleResize() {
    const isIosSafari = iOSSafari(window.navigator.userAgent)

    if (isIosSafari) {
      const docHeight = window.innerHeight;

      const heroImageContainer = document.getElementById('home').firstElementChild;

      heroImageContainer.style.height = `${docHeight}px`;
    }
  };

  function scrollOnLoad() {
    if (window.location.hash) {
      const scrollEl = document.getElementById(window.location.hash.split('#')[1])
      if (scrollEl) {
        const scrollDestination = scrollEl.getBoundingClientRect().top - 61;
        window.scrollTo({
          top: scrollDestination,
          behavior: 'smooth'
        });
        return handleScroll()
      }
    }
  }

  function handleScroll() {
    const scrolled = window.scrollY > window.innerHeight - 61;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  const mobileNavClassNames = [styles.mobileNavigation, menuOpen ? styles.menuOpen : ''].join(' ')

  const burgerIconClassNames = [styles.navIcon, menuOpen ? styles.navIconOpen : ''].join(' ')

  const navStyles = [styles.navContainer, !isScrolled && !menuOpen && !props.showNav ? styles.navTop : ''].join(' ');

  return (
    <nav role="navigation" className={navStyles}>
      <div className={styles.mobileContainer}>
      <button onClick={toggleMenu} className={burgerIconClassNames}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 className={styles.navTitle}>Andrew Gaul</h1>
      </div>
      <ul className={mobileNavClassNames}>
        <li className={styles.navigationItem} key="homeMobile">
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li className={styles.navigationItem} key="actingtMobile">
          <Link to="/acting" onClick={toggleMenu}>Acting</Link>
        </li>
        <li className={styles.navigationItem} key="editingMobile">
          <Link to="/editing" onClick={toggleMenu}>Editing</Link>
        </li>
        <li className={styles.navigationItem} key="contactMobile">
          <Link to="/#contact" onClick={toggleMenu}>Contact</Link>
        </li>
      </ul>
      <ul className={styles.navigation}>
        <Fade left cascade duration={1500}>
        <li className={styles.navigationItem} key="home">
          <Link to={window.location.pathname === '/' ? '/#top' : '/'}>Home</Link>
        </li>
        <li className={styles.navigationItem} key="acting">
          <Link to="/acting">Acting</Link>
        </li>
        <li className={styles.navigationItem} key="recentWork">
          <Link to="/editing">Editing</Link>
        </li>
        <li className={styles.navigationItem} key="contact">
          <Link to="/#contact">Contact</Link>
        </li>
        </Fade>
      </ul>
    </nav>
  )
}
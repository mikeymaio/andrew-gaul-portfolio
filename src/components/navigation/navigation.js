import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Fade from 'react-reveal/Fade'
import styles from './navigation.module.css'
import { iOSSafari } from '../../utils'
import Social from '../social/social'

if (typeof window !== 'undefined' && window) {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]', {
    offset: 50,
  })
}

export default (props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(null)

  useEffect(() => {
    scrollOnLoad()
    handleScroll()
    handleResize()

    window?.addEventListener('scroll', handleScroll)

    return () => window?.removeEventListener('scroll', handleScroll)
  }, [])

  function handleResize() {
    const isIosSafari = iOSSafari(window?.navigator?.userAgent)

    if (isIosSafari) {
      const docHeight = window?.innerHeight

      const heroImageContainer = document.getElementById('home')
        .firstElementChild

      heroImageContainer.style.height = `${docHeight}px`
    }
  }

  function scrollOnLoad() {
    if (window?.location?.hash) {
      const scrollEl = document.getElementById(
        window?.location?.hash?.split('#')[1]
      )
      if (scrollEl) {
        const scrollDestination = scrollEl.getBoundingClientRect().top - 61
        window?.scrollTo({
          top: scrollDestination,
          behavior: 'smooth',
        })
        return handleScroll()
      }
    }
  }

  function handleScroll() {
    const scrolled = window?.scrollY > window?.innerHeight - 61
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  const mobileNavClassNames = [
    styles.mobileNavigation,
    menuOpen ? styles.menuOpen : '',
  ].join(' ')

  const burgerIconClassNames = [
    styles.navIcon,
    menuOpen ? styles.navIconOpen : '',
  ].join(' ')

  const navStyles = [
    styles.navContainer,
    !isScrolled && !menuOpen && !props.showNav ? styles.navTop : '',
  ].join(' ')

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
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className={styles.navigationItem} key="actingtMobile">
          <Link to="/acting" onClick={toggleMenu}>
            Acting
          </Link>
        </li>
        <li className={styles.navigationItem} key="editingMobile">
          <Link to="/editing" onClick={toggleMenu}>
            Editing
          </Link>
        </li>
        <li className={styles.navigationItem} key="contactMobile">
          <a href="/#contact" onClick={toggleMenu}>
            Contact
          </a>
        </li>
        <li>
          <Social social={props.social} small />
        </li>
      </ul>
      <ul className={styles.navigation}>
        <Fade cascade duration={1500}>
          <li
            className={[styles.navigationItem, styles.homeLink].join(' ')}
            key="home"
          >
            <Link to={'/'}>
              andrew<span className={styles.accentColor}>.</span>gaul
            </Link>
          </li>
        </Fade>
        <li className={styles.navigation}>
          <Fade cascade duration={1500}>
            <li className={styles.navigationItem} key="acting">
              <Link to="/acting">Acting</Link>
            </li>
            <li className={styles.navigationItem} key="recentWork">
              <Link to="/editing">Editing</Link>
            </li>
            <li className={styles.navigationItem} key="contact">
              <a href="/#contact">Contact</a>
            </li>
          </Fade>
        </li>
      </ul>
    </nav>
  )
}

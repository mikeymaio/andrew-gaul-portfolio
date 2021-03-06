import React from 'react'
import Img from 'gatsby-image'
import Social from '../social/social'
import Footer from '../footer/footer'

import styles from './contact.module.css'

export default (props) => {
  const {
    contact: {
      node: { title, backgroundImage },
    },
    social,
  } = props

  return (
    <div className={styles.contactContainer} id="contact">
      {backgroundImage && (
        <div className={styles.backgroundImage}>
          <Img
            className={styles.backgroundImage}
            alt={title}
            fluid={backgroundImage.fluid}
          />
        </div>
      )}
      <div className={styles.content}>
        <div
          className={['wrapper', styles.wrapper].join(' ')}
          data-sal="fade"
          data-sal-delay="300"
          data-sal-duration="900"
          data-sal-easing="ease"
        >
          <h2 className="section-headline">{title}</h2>
          <div className={styles.formWrapper}>
            <form
              className={styles.form}
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows="6" />
              </div>
              <ul className={styles.actions}>
                <li key="submit">
                  <input type="submit" value="SEND" className="special" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <Footer social={social} />
    </div>
  )
}

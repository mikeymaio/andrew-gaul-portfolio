import React from 'react'
import Img from 'gatsby-image'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

import Social from '../social/social'

import styles from './hero.module.css'

export default ({ data, hideTitle, social }) => {
  const shouldCascade = typeof window !== 'undefined' && window ? window.matchMedia('(min-width: 768px)').matches : false;

  return (
    <div className={styles.hero} id="home">
      <Img
        className={styles.heroImage}
        alt={data.name || 'hero'}
        fluid={data.heroImage.fluid}
      />
      <div className={styles.heroDetails}>
        {data.title && !hideTitle && (
          <h1 className={styles.heroHeadline}>
            <Zoom left cascade={shouldCascade} duration={2000}>
              {data.title}
            </Zoom>
          </h1>
        )}
        {data.shortBio && (
          <h2>
            <Zoom right cascade={shouldCascade} duration={2500}>
              {data.shortBio.shortBio}
            </Zoom>
          </h2>
        )}
      </div>
      <Social
        social={social}
        style={{
          position: 'absolute',
          bottom: 20,
          justifyContent: 'flex-end',
        }}
      />
    </div>
  )
}

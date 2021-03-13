import React from 'react'
import styles from './social.module.css'

export default (props) => {
  if (!props.social) return null
  const {
    social: {
      node: { linkedIn, twitter, instagram, imdb },
    },
    style,
  } = props

  const smallLink = props.small && styles.socialLinkSmall

  return (
    <div className={styles.socialWrapper} style={style || {}}>
      {twitter && (
        <a
          href={twitter}
          target="_blank"
          className={[
            styles.socialLink,
            styles.socialLinkTwitter,
            smallLink,
          ].join(' ')}
        >
          <i className="fab fa-twitter"></i>
        </a>
      )}
      {linkedIn && (
        <a
          href={linkedIn}
          target="_blank"
          className={[
            styles.socialLink,
            styles.socialLinkLinkedIn,
            smallLink,
          ].join(' ')}
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          className={[styles.socialLink, styles.socialLinkIG, smallLink].join(
            ' '
          )}
        >
          <i className="fab fa-instagram"></i>
        </a>
      )}
      {imdb && (
        <a
          href={imdb}
          target="_blank"
          className={[styles.socialLink, styles.socialLinkIMDB, smallLink].join(
            ' '
          )}
        >
          <i className="fab fa-imdb"></i>
        </a>
      )}
    </div>
  )
}

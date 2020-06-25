import React from 'react';
import styles from './social.module.css';

export default props => {
  if (!props.social) return null;
  const { social: { node: { linkedIn, twitter, instagram, imdb } }, style } = props;

  return (
    <div className={styles.socialWrapper} style={style || {}}>
        {twitter && (
           <a
            href={twitter}
            target="_blank"
            className={[styles.socialLink, styles.socialLinkTwitter].join(' ')}
          >
            <i className="fab fa-twitter"></i>
          </a>
        )}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            className={[styles.socialLink, styles.socialLinkLinkedIn].join(' ')}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            className={[styles.socialLink, styles.socialLinkIG].join(' ')}
          >
            <i className="fab fa-instagram"></i>
          </a>
        )}
        {imdb && (
          <a
            href={imdb}
            target="_blank"
            className={[styles.socialLink, styles.socialLinkIMDB].join(' ')}
          >
            <i className="fab fa-imdb"></i>
          </a>
        )}
    </div>
  );
};


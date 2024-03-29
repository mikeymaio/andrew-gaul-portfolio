import React from 'react'
import Img from 'gatsby-image'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'

import Social from '../social/social'
import VimeoPlayer from '../vimeo-player/vimeo-player'

import styles from './hero.module.css'

let WaterWave

if (typeof window !== 'undefined' && window) {
  // eslint-disable-next-line global-require
  WaterWave = require('../../../libs/react-water-wave')
}

export default ({ data, hideTitle, social }) => {
  const hasWindow = typeof window !== 'undefined' && window
  const shouldCascade = hasWindow
    ? window.matchMedia('(min-width: 768px)').matches
    : false

  const [backgroundPosition, setBackgroundPosition] = React.useState('center')

  // React.useEffect(() => {
  //   if (WaterWave) {
  //     setBackgroundPosition('center');
  //   }
  // }, [])

  if (WaterWave && !data.showVideoReel) {
    return (
      <WaterWave.default
        imageUrl={data.heroImage.fluid.src}
        crossOrigin="anonymous"
        style={{ backgroundPosition }}
      >
        {(methods) => (
          <div
            className={[
              styles.hero,
              data.showVideoReel && styles.videoHero,
            ].join(' ')}
            id="home"
          >
            <div className={styles.heroImageSpacer} />
            <div
              className={[
                styles.heroDetails,
                data.showVideoReel && styles.transparent,
              ].join(' ')}
            >
              <div className={styles.heroTextWrapper}>
                {data.title && !hideTitle && (
                  <h1 className={styles.heroHeadline}>
                    <Fade cascade={shouldCascade} duration={2000}>
                      {data.title}
                    </Fade>
                  </h1>
                )}
                {data.shortBio && (
                  <h2>
                    <Fade cascade={shouldCascade} duration={2500}>
                      {data.shortBio.shortBio}
                    </Fade>
                  </h2>
                )}
              </div>
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
        )}
      </WaterWave.default>
    )
  }

  return (
    <div
      className={[styles.hero, data.showVideoReel && styles.videoHero].join(
        ' '
      )}
      id="home"
    >
      {!!data.videoReel || (!!data.videoReelLink && data.showVideoReel) ? (
        <VimeoPlayer
          videoReel={
            data.videoReelLink ||
            'https://player.vimeo.com/video/195873953?autoplay=1&loop=1&byline=0&title=0'
          }
          showVideoReel={data.showVideoReel}
        />
      ) : (
        <Img
          className={styles.heroImage}
          alt={data.name || 'hero'}
          fluid={data.heroImage.fluid}
        />
      )}
      <div
        className={[
          styles.heroDetails,
          data.showVideoReel && styles.transparent,
        ].join(' ')}
      >
        <div className={styles.heroTextWrapper}>
          {data.title && !hideTitle && (
            <h1 className={styles.heroHeadline}>
              <Fade cascade={shouldCascade} duration={2000}>
                {data.title}
              </Fade>
            </h1>
          )}
          {data.shortBio && (
            <h2>
              <Fade cascade={shouldCascade} duration={2500}>
                {data.shortBio.shortBio}
              </Fade>
            </h2>
          )}
        </div>
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

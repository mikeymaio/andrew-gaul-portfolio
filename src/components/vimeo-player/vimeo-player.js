import React from 'react'

import styles from './vimeo-player.module.css'

export default ({ showVideoReel, videoReel }) => {
  if (!showVideoReel || !videoReel) return null

  return (
    <div className={styles.vimeoWrapper}>
      <iframe
        src={videoReel}
        id="video"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        muted
      />
      {/* <button id="play-button">Play</button>
      <button id="pause-button">Pause</button> */}
    </div>
  )
}

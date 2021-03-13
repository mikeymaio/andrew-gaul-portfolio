import React from 'react'

import styles from './vimeo-player.module.css'

export default ({ showVideoReel, videoReel }) => {
  if (!showVideoReel || !videoReel) return null

  // return null;

  // var iframe = document.getElementById('video');

  // // $f == Froogaloop
  // var player = $f(iframe);

  // var playButton = document.getElementById("play-button");
  // playButton.addEventListener("click", function() {
  //   player.api("play");
  // });

  // var pauseButton = document.getElementById("pause-button");
  // pauseButton.addEventListener("click", function() {
  //   player.api("pause");
  // });

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

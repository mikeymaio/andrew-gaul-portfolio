import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Img from 'gatsby-image'

const Slider = props => {
  // const media = props.media.map(item => {
  //   if (
  //     item.indexOf('.png') !== -1 ||
  //     item.indexOf('.jpg') !== -1 ||
  //   ) {
  //     return (
  //       import Img from 'gatsby-image'
  //     )
  //   }
  // })

  if (!props.children || !props.children.length) return null;
  return (
    <AwesomeSlider style={props.style} className={props.className} bullets={false}>
      {props.children}
    </AwesomeSlider>
  )
}

export default Slider;

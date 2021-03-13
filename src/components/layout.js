import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import base from './base.css'
import Container from './container'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import Contact from './contact/contact'

class Template extends React.Component {
  render() {
    // const [contact] = get(this, 'props.data.allContentfulContact.edges');
    // const [social] = get(this, 'props.data.allContentfulSocial.edges');

    const { location, children, social, contact, showNav } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation showNav={showNav} social={social} />
        {children}
        <Contact contact={contact} social={social} />
        {/* <Footer contact={contact} social={social} /> */}
      </Container>
    )
  }
}

export default Template

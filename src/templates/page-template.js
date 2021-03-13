import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import Hero from '../components/hero/hero'

import heroStyles from '../components/hero/hero.module.css'

class PageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulPageTemplate')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const [contact] = get(this, 'props.data.allContentfulContact.edges');
    const [social] = get(this, 'props.data.allContentfulSocial.edges');

    return (
      <Layout location={this.props.location} contact={contact} social={social}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${page.title} | ${siteTitle}`}>
            <script src="https://kit.fontawesome.com/b2ab21912f.js" crossorigin="anonymous" samesite="none" secure></script>
          </Helmet>
          <Hero data={page} hideTitle social={social} />
          {/* <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={page.title}
              fluid={page.heroImage.fluid}
            />
          </div> */}
          <div className="wrapper">
            <h1 className="section-headline">{page.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: page.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPageTemplate(slug: { eq: $slug }) {
      title
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      videoReel {
        file {
            contentType
            url
        }
        fluid(maxWidth: 1440, background: "rgb:000000") {
            ...GatsbyContentfulFluid_noBase64
        }
      }
      showVideoReel
    }

    allContentfulContact {
      edges {
        node {
          title
          backgroundImage {
            fluid(
              maxWidth: 2000
              resizingBehavior: FILL
              background: "rgb:FFFFFF"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }

    allContentfulSocial {
      edges {
        node {
          twitter
          linkedIn
          instagram
          imdb
        }
      }
    }

  }
`

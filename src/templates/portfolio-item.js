import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Carousel from '../components/carousel/carousel'

import heroStyles from '../components/hero/hero.module.css'

import styles from './portfolio-item.module.css'

class PortfolioItemTemplate extends React.Component {
  render() {
    const portfolioItem = get(this.props, 'data.contentfulPortfolioItem')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const [contact] = get(this, 'props.data.allContentfulContact.edges');
    const [social] = get(this, 'props.data.allContentfulSocial.edges');

    return (
      <Layout location={this.props.location} social={social} contact={contact} showNav={true}>
        <div style={{ background: '#fff' }} className={styles.portfolioItemWrapper}>
          <Helmet title={`${portfolioItem.title} | ${siteTitle}`}>
            <script src="https://kit.fontawesome.com/b2ab21912f.js" crossorigin="anonymous" samesite="none" secure></script>
          </Helmet>
          <div className="wrapper">
            <Carousel className={styles.carousel}>
              {portfolioItem.gallery.map(item => (
                <div style={{ width: '100%', height: '100%' }}>
                  <Img
                    className={styles.galleryItem}
                    alt={item.title}
                    fluid={item.fluid}
                  />
                </div>
              ))}
            </Carousel>
            <h1 className="section-headline">{portfolioItem.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {`Released ${portfolioItem.releaseDate}`}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: portfolioItem.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default PortfolioItemTemplate

export const pageQuery = graphql`

  query PortfolioItemBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPortfolioItem(slug: { eq: $slug }) {
      body {
        childMarkdownRemark {
          html
        }
      }
      gallery {
        title
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      slug
      tags
      title
      releaseDate(formatString: "MMMM YYYY")
    }

    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
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

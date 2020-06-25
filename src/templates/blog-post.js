import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Carousel from '../components/carousel/carousel'

import heroStyles from '../components/hero/hero.module.css'

import styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPortfolioItem')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const [contact] = get(this, 'props.data.allContentfulContact.edges');
    const [social] = get(this, 'props.data.allContentfulSocial.edges');

    console.log('gallery: ', post.gallery);

    return (
      <Layout location={this.props.location} social={social} contact={contact} showNav={true}>
        <div style={{ background: '#fff' }} className={styles.portfolioItemWrapper}>
          <Helmet title={`${post.title} | ${siteTitle}`}>
            <script src="https://kit.fontawesome.com/b2ab21912f.js" crossorigin="anonymous" samesite="none" secure></script>
          </Helmet>
          {/* <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
            <Carousel />
          </div> */}
          <div className="wrapper">
            <Carousel className={styles.carousel}>
              {post.gallery.map(item => (
                <div style={{ width: '100%', height: '100%' }}>
                  <Img
                    className={styles.galleryItem}
                    alt={item.title}
                    fluid={item.fluid}
                  />
                </div>
              ))}
            </Carousel>
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {`Released ${post.releaseDate}`}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`

  query BlogPostBySlug($slug: String!) {
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

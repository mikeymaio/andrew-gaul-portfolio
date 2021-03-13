import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './portfolio.module.css'
import Layout from '../components/layout'
import PortfolioItemPreview from '../components/portfolio-item-preview/portfolio-item-preview'

class PortfolioIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const projects = get(this, 'props.data.allContentfulPortfolioItem.edges')
    const [contact] = get(this, 'props.data.allContentfulContact.edges');
    const [social] = get(this, 'props.data.allContentfulSocial.edges');

    return (
      <Layout location={this.props.location} contact={contact} social={social} showNav={true}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle}>
            <script src="https://kit.fontawesome.com/b2ab21912f.js" crossorigin="anonymous" samesite="none" secure></script>
          </Helmet>
          <div className={styles.hero}>Portfolio</div>
          <div className="wrapper">
            <h2 className="section-headline">Recent Work</h2>
            <ul className="article-list">
              {projects.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <PortfolioItemPreview project={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PortfolioIndex

export const pageQuery = graphql`
  query PortfolioIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPortfolioItem(sort: { fields: [releaseDate], order: DESC }) {
      edges {
        node {
          description {
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
          productionCompany
          releaseDate(formatString: "MMMM YYYY")
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

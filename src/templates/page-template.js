import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import Hero from '../components/hero/hero'
import PortfolioItemPreview from '../components/portfolio-item-preview/portfolio-item-preview'

import heroStyles from '../components/hero/hero.module.css'

class PageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulPageTemplate')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const [contact] = get(this, 'props.data.allContentfulContact.edges')
    const [social] = get(this, 'props.data.allContentfulSocial.edges')
    const portfolioItems = get(
      this.props,
      'data.allContentfulPortfolioItem.edges'
    )

    return (
      <Layout location={this.props.location} contact={contact} social={social}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${page.title} | ${siteTitle}`}>
            <script
              src="https://kit.fontawesome.com/b2ab21912f.js"
              crossorigin="anonymous"
              samesite="none"
              secure
            ></script>
          </Helmet>
          <Hero data={page} hideTitle social={social} />
          <div className="wrapper">
            <h1
              className="section-headline"
              data-sal="slide-left"
              data-sal-delay="250"
              data-sal-duration="900"
              data-sal-easing="ease"
            >
              {page.title}
            </h1>
            {page.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: page.body.childMarkdownRemark.html,
                }}
                data-sal="slide-right"
                data-sal-delay="250"
                data-sal-duration="900"
                data-sal-easing="ease"
              />
            )}
            {page.showPortfolioList &&
              !!portfolioItems &&
              !!portfolioItems.length && (
                <div
                  className="section-header-row"
                  data-sal="slide-left"
                  data-sal-delay="250"
                  data-sal-duration="900"
                  data-sal-easing="ease"
                >
                  <ul className="article-list" style={{ marginTop: 50 }}>
                    {portfolioItems
                      .filter((item) =>
                        page.filterPortfolioType
                          ? item.node.tags.indexOf(page.filterPortfolioType) >
                            -1
                          : item
                      )
                      .map(({ node }) => {
                        return (
                          <li key={node.slug}>
                            <PortfolioItemPreview project={node} />
                          </li>
                        )
                      })}
                  </ul>
                </div>
              )}
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
              ...GatsbyContentfulFluid
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
    contentfulPageTemplate(slug: { eq: $slug }) {
      title
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
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
      showPortfolioList
      filterPortfolioType
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
              ...GatsbyContentfulFluid
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

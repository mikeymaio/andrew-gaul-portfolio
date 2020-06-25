import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero/hero'
import Layout from '../components/layout'
import PortfolioItemPreview from '../components/portfolio-item-preview/portfolio-item-preview'

class RootIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event){
    this.setState({ filter: event.target.value });
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const portfolioItems = get(this, 'props.data.allContentfulPortfolioItem.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const [contact] = get(this, 'props.data.allContentfulContact.edges');
    const [social] = get(this, 'props.data.allContentfulSocial.edges');


    return (
      <Layout location={this.props.location} social={social} contact={contact}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle}>
            <script src="https://kit.fontawesome.com/b2ab21912f.js" crossorigin="anonymous" samesite="none" secure></script>
          </Helmet>
          <Hero data={author.node} social={social} />
          <div className="wrapper">
            <div className="section-header-row">
              <h2 className="section-headline">Recent Work</h2>
              <div className="filter-row">
              Filter: 
              <select className="portfolio-filter" onChange={this.handleSelectChange} value={this.state.filter}>
                <option value="all">All</option>
                <option value="acting">Acting</option>
                <option value="editing">Editing</option>
                <option value="production">Production</option>
              </select>
              </div>
            </div>
            <ul className="article-list">
              {portfolioItems.map(({ node }) => {
                if (this.state.filter !== 'all' && node.tags.indexOf(this.state.filter) === - 1) return null;
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

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
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

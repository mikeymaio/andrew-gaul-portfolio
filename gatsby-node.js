const Promise = require('bluebird')
const path = require('path')

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /window/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {

    const pageTemplate = path.resolve('./src/templates/page-template.js')
    resolve(
      graphql(
        `
          {
            allContentfulPageTemplate {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const pages = result.data.allContentfulPageTemplate.edges
        pages.forEach((page, index) => {
          createPage({
            path: `/${page.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: page.node.slug
            },
          })
        })
      })
    )

    ////////////////////////////////////////////////////////////////////////

    const portfolioItem = path.resolve('./src/templates/portfolio-item.js')
    resolve(
      graphql(
        `
          {
            allContentfulPortfolioItem {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const items = result.data.allContentfulPortfolioItem.edges
        items.forEach((item, index) => {
          createPage({
            path: `/${item.node.slug}/`,
            component: portfolioItem,
            context: {
              slug: item.node.slug
            },
          })
        })
      })
    )
  })
}

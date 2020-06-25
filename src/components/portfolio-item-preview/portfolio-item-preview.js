import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './portfolio-item-preview.module.css'

export default ({ project }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={project.gallery[0].fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/${project.slug}`}>{project.title}</Link>
    </h3>
    <small>{`Released ${project.releaseDate} by ${project.productionCompany}`}</small>
    <div
      dangerouslySetInnerHTML={{
        __html: project.description.childMarkdownRemark.html,
      }}
    />
    {project.tags &&
      project.tags.map(tag => (
        <p className={styles.tag} key={tag}>
          {tag}
        </p>
      ))}
  </div>
)

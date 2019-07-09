import React from "react"
import { Link } from "react-router-dom"

const getPostDate = ( timestamp ) => {
  const date = new Date( timestamp )

  return date.toLocaleDateString()
}

const Timeline = ( { timeline } ) => (
  <section className="timeline">
    <ol className="timeline-posts">

      {
        timeline.posts.length > 0
          ? timeline.posts.map( post => (
            <li key={ post._id } className="timeline-post">
              <div className="_info">
                <Link
                  className="_user"
                  to={ `/${ post.user.username }` }
                >
                  { post.user.name }
                </Link>
                <Link
                  className="_username"
                  to={ `/${ post.user.username }` }
                >
                  @{ post.user.username }
                </Link>
                <p className="_date"> - { getPostDate( post.postDate ) }</p>
              </div>
              <div className="_text">
                { post.text }
              </div>
            </li>
          ) )
          : timeline.loading
            ? (
              <p>Loading...</p>
            ) : (
              <p>Is really silent in here! Please, say something.</p>
            )
      }

    </ol>
  </section>
)

export default Timeline

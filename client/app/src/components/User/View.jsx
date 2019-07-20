import React from "react"
import PropTypes from "prop-types"

import Timeline from "../Timeline"

const View = ( {
  user,
  profile,
  handleFollow,
} ) => {
  if ( profile.loading ) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    const joinDate = new Date( profile.content.user.joinDate )
    
    return (
      <div className="timeline-layout">
        <section className="user">
          <div className="_top">
            <div className="_info">
              <p className="_name">{ profile.content.user.name }</p>
              <p className="_username">@{ profile.content.user.username }</p>
            </div>
            <p className="_joint-date">Joined in { joinDate.toLocaleDateString() }</p>
          </div>

          <div className="_follows-count">
            <p className="_followers">
              <span>Followers </span>
              { profile.content.user.followers.length }
            </p>
            <p className="_following">
              <span>Following </span>
              { profile.content.user.following.length }
            </p>
          </div>

          {
            profile.content.user._id !== user.current._id
              ? (
                <div className="_follow">
                  <button 
                    className="default"
                    onClick={ handleFollow }
                  >
                    {
                      profile.content.user.followers.includes( user.current._id )
                        ? "Unfollow"
                        : "Follow"
                    }
                  </button>
                </div>
              ) : ""
          }

        </section>

        <Timeline 
          timeline={ {
            loading: profile.loading,
            posts: profile.content.posts,
          } }        
        />
      </div>
    )
  }
}

View.propTypes = {
  user: PropTypes.instanceOf( Object ).isRequired,
  profile: PropTypes.instanceOf( Object ).isRequired,
  handleFollow: PropTypes.func.isRequired,
}

export default View
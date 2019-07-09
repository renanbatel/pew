import React from "react"
import PropTypes from "prop-types"

import Timeline from "../Timeline"

const View = ( {
  text,
  timeline,
  handleChange,
  handleSubmit,
} ) => {
  return (
    <div className="timeline-layout">
      <section className="posting">
        <form onSubmit={ handleSubmit }>
          <div className="text-field">
            <textarea
              required
              name="text"
              id="text"
              rows="4"
              placeholder="What's on your mind?"
              value={ text }
              onChange={ handleChange }
            ></textarea>

            {/* <p className="field-error"></p> */}

          </div>
          <div className="_actions">
            <button className="default" type="submit">
              Post
            </button>
          </div>
        </form>
      </section>

      <Timeline timeline={ timeline } />

    </div>
  )
}

View.propTypes = {
  text: PropTypes.string.isRequired,
  timeline: PropTypes.instanceOf( Object ).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default View
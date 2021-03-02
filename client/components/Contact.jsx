import React from "react"
import { connect } from "react-redux"

function Contact() {
  return(
  <section className="hero is-fullheight">
    <div className="hero-body vertical-center">
      <div className="container has-text-centered">
        <div className="columns is-8 is-variable ">
          <div className="column is-two-thirds contact-center">
            <h1 className="title is-1">Contact Us</h1>
            <p className="is-size-4">If you'd like to give us feedback or lodge a complaint, please complete our contact form. We aim to respond to all queries within 5 working days.</p>
          </div>

          <div className="column is-one-third has-text-left">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input is-medium" type="text" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input is-medium" type="text" />
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea is-medium"></textarea>
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-link is-fullwidth has-text-weight-medium is-medium">Send Message</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default connect()(Contact)
import React, { useEffect } from "react"
import { HashRouter as Router, Route, Link } from "react-router-dom"
import { connect } from "react-redux"

import Login from "./Login"
import Register from "./Register"
import Nav from "./Nav"
import Landing from "./Landing"
import Home from "./Home"
import Listings from "./Listings"
import Profile from "./Profile"
import ListingForm from "./ListingForm"
import Listing from "./Listing"

import { checkAuth } from "../actions/auth"

function App({ auth, dispatch }) {
  useEffect(() => {
    const confirmSuccess = () => {}
    dispatch(checkAuth(confirmSuccess))
  }, [])

  return (
    <Router>
      <div className="container has-text-centered">
        <div className="hero is-small is-primary">
          <div className="hero-body has-text-centered">
            <Link to="/" className="">
              <h1 className="title is-1">Jack Of All Trades</h1>
            </Link>
            <Route path="/" component={Nav} />
          </div>
        </div>

        <div className="">
          {!auth.isAuthenticated 
          ? ( <>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            </>
          ) 
          : (
            <>
              <Route exact path="/" component={Home} />
              <Route path="/listings" component={Listings} />
              <Route path="/profile" component={Profile} />
              <Route path="/listingform" component={ListingForm} />
              <Route path="/listing" component={Listing} />
            </>
          )}
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  }
}

export default connect(mapStateToProps)(App)

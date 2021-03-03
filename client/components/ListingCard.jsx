import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"


function ListingCard(props) {
  const listing = props.listing
 
  return (
    <div className="card">
      <div className="card-content card-content-flex my-listings-margin">
        <div>
          <Link key={listing.id}
          to={`/listing/${listing.id}`}>
          <p className="capitalize"><strong>{listing.title}</strong></p>
          </ Link>
          <p>{listing.username}, {listing.location}</p>
          <p className="capitalize">Category: {listing.tag_name}</p>
        </div>
        <div>
          <p className="last-updated">Last updated: {moment(listing.time).format('LLL')}</p>
        </div>
      </div>
    </div>
  )
}


export default connect()(ListingCard)

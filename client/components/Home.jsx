import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import ListingCard from "./ListingCard"

function Home(props) {
  const listings = props.listings
  const [ourListings, setOurListings] = useState([])
  const [lookingListings, setLookingListings] = useState([])
  const [offeringListings, setOfferingListings] = useState([])

  const populateTypeListings = () => {
    setLookingListings(
      ourListings.filter((listing) => listing.type == "looking")
    )
    setOfferingListings(
      ourListings.filter((listing) => listing.type == "offer")
    )
  }

  useEffect(() => {
    if (listings) {
      populateOurListings()
    }
  }, [listings])

  const populateOurListings = () => {
    setOurListings(listings)
  }

  useEffect(() => {
    populateTypeListings()
  }, [ourListings])

  return (
    <>
      <div className="text-box">
        <Link to="/listingform" className="btn btn-blue btn-animate">
          Add a Listing
        </Link>
      </div>

      <div className="columns has-same-height home-panels home-margin">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <h3 className="is-4 has-text-centered home-font-size">I'm Looking For...</h3>

              <div className="content">
                <table className="see-more-margin">
                  <tbody>
                    <tr>
                      <th colSpan="1"></th>
                      <th colSpan="2"></th>
                    </tr>
                    <tr>
                      <td>
                        {lookingListings.slice(0, 3).map((listing) => {
                          return (
                            <ListingCard key={listing.id} listing={listing} />
                          )
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div className="buttons has-addons is-centered">
                <Link
                  to="/listings"
                  className="button is-primary"
                  onClick={() => localStorage.setItem("type", "looking")}
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card home-columns">
            <div className="card-content">
              <h3 className="is-4 has-text-centered home-font-size">I Can Offer...</h3>

              <div className="content">
                <table className="see-more-margin">
                  <tbody>
                    <tr>
                      <th colSpan="1"></th>
                      <th colSpan="2"></th>
                    </tr>
                    <tr>
                      <td>
                        {offeringListings.slice(0, 3).map((listing) => {
                          return (
                            <ListingCard key={listing.id} listing={listing} />
                          )
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div className="buttons has-addons is-centered">
                <Link
                  to="/listings"
                  className="button is-primary"
                  onClick={() => localStorage.setItem("type", "offer")}
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (globalState) => {
  return {
    listings: globalState.listings,
  }
}

export default connect(mapStateToProps)(Home)

{
  /* <div className="container">
      <div>
        <Link to="/listingform">
        <button >+ Add listing</button>
        </Link>
      </div>
      <div>
        <h1>I'm Looking For...</h1>
          {listings.map(listing => {
            if(listing.type == "looking"){
              return <ListingCard key={listing.id} listing={listing} />
            }
          })}
          <Link
          to="/listings"
          onClick={() => localStorage.setItem("type", "looking")}
          >
          See more...
        </Link>
      </div>
      <hr />
      <div>
        <h1>I Can Offer...</h1>
          {listings.map(listing => {
            if(listing.type == "offer"){
              return <ListingCard key={listing.id} listing={listing} />
            }
          })}
          <Link
          to="/listings"
          onClick={() => localStorage.setItem("type", "offer")}
          >
          See more...
        </Link>
      </div>
    </div> */
}

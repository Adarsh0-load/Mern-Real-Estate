import React, { useState, useEffect } from "react";
import { Hero } from "../Components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import axios from "axios";
import { Link } from "react-router-dom";

import Listings from "../Components/Listings";
const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState([]);
  const [rentalListing, setRentalListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getOfferListings = async () => {
      try {
        const res = await axios.get(`/api/listing/listings?offer=true&limit=4`);
        const data = res.data;
        setOfferListing(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getRentalListings = async () => {
      try {
        const res = await axios.get(`/api/listing/listings?type=rent&limit=4`);
        const data = res.data;
        setRentalListing(data);
      } catch (err) {}
    };
    const getSaleListings = async () => {
      try {
        const res = await axios.get(`/api/listing/listings?type=sale&limit=4`);
        const data = res.data;
        setSaleListing(data);
      } catch (err) {}
    };
    getOfferListings();
    getRentalListings();
    getSaleListings();
    setLoading(false)
  
  }, []);

  return (
    <>
      <Hero />
      {loading && <div className="text-6xl font-bold text-center text-gray-400 p-20">loading properties ....</div>}
      {!loading && (
        <>
          {offerListing && offerListing.length > 0 && (
            <div className="max-w-7xl m-auto ">
              <Swiper navigation>
                {offerListing.map((listing) => (
                  <SwiperSlide key={listing.imageUrls[0]}>
                    <Link to={`/SpecificListing/${listing._id}`}>
                      <div
                        className="h-[550px]"
                        style={{
                          background: `url(${listing.imageUrls[0]}) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {offerListing && (
            <Listings
              listings={offerListing}
              query="offer=true"
              type="Recent Offers"
              desc="Show More Offers"
            />
          )}

          {rentalListing && (
            <Listings
              listings={rentalListing}
              query="type=rent"
              type="Recent Places For Rent"
              desc="Show More Places For Rent"
            />
          )}

          {saleListing && (
            <Listings
              listings={saleListing}
              query="type=sale"
              type="Recent Places For Sale"
              desc="Show More Places For Sale"
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;

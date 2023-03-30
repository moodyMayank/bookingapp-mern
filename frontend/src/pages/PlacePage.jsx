import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      console.log(response.data);
      setPlace(response.data);
    });
  }, [id]);

  return (
    <>
      <div className="mt-2 max-w-6xl mx-auto">
        <div className="px-4 text-center md:text-left py-4">
          <h1 className="text-3xl">{place?.title}</h1>
        </div>
        <AddressLink>{place?.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 mb-4 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place?.description}
            </div>
            <b>Check-in: </b>
            {place?.checkIn}
            <br />
            <b>Check-out: </b>
            {place?.checkOut}
            <br />
            <b>Max number of guests: </b>
            {place?.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="border-t pt-2">
          <div className="">
            <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="mt-2 mb-4 text-sm text-gray-500 leading-6 text-justify">
            {place?.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;

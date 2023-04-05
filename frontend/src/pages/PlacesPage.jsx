import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mx-5">
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add New Places
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                className="flex gap-4 cursor-pointer bg-[#F6F1F1] p-4 rounded-2xl"
              >
                <div className="flex w-32 h-32">
                  {place.photos.length > 0 && (
                    <img
                      className="w-[100%] object-cover"
                      src={place.photos[0].photoUrl}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex-1 grow">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;

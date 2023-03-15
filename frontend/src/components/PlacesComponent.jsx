import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../utils/Perks";
import PhotosUploader from "../utils/PhotosUploader";

const PlacesComponent = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (headerText) => {
    return <h1 className="text-2xl font-bold mt-4">{headerText}</h1>;
  };
  const inputParagraph = (paragraphText) => {
    return <p className="text-gray-500 text-sm">{paragraphText}</p>;
  };

  const preInput = (header, paragraph) => {
    return (
      <>
        {inputHeader(header)}
        {inputParagraph(paragraph)}
      </>
    );
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div className="mx-10">
          <form onSubmit={handleFormSubmit}>
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              className="mb-2"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
              placeholder="title, for example : My Lovely Home"
            />
            {preInput("Address", "Address to this place")}
            <input
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              type="text"
              placeholder="address"
            />
            {preInput("Photos", "More the Photos, more will be the bookings")}
            <PhotosUploader />
            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "select all the perks of your place")}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2 gap-2 mb-5">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              "Check in & out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={setCheckIn}
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={setCheckOut}
                  placeholder="12"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={setMaxGuests}
                />
              </div>
            </div>
            <button className="primary my-4 text-center">SAVE</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesComponent;

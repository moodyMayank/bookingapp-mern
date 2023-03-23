import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotosUploader from "../utils/PhotosUploader";
import Perks from "../utils/Perks";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const [redirectToPlaces, setRedirectToPlaces] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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

  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      // new place
      await axios.post("/places", placeData);
    }

    setRedirectToPlaces(true);
  };

  if (redirectToPlaces) return <Navigate to={"/account/places"} />;

  return (
    <div className="mx-10">
      <AccountNav />
      <form onSubmit={savePlace}>
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
        <PhotosUploader
          addedPhotos={addedPhotos}
          onAddedPhotosChange={setAddedPhotos}
        />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4 text-center">SAVE</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;

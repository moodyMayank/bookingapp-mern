import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setshowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      console.log(response.data);
      setPlace(response.data);
    });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black">
        <div className="flex justify-evenly mt-2 px-4 py-2">
          <h1 className="text-white text-3xl">Photos of {place.title}</h1>
          <button
            onClick={() => setshowAllPhotos(false)}
            className="flex items-center bg-white text-black px-2 py-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
            Close photos
          </button>
        </div>
        <div className="flex flex-col justify-center items-center py-4 mt-1 mb-1 gap-2 bg-black">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => {
              return (
                <div className="h-[500px] w-[1000px]  ">
                  <img
                    className="h-[100%] w-[100%] object-cover"
                    src={"http://localhost:3000/uploads/" + photo}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 max-w-6xl mx-auto">
        <div className="px-4 text-center md:text-left py-4">
          <h1 className="text-3xl">{place?.title}</h1>
          <a
            className="underline block my-2 font-semibold max-w-md"
            target="_blank"
            href={"https://maps.google.com/?q=" + place?.address}
          >
            {place?.address}
          </a>
        </div>
        <div className="relative cursor-pointer">
          <div className="flex h-[40vh] md:h-[65vh] rounded-2xl gap-1 md:gap-2 overflow-hidden">
            <div className="md:flex-[70%] overflow-hidden">
              {place?.photos.length > 0 && (
                <img
                  onClick={() => setshowAllPhotos(true)}
                  className="aspect-square object-cover w-[100%]"
                  src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                  alt="Image here"
                />
              )}
            </div>
            <div className="md:flex-[30%] flex flex-col gap-y-2">
              <div className="hidden md:inline h-[50%] w-[100%]  overflow-hidden">
                {place?.photos.length > 0 && (
                  <img
                    onClick={() => setshowAllPhotos(true)}
                    className="aspect-square object-cover w-[100%]"
                    src={"http://localhost:3000/uploads/" + place.photos?.[1]}
                    alt="Image here"
                  />
                )}
              </div>
              <div className="hidden md:inline h-[50%] w-[100%] overflow-hidden">
                {place?.photos.length > 0 && (
                  <img
                    onClick={() => setshowAllPhotos(true)}
                    className="aspect-square object-cover w-[100%]"
                    src={"http://localhost:3000/uploads/" + place.photos?.[2]}
                    alt="Image here"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setshowAllPhotos(true)}
            className="absolute flex bottom-2 right-2 py-2 px-4 rounded-2xl gap-1 bg-white border border-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            Show more Photos
          </button>
        </div>
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

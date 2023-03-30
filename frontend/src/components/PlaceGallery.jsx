import { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setshowAllPhotos] = useState(false);

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
    </>
  );
};

export default PlaceGallery;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="mt-2 bg-gray-100 -mx-6 px-5 md:px-2 py-4">
        <div className="px-4 text-center md:text-left">
          <h1 className="text-3xl">{place?.title}</h1>
          <a
            className="underline  block my-2 font-semibold"
            target="_blank"
            href={"https://maps.google.com/?q=" + place?.address}
          >
            {place?.address}
          </a>
        </div>
        <div className="flex mt-5 m h-[40vh] md:h-[65vh] gap-1 md:gap-2 p-2 md:p-5 overflow-hidden">
          <div className="md:flex-[70%] rounded-lg md:rounded-r-none md:rounded-l-lg overflow-hidden">
            {place?.photos.length > 0 && (
              <img
                className="aspect-square object-cover w-[100%]"
                src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                alt="Image here"
              />
            )}
          </div>
          <div className="md:flex-[30%] flex flex-col gap-y-2">
            <div className="hidden md:inline h-[50%] w-[100%] rounded-tr-lg overflow-hidden">
              {place?.photos.length > 0 && (
                <img
                  className="aspect-square object-cover w-[100%]"
                  src={"http://localhost:3000/uploads/" + place.photos?.[2]}
                  alt="Image here"
                />
              )}
            </div>
            <div className="hidden md:inline h-[50%] w-[100%] rounded-br-lg overflow-hidden">
              {place?.photos.length > 0 && (
                <img
                  className="aspect-square object-cover w-[100%]"
                  src={"http://localhost:3000/uploads/" + place.photos?.[1]}
                  alt="Image here"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl">
        <div className="">
          
        </div>
        <div className="">
          
        </div>
        <div className="">
          
        </div>
      </div> */}
    </>
  );
};

export default PlacePage;

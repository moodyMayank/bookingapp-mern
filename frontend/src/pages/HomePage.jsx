import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  const { user } = useContext(UserContext);
  return (
    <div className="mt-4 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="rounded-2xl mb-2">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover"
                    src={"http://localhost:3000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default HomePage;

import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const BookingWidget = ({ place }) => {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
  }, [user]);

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <div className="text-2xl text-center">
          Price: ₹{place?.price}/ per night
        </div>
        <div className="mt-2 border border-black rounded-2xl">
          <div className="flex">
            <div className="py-3 px-4">
              <label> Check in :</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setcheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label> Check out :</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label> Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Your Mobile Number:</label>
              <input
                type="number"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="mt-4 primary">
          Book the Place
          {numberOfNights && (
            <span className="ml-2 font-bold text-black">
              ₹{numberOfNights * place.price}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;

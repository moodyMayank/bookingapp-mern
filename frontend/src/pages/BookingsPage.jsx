import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../utils/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="flex flex-col gap-2">
        {bookings?.length > 0 &&
          bookings.map((booking) => {
            return (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-4 rounded-md shadow-xl border border-slate-900"
                key={booking._id}
              >
                <div className="w-[200px] p-2">
                  <PlaceImg place={booking.place} className={"rounded-xl "} />
                </div>
                <div className="py-3 grow pr-3">
                  <h2 className="text-xl font-semibold">
                    {booking.place.title}
                  </h2>
                  <div className="flex gap-1 border-t border-black mt-2 py-1"></div>
                  <div className="text-lg">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-2 text-gray-500"
                    />
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                      <span className="text-lg">
                        Total Price: ₹{booking.place.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BookingsPage;

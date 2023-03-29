import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if(foundBooking)
      });
    }
  }, []);
  return <div>Single Booking page</div>;
};

export default BookingPage;

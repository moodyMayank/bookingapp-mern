const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) return "";
  if (!className) className += "object-cover w-[100%]";
  return (
    <div>
      {place.photos.length > 0 && (
        <img
          className={className}
          src={"http://localhost:3000/uploads/" + place.photos[index]}
          alt=""
        />
      )}
    </div>
  );
};

export default PlaceImg;

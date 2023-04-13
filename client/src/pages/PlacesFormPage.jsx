import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../../PhotosUploader";
import AccountNav from "./AccountNav";

export default function PlacesFormPage() {
  const { id } = useParams();
  let titleStyle = "text-2xl mt-4";
  let subStyle = "text-gray-500 text-sm";
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  // const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(10);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      //id exist therefore update
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      //add new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className={titleStyle}>Title</h2>
        <p className={subStyle}>Title to your place</p>
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <h2 className={titleStyle}>Address</h2>
        <p className={subStyle}>Address to your place</p>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        <h2 className={titleStyle}>Photos</h2>
        <p className={subStyle}>more = better</p>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className={titleStyle}>Description</h2>
        <p className={subStyle}>description of place</p>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {/* perks */}
        {/* <h2 className={titleStyle}>Perks</h2>
            <p className={subStyle}>select all your perks</p>
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div> */}

        <h2 className={titleStyle}>Extra info</h2>
        <p className={subStyle}>other stuff others should know</p>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        <h2 className={titleStyle}>Check in and out times</h2>
        <p className={subStyle}>timings</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
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
            <h3 className="mt-2 -mb-1">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}

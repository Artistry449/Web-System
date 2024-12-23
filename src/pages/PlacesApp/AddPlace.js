import { useContext, useState } from "react";
import "./style.css";
import LoggedInUserContext from "../../Context/LoggedInUser";
import { useNavigate } from "react-router-dom";

export default function AddPlace() {
  const [placeTitle, setPlaceTitle] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeHayg, setPlaceHayg] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");

  const { loggedInUser } = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  const saveToStorage = async () => {
    if (
      placeTitle &&
      placeDescription &&
      placeHayg &&
      placeLocation &&
      placeUrl &&
      loggedInUser
    ) {
      const newPlace = {
        userId: loggedInUser._id,
        title: placeTitle,
        description: placeDescription,
        hayg: placeHayg,
        location: placeLocation,
        imgURL: placeUrl,
      };

      const res = await fetch(`http://localhost:80/api/places`, {
        method: "POST",
        body: JSON.stringify(newPlace),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedRes = await res.json();
      console.log(parsedRes);
      navigate(-1);

      // if (res.status === "success") {
      //   alert("Шинэ газар амжилттай нэмэгдлээ!");
      // } else {
      //   alert("Шинэ газар нэмэхэд алдаа гарлаа. Та дахин оролдоно уу");
      // }
      // navigate(-1);
      // const previousPlaces = localStorage.getItem("places");

      // let parsedPreviousPlaces = [];
      // if (previousPlaces) {
      //   try {
      //     parsedPreviousPlaces = JSON.parse(previousPlaces);
      //   } catch (e) {
      //     console.error("Localstorage error:", e);
      //   }
      // }

      // if (!Array.isArray(parsedPreviousPlaces)) {
      //   parsedPreviousPlaces = [];
      // }

      // parsedPreviousPlaces.push(newPlace);

      // localStorage.setItem("places", JSON.stringify(parsedPreviousPlaces));

      // const res = await
    } else {
      alert("Та талбаруудыг бөглөнө үү");
    }

    setPlaceTitle("");
    setPlaceDescription("");
    setPlaceHayg("");
    setPlaceLocation("");
    setPlaceUrl("");
  };

  return (
    <div className="addNewPlace">
      <h2>Шинэ газар нэмэх</h2>
      <div>
        <input
          placeholder="Газрын нэр"
          value={placeTitle}
          onChange={(e) => setPlaceTitle(e.target.value)}
        />
        <input
          placeholder="Газрын тайлбар"
          value={placeDescription}
          onChange={(e) => setPlaceDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          value={placeHayg}
          placeholder="Газрын хаяг"
          onChange={(e) => setPlaceHayg(e.target.value)}
        />
        <input
          value={placeLocation}
          placeholder="Газрын байршил"
          onChange={(e) => setPlaceLocation(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Зураг"
          value={placeUrl}
          onChange={(e) => setPlaceUrl(e.target.value)}
        />
        <button onClick={saveToStorage}>Нэмэх</button>
      </div>
    </div>
  );
}

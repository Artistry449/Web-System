import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";

export default function EditPlace() {
  const { pid } = useParams();
  const [placeTitle, setPlaceTitle] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeHayg, setPlaceHayg] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");
  const { loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const places = localStorage.getItem("places");
    if (places) {
      const parsedPlaces = JSON.parse(places);
      const placeToEdit = parsedPlaces.find((place) => place.id === pid);

      if (placeToEdit) {
        setPlaceTitle(placeToEdit.title);
        setPlaceDescription(placeToEdit.description);
        setPlaceHayg(placeToEdit.hayg);
        setPlaceLocation(placeToEdit.location);
        setPlaceUrl(placeToEdit.url);
      }
    }
  }, [pid]);

  const saveChanges = () => {
    const places = localStorage.getItem("places");
    if (places && loggedInUser) {
      const parsedPlaces = JSON.parse(places);

      const updatedPlaces = parsedPlaces.map((place) =>
        place.id === pid
          ? {
              ...place,
              title: placeTitle,
              description: placeDescription,
              hayg: placeHayg,
              location: placeLocation,
              url: placeUrl,
            }
          : place
      );

      localStorage.setItem("places", JSON.stringify(updatedPlaces));
      navigate(-1);
    } else {
      alert("Өөрчлөлтийг хадгалахад алдаа гарлаа");
    }
  };

  return (
    <div className="editPlace">
      <h2>Газар засах</h2>
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
        <button onClick={saveChanges} className="editBtnSave">
          Хадгалах
        </button>
      </div>
    </div>
  );
}

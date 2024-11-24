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

  const getPlaceById = async () => {
    const res = await fetch(`http://localhost:80/api/places/${pid}`);

    const parsedRes = await res.json();

    console.log(":::", parsedRes);
    if (parsedRes.status === "success") {
      setPlaceTitle(parsedRes.places.title);
      setPlaceDescription(parsedRes.places.description);
      setPlaceHayg(parsedRes.places.hayg);
      setPlaceLocation(parsedRes.places.location);
      setPlaceUrl(parsedRes.places.imgURL);
    } else {
      alert(
        "Газрын мэдээллийг засах явцыг эхлүүлэхэд алдаа гарлаа! Та дахин оролдоно уу"
      );
    }
  };

  useEffect(() => {
    // const places = localStorage.getItem("places");
    // if (places) {
    //   const parsedPlaces = JSON.parse(places);
    //   const placeToEdit = parsedPlaces.find((place) => place.id === pid);
    //   if (placeToEdit) {
    //     setPlaceTitle(placeToEdit.title);
    //     setPlaceDescription(placeToEdit.description);
    //     setPlaceHayg(placeToEdit.hayg);
    //     setPlaceLocation(placeToEdit.location);
    //     setPlaceUrl(placeToEdit.url);
    //   }
    // }

    getPlaceById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);

  const saveChanges = async () => {
    // const places = localStorage.getItem("places");
    if (loggedInUser) {
      // const parsedPlaces = JSON.parse(places);

      // const updatedPlaces = parsedPlaces.map((place) =>
      //   place.id === pid
      //     ? {
      //         ...place,
      //         title: placeTitle,
      //         description: placeDescription,
      //         hayg: placeHayg,
      //         location: placeLocation,
      //         url: placeUrl,
      //       }
      //     : place
      // );

      // localStorage.setItem("places", JSON.stringify(updatedPlaces));

      const res = await fetch(`http://localhost:80/api/places/${pid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId: pid,
          userId: loggedInUser._id,
          title: placeTitle,
          description: placeDescription,
          hayg: placeHayg,
          location: placeLocation,
          imgURL: placeUrl,
        }),
      });

      const parsedRes = await res.json();
      console.log(parsedRes);
      if (parsedRes.status === "success") {
        alert("Газар амжилттай шинэчлэгдлээ");
      } else {
        alert("Газар шинэчлэхэд алдаа гарлаа");
      }

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

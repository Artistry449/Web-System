import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";

export default function User() {
  const { uid } = useParams();
  const [userPlaces, setUserPlaces] = useState([]);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserPlace = async () => {
      const places = await fetch("http://localhost:80/api/places/user/" + uid);
      const parsedPlaces = await places.json();
      // if (parsedPlaces && parsedPlaces.length > 0) {
      //   const foundUserPlaces = parsedPlaces.userPlaces.filter(
      //     (place) => place.userId === uid
      //   );
      // } else {
      //   setUserPlaces([]);
      // }
      setUserPlaces(parsedPlaces.userPlaces);
    };

    getUserPlace();
  }, [uid]);

  const deletePlace = async (placeIndex) => {
    // const places = localStorage.getItem("places");
    // const parsedPlaces = JSON.parse(places);

    // const updatedPlaces = parsedPlaces.filter(
    //   (_, index) => index !== placeIndex
    // );

    // localStorage.setItem("places", JSON.stringify(updatedPlaces));
    // setUserPlaces(updatedPlaces.filter((place) => place.userId === uid));
    console.log(placeIndex);
    const res = await fetch(`http://localhost:80/api/places/${placeIndex}`, {
      method: "DELETE",
    });
    console.log(res);

    if (res.status === 204) {
      alert("Газрыг амжилттай устгалаа");
      setUserPlaces((prev) => prev.filter((place) => place._id !== placeIndex));
    } else {
      alert("Газрыг устгахад алдаа гарлаа");
    }
  };

  const editPlace = (index) => {
    navigate(`/placesapp/places/${index}`);
  };

  useEffect(() => console.log(userPlaces), [userPlaces]);

  return (
    <div className="userProfile">
      <div className="userPlaces">
        {loggedInUser && loggedInUser._id === uid && (
          <Link to="/placesapp/places/new" className="addPlaceButton">
            + Газар нэмэх
          </Link>
        )}

        {userPlaces && userPlaces.length > 0 ? (
          userPlaces.map((place, index) => (
            <div key={index} className="placeCard">
              {place.imgURL && (
                <img
                  src={place.imgURL}
                  alt={place.title}
                  className="placeImage"
                />
              )}
              <div>
                <h3 className="placeTitle">{place.title}</h3>
                <p className="placeDescription">{place.description}</p>
                <p className="placeHayg">
                  <strong>Хаяг:</strong> {place.hayg}
                </p>
                <p className="placeLocation">
                  <strong>Байршил:</strong> {place.location}
                </p>
              </div>
              {loggedInUser && (
                <div className="placeActions">
                  <button
                    className="editButton"
                    onClick={() => editPlace(place._id)}
                  >
                    Засах
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => deletePlace(place._id)}
                  >
                    Устгах
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="noPlacesMessage">
            Уг хэрэглэгч одоогоор ямар ч газар хуваалцаагүй байна
          </div>
        )}
      </div>
    </div>
  );
}

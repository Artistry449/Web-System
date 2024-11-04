import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";

export default function User() {
  const { uid } = useParams();
  const [userPlaces, setUserPlaces] = useState([]);
  const { loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const places = localStorage.getItem("places");

    if (places) {
      const parsedPlaces = JSON.parse(places);

      if (Array.isArray(parsedPlaces)) {
        const foundUserPlaces = parsedPlaces.filter(
          (place) => place.userId === uid
        );
        setUserPlaces(foundUserPlaces);
      } else {
        console.error("Parsed places is not an array:", parsedPlaces);
        setUserPlaces([]);
      }
    } else {
      setUserPlaces([]);
    }
  }, [uid]);

  const deletePlace = (placeIndex) => {
    const places = localStorage.getItem("places");
    const parsedPlaces = JSON.parse(places);

    const updatedPlaces = parsedPlaces.filter(
      (_, index) => index !== placeIndex
    );

    localStorage.setItem("places", JSON.stringify(updatedPlaces));
    setUserPlaces(updatedPlaces.filter((place) => place.userId === uid));
  };

  const editPlace = (index) => {
    navigate(`/placesapp/places/${index}`);
  };

  return (
    <div className="userProfile">
      <div className="userPlaces">
        {loggedInUser && loggedInUser.id === uid && (
          <Link to="/placesapp/places/new" className="addPlaceButton">
            + Газар нэмэх
          </Link>
        )}

        {userPlaces && userPlaces.length > 0 ? (
          userPlaces.map((place, index) => (
            <div key={index} className="placeCard">
              {place.url && (
                <img src={place.url} alt={place.title} className="placeImage" />
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
                    onClick={() => editPlace(place.id)}
                  >
                    Засах
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => deletePlace(index)}
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

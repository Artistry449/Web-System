import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";
import UserList from "./UserList";

export default function PlacesApp() {
  const [users, setUsers] = useState([]);
  const { loggedInUser, logoutUser } = useContext(LoggedInUserContext);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchedUsers = localStorage.getItem("users");
    const parsedFetchedUsers = JSON.parse(fetchedUsers);
    console.log(fetchedUsers);
    console.log(parsedFetchedUsers);
    if (parsedFetchedUsers && parsedFetchedUsers.length > 0) {
      setUsers(parsedFetchedUsers);
    }
  }, []);

  return (
    <div className="index">
      {loggedInUser && (
        <div style={{ marginLeft: "95%" }} onClick={logoutUser}>
          Гарах
        </div>
      )}

      <div className="indexTitles">
        <h2>Системийн хэрэглэгчид</h2>

        {loggedInUser ? (
          <h4>
            Сайн байна уу 👋 {loggedInUser.firstName} {loggedInUser.lastName}
          </h4>
        ) : (
          <Link to="/placesapp/authenticate" className="btnLoginSignup">
            Нэвтрэх/Бүртгүүлэх
          </Link>
        )}
      </div>
      {users && users.length > 0 ? (
        <div className="usersContainer">
          <UserList users={users} navigator={navigator} />
        </div>
      ) : (
        <div>Одоогоор системд бүртгэлтэй ямар ч хэрэглэгч байхгүй байна</div>
      )}
    </div>
  );
}

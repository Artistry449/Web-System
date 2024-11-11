import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";
import UserList from "./UserList";

export default function PlacesApp() {
  const [users, setUsers] = useState([]);
  const { loggedInUser, logoutUser } = useContext(LoggedInUserContext);

  const navigator = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetch("http://localhost:80/api/users", {
        method: "GET",
      });
      const parsedFetchedUsers = await fetchedUsers.json();
      console.log(parsedFetchedUsers);
      if (parsedFetchedUsers && parsedFetchedUsers.status === "success") {
        setUsers(parsedFetchedUsers.users);
      }
    };

    getUsers();
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

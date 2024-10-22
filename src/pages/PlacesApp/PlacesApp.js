import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PlacesApp() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedUsers = localStorage.getItem("users");
    const parsedFetchedUsers = JSON.parse(fetchedUsers);
    console.log(fetchedUsers);
    console.log(parsedFetchedUsers);
    if (parsedFetchedUsers && parsedFetchedUsers.length > 0) {
      console.log("AAAA");
      setUsers(fetchedUsers);
    }
  }, []);

  return (
    <div className="index">
      <Link to={"/placesapp/authenticate"}>Нэвтрэх/Бүртгүүлэх</Link>
      {users && users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.email}>{user.firstName}</div>
          ))}
        </div>
      ) : (
        <div>Одоогоор системд бүртгэлтэй ямар ч хэрэглэгч байхгүй байна</div>
      )}
    </div>
  );
}

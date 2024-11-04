import "./style.css";

export default function UserList({ users, navigator }) {
  return (
    <>
      {users.map((user) => (
        <div
          key={user.email}
          className="user"
          onClick={() => navigator(`/placesapp/${user.id}/places`)}
        >
          <img src={user.img} width={50} height={50} alt="user-profile-img" />
          <div className="userAttributesContainer">
            <div className="userAttributes">
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
            <h4 className="userEmail">{user.email}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

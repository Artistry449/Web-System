import { useEffect, useState } from "react";
import "./style.css";

export default function Authenticate() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [isSuccessfullySignedupAlertOpen, setIsSuccessfullySignedupAlertOpen] =
    useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchedUsers = localStorage.getItem("users");
    const parsedFetchedUsers = JSON.parse(fetchedUsers);

    if (parsedFetchedUsers && parsedFetchedUsers.length > 0) {
      setUsers(parsedFetchedUsers);
    }
  }, []);

  const handleSignupUser = () => {
    if (signupFirstName && signupLastName && signupEmail && signupPassword) {
      const isUserAlreadySignedIn = users.find(
        (user) => user.email === signupEmail
      );
      console.log(isUserAlreadySignedIn);
      if (isUserAlreadySignedIn) {
        alert("Уг и-мэйл аль хэдийн бүртгэлтэй байна");
      } else {
        const newUser = {
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          signupPassword: signupPassword,
        };
        console.log(newUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }

      setSignupFirstName("");
      setSignupLastName("");
      setSignupEmail("");
      setSignupPassword("");
    } else {
      alert("Та талбаруудыг бөглөнө үү");
    }
  };

  useEffect(() => {
    console.log(users);
    const stringifiedNewUserData = JSON.stringify(users);
    console.log(stringifiedNewUserData);
    localStorage.setItem("users", stringifiedNewUserData);
    setIsSuccessfullySignedupAlertOpen(true);
  }, [users]);

  return (
    <>
      {isSuccessfullySignedupAlertOpen && (
        <center style={{ height: "0rem", marginTop: "5px" }}>
          Таны бүртгэл амжилттай үүсгэгдлээ. Та нэвтэрч орно уу
        </center>
      )}
      <div className="authenticate">
        <div className="signup authenticationBox">
          <div className="authForm">
            <center>Бүртгүүлэх</center>

            <div>
              <input
                type="text"
                placeholder="Овог"
                value={signupLastName}
                onChange={(e) => setSignupLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Нэр"
                value={signupFirstName}
                onChange={(e) => setSignupFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="И-мэйл"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Нууц үг"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" onClick={handleSignupUser}>
              Бүртгүүлэх
            </button>
          </div>
        </div>
        <div className="login authenticationBox">
          <div className="authForm">
            <center>Нэвтрэх</center>
            <div className="authFormAttributes">
              <input type="email" placeholder="И-мэйл" required />
              <input type="password" placeholder="Нууц үг" required />
            </div>
            <button>Нэвтрэх</button>
          </div>
        </div>
      </div>
    </>
  );
}

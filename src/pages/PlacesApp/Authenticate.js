import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";
import { v4 as uuidv4 } from "uuid";

export default function Authenticate() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUrl, setSignupUrl] = useState("");

  const [isSuccessfullySignedupAlertOpen, setIsSuccessfullySignedupAlertOpen] =
    useState(false);
  const [isSuccessfullyLoggedInAlertOpen, setIsSuccessfullyLoggedInAlertOpen] =
    useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { updateLoggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    const fetchedUsers = localStorage.getItem("users");
    const parsedFetchedUsers = JSON.parse(fetchedUsers);

    if (parsedFetchedUsers && parsedFetchedUsers.length > 0) {
      setUsers(parsedFetchedUsers);
    }
  }, []);

  const clearFields = () => {
    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupUrl("");

    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSignupUser = () => {
    if (signupFirstName && signupLastName && signupEmail && signupPassword) {
      if (signupEmail.split("@").pop() !== "gmail.com") {
        alert("Та зөв и-мэйл оруулна уу");
      } else {
        const isUserAlreadySignedIn = users.find(
          (user) => user.email === signupEmail
        );

        if (isUserAlreadySignedIn) {
          alert("Уг и-мэйл аль хэдийн бүртгэлтэй байна");
        } else {
          const newUser = {
            id: uuidv4(),
            firstName: signupFirstName,
            lastName: signupLastName,
            email: signupEmail,
            password: signupPassword,
            img: signupUrl,
          };
          const updatedUser = [...users, newUser];

          console.log(newUser);
          setUsers(updatedUser);

          saveToStorage(updatedUser);
        }
      }
    } else {
      alert("Та талбаруудыг бөглөнө үү");
    }
    clearFields();
  };

  const saveToStorage = (users) => {
    const stringifiedNewUserData = JSON.stringify(users);
    console.log(stringifiedNewUserData);
    localStorage.setItem("users", stringifiedNewUserData);
    setIsSuccessfullySignedupAlertOpen(true);
  };

  const handleLoginUser = () => {
    if (loginEmail.length > 0 && loginPassword.length > 0) {
      if (loginEmail.split("@").pop() !== "gmail.com") {
        alert("Та зөв и-мэйл оруулна уу");
        clearFields();
      } else {
        const loginTriedUser = users.find((user) => {
          console.log(user);
          if (user.email === loginEmail) return user;
          return false;
        });
        console.log(loginTriedUser);
        if (!loginTriedUser) {
          alert("И-мэйл хаяг эсвэл нууц үг буруу байна");
          clearFields();
        } else {
          if (loginTriedUser.password === loginPassword) {
            updateLoggedInUser(loginTriedUser);
            setIsSuccessfullySignedupAlertOpen(false);
            setIsSuccessfullyLoggedInAlertOpen(true);

            navigate("/placesapp");
          } else {
            alert("И-мэйл хаяг эсвэл нууц үг буруу байна");
            clearFields();
          }
        }
      }
    }
  };

  return (
    <>
      {isSuccessfullySignedupAlertOpen && (
        <center style={{ height: "0rem", marginTop: "5px" }}>
          Таны бүртгэл амжилттай үүсгэгдлээ. Та нэвтэрч орно уу
        </center>
      )}
      {isSuccessfullyLoggedInAlertOpen && (
        <center style={{ height: "0rem", marginTop: "5px" }}>
          Та амжилттай нэвтэрлээ
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

            <div>
              <input
                type="text"
                required
                value={signupUrl}
                placeholder="Зургийн URL"
                onChange={(e) => setSignupUrl(e.target.value)}
              />
              <button
                className="btnSignup"
                type="submit"
                onClick={handleSignupUser}
              >
                Бүртгүүлэх
              </button>
            </div>
          </div>
        </div>
        <div className="login authenticationBox">
          <div className="authForm">
            <center>Нэвтрэх</center>
            <div className="authFormAttributes">
              <input
                type="email"
                placeholder="И-мэйл"
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Нууц үг"
                required
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </div>
            <button onClick={handleLoginUser}>Нэвтрэх</button>
          </div>
        </div>
      </div>
    </>
  );
}

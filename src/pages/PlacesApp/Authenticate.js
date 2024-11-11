import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import LoggedInUserContext from "../../Context/LoggedInUser";

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
    const getUsers = async () => {
      const fetchedUsers = await fetch(`http://localhost:80/api/users`);
      const parsedFetchedUsers = await fetchedUsers.json();
      console.log(parsedFetchedUsers);
      if (parsedFetchedUsers && parsedFetchedUsers.length > 0) {
        setUsers(parsedFetchedUsers);
      }
    };
    getUsers();
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

  const handleSignupUser = async () => {
    if (
      signupFirstName &&
      signupLastName &&
      signupEmail &&
      signupPassword &&
      signupUrl
    ) {
      if (signupEmail.split("@").pop() !== "gmail.com") {
        alert("Та зөв и-мэйл оруулна уу");
      } else {
        const newUserData = {
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
          imgUrl: signupUrl,
        };

        const res = await fetch(`http://localhost:80/api/users/signup`, {
          method: "POST",
          body: JSON.stringify(newUserData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsedResponse = await res.json();
        console.log(newUserData);
        console.log(parsedResponse);
        if (parsedResponse.status === "success") {
          saveToStorage(newUserData);
        } else {
          alert(parsedResponse.message);
        }
      }
    } else {
      alert("Та талбаруудыг бөглөнө үү");
    }
    clearFields();
  };

  const saveToStorage = (loggedInUser) => {
    const stringifiedNewUserData = JSON.stringify(loggedInUser);
    console.log(stringifiedNewUserData);
    localStorage.setItem("loggedInUser", stringifiedNewUserData);
    setIsSuccessfullySignedupAlertOpen(true);
  };

  const handleLoginUser = async () => {
    if (loginEmail.length > 0 && loginPassword.length > 0) {
      if (loginEmail.split("@").pop() !== "gmail.com") {
        alert("Та зөв и-мэйл оруулна уу");
        clearFields();
      } else {
        const loginData = {
          email: loginEmail,
          password: loginPassword,
        };

        const loginTriedUser = await fetch(
          `http://localhost:80/api/users/login`,
          {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const parsedLoginTriedUser = await loginTriedUser.json();

        console.log(parsedLoginTriedUser);

        if (parsedLoginTriedUser.status === "success") {
          // updateLoggedInUser(parsedLoginTriedUser.user);
          // localStorage.setItem(
          //   "loggedInUser",
          //   JSON.stringify(parsedLoginTriedUser.user)
          // );
          setIsSuccessfullySignedupAlertOpen(false);
          setIsSuccessfullyLoggedInAlertOpen(true);

          navigate("/placesapp");
        } else {
          alert(parsedLoginTriedUser.message);
          clearFields();
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

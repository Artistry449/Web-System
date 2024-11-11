import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FruitShop from "./pages/FruitApp/FruitShop";
import "./style/App.css";
import Countries from "./pages/CountriesApp/Countries";
import SelectedCountry from "./pages/CountriesApp/SelectedCountry";
import PlacesApp from "./pages/PlacesApp/PlacesApp";
import Authenticate from "./pages/PlacesApp/Authenticate";
import LoggedInUserContext from "./Context/LoggedInUser";
import User from "./pages/PlacesApp/User";
import AddPlace from "./pages/PlacesApp/AddPlace";
import EditPlace from "./pages/PlacesApp/EditPlace";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const updateLoggedInUser = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  /***
   * 
   *       <ul>
            <li>
              <Link to="/">Үндсэн</Link>
            </li>
            <li>
              <Link to="/fruitshop">FruitShop</Link>
            </li>
            <li>
              <Link to="/countries">Countries</Link>
            </li>
            <li>
              <Link to="/placesapp">PlacesApp</Link>
            </li>
          </ul>
   */
  return (
    <LoggedInUserContext.Provider
      value={{ loggedInUser, updateLoggedInUser, logoutUser }}
    >
      <BrowserRouter>
        <nav className="navbar">{/* <h1>ITM301 Лабораторын ажлууд</h1> */}</nav>
        <Routes>
          {/* <Route path="/" element={<div>Үндсэн дэлгэц</div>} /> */}
          {/* <Route path="/fruitshop" element={<FruitShop />} /> */}

          {/* <Route path="/countries" element={<Countries />} /> */}
          {/* <Route path="/countries/detail/:cca2" element={<SelectedCountry />} /> */}

          <Route path="/placesapp" element={<PlacesApp />} />
          <Route path="/placesapp/authenticate" element={<Authenticate />} />
          <Route path="/placesapp/:uid/places" element={<User />} />
          <Route path="/placesapp/places/new" element={<AddPlace />} />
          <Route path="/placesapp/places/:pid" element={<EditPlace />} />
        </Routes>
      </BrowserRouter>
    </LoggedInUserContext.Provider>
  );
}

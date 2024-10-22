// import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FruitShop from "./pages/FruitApp/FruitShop";
import "./style/App.css";
import Countries from "./pages/CountriesApp/Countries";
import SelectedCountry from "./pages/CountriesApp/SelectedCountry";
import PlacesApp from "./pages/PlacesApp/PlacesApp";
import Authenticate from "./pages/PlacesApp/Authenticate";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        {/* <h1>ITM301 Лабораторын ажлууд</h1> */}
        <ul>
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
      </nav>
      <Routes>
        <Route path="/" element={<div>Үндсэн дэлгэц</div>} />
        <Route path="/fruitshop" element={<FruitShop />} />

        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/detail/:cca2" element={<SelectedCountry />} />

        <Route path="/placesapp" element={<PlacesApp />} />
        <Route path="/placesapp/authenticate" element={<Authenticate />} />
      </Routes>
    </BrowserRouter>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SelectedCountry() {
  const [selectedCountryValue, setSelectedCountryValue] = useState(null);
  console.log(`selectedCountryValue:`);

  const { cca2 } = useParams();

  console.log(cca2);

  /**
   * 
   * fetch(`https://restcountries.com/v3.1/alpha/${cca2}`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log("BBBB");
          console.log(res);
          setSelectedCountryValue(res);
        })
        .catch((res) =>
          console.log(
            `[Countries] Улсын мэдээллийг татахад алдаа гарлаа: ${res}`
          )
        );
   */

  useEffect(() => {
    const getSelectedCountry = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`);
      const countryVal = await res.json();

      setSelectedCountryValue(countryVal[0]);
    };
    console.log("AAAA");

    if (cca2) getSelectedCountry();
  }, [cca2]);

  if (!selectedCountryValue) {
    return <h4>Уншиж байна...</h4>;
  }

  const currencies = selectedCountryValue.currencies;

  return (
    <div className="selected_country" key={selectedCountryValue.name}>
      <div className="selected_country_navbar container_navbar content_attributes">
        <Link to={"/countries"}>
          <img className="arrow" src="/arrow_left.png" alt="arrow_left" />
        </Link>
        <h4>{selectedCountryValue.name.official}</h4>
      </div>

      <div className="selected_country_content ">
        <div className="selected_country_information_container">
          <img
            className="country_img"
            src={selectedCountryValue.flags.svg}
            alt="country flag"
          />
          <div className="selected_country_information_left">
            <div className="selected_country_information">
              <img
                className="icon_img"
                src="/population.png"
                alt="population icon"
              />
              {selectedCountryValue.population} хүн амтай
            </div>

            <div className="selected_country_information">
              <Link to={selectedCountryValue.maps.googleMaps}>
                <div className="Btn_selected_country_location">
                  <img
                    className="icon_img"
                    src="/location.png"
                    alt="location icon"
                  />
                  &nbsp;
                  <p>
                    {selectedCountryValue.latlng[0]}{" "}
                    {selectedCountryValue.latlng[1]}
                  </p>
                </div>
              </Link>
            </div>

            <div className="selected_country_information">
              <img className="icon_img" src="/coin.png" alt="coin icon" />
              <p>
                {Object.entries(currencies).map(([key, value]) => (
                  <div key={key} className="currency-item">
                    <span>{value.name}</span> ({value.symbol})
                  </div>
                ))}
              </p>
            </div>

            <div className="selected_country_information">
              <img className="icon_img" src="/region.png" alt="region icon" />
              <p>{selectedCountryValue.region} </p>
            </div>

            <div className="selected_country_information">
              <img className="icon_img" src="/area.png" alt="area icon" />
              <p>
                {selectedCountryValue.area} km<sup>2</sup>
              </p>
            </div>
          </div>
          <div className="selected_country_information_right">
            <div className="selected_country_information">
              <img
                className="icon_img"
                src="/timezone.png"
                alt="timezone icon"
              />
              {selectedCountryValue.timezones.map((timezone, index) => (
                <React.Fragment key={index}>
                  <span>{timezone}</span>
                  {selectedCountryValue.timezones.length - 1 > index && (
                    <span>,</span>
                  )}
                </React.Fragment>
              ))}
              цагын бүстэй
            </div>

            <div className="selected_country_information">
              <img className="icon_img" src="/globe.png" alt="globe icon" />
              {selectedCountryValue.continents.map((continent, index) => (
                <React.Fragment key={index}>
                  <span>{continent}</span>
                  {selectedCountryValue.continents.length - 1 > index && (
                    <span>,</span>
                  )}
                </React.Fragment>
              ))}
              тив
            </div>

            <div className="selected_country_information">
              <img
                className="icon_img"
                src="/calendar.png"
                alt="calendar icon"
              />
              <p>
                {selectedCountryValue.startOfWeek === "monday"
                  ? "Даваа"
                  : selectedCountryValue.startOfWeek === "tuesday"
                  ? "Мягмар"
                  : selectedCountryValue.startOfWeek === "wednesday"
                  ? "Лхагва"
                  : selectedCountryValue.startOfWeek === "thursday"
                  ? "Пүрэв"
                  : selectedCountryValue.startOfWeek === "friday"
                  ? "Баасан"
                  : selectedCountryValue.startOfWeek === "saturday"
                  ? "Бямба"
                  : selectedCountryValue.startOfWeek === "sunday"
                  ? "Ням"
                  : ""}{" "}
                гарагаас ажил эхэлдэг
              </p>
            </div>

            <div className="selected_country_information">
              <img
                className="icon_img"
                src="/independent.png"
                alt="independent icon"
              />
              {selectedCountryValue.independent === true
                ? "Тусгаар тогтносон"
                : "Тусгаар тогтноогүй"}
            </div>

            <div className="selected_country_information">
              <img
                className="icon_img"
                src="/united-nation.png"
                alt="united-nation icon"
              />
              {selectedCountryValue.unMember === true
                ? "НҮБ гишүүн"
                : "НҮБ гишүүн биш"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

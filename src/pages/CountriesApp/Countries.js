import { useEffect, useRef, useState } from "react";
import "./style.css";
import CountryList from "./CountryList";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchCountryValue, setSearchCountryValue] = useState("");
  const countriesNumber = useRef(0);
  const paginationBoxesNumber = useRef(0);
  const [paginationBoxes, setPaginationBoxes] = useState([]);
  const [selectedPagination, setSelectedPagination] = useState(0);

  const setPaginations = (countries) => {
    countriesNumber.current = countries.length;
    paginationBoxesNumber.current = Math.ceil(countriesNumber.current / 10);
    const arr = [];
    for (let i = 0; i < paginationBoxesNumber.current; i++) {
      arr.push(i);
    }
    setPaginationBoxes(arr);
  };

  useEffect(() => {
    const getCountries = async () => {
      fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((parsedCountries) => {
          console.log(
            "[Countries] Улсуудын мэдээллийг амжилттай татаж авлаа: ",
            parsedCountries
          );

          setCountries(parsedCountries);

          setPaginations(parsedCountries);
        })
        .catch((res) =>
          console.log(
            "[Countries] Улсуудын мэдээллийг татаж авахад алдаа гарлаа",
            res
          )
        );
    };
    const getSearchedCountries = async () => {
      fetch(`https://restcountries.com/v3.1/name/${searchCountryValue}`)
        .then((res) => res.json())
        .then((parsedSearchedCountries) => {
          setSelectedPagination(0);
          console.log(
            "[Countries] Хайсан утгаар улсуудын мэдээллийг амжилттай татлаа",
            parsedSearchedCountries
          );

          setCountries(parsedSearchedCountries);
          setPaginations(parsedSearchedCountries);
        })
        .catch((res) =>
          console.log(
            "[Countries] хайсан утгаар улсуудын мэдээллийг татахад алдаа гарлаа!"
          )
        );
    };

    if (searchCountryValue.length === 0) {
      getCountries();
    } else {
      getSearchedCountries();
    }
  }, [searchCountryValue]);

  return (
    <div>
      <h3 className="lab_title">Лабораторийн ажил 3</h3>

      <div className="countries_container">
        <>
          <div className="container-Top content_attributes container_navbar">
            <h4>Дэлхийн улсууд</h4>
            <input
              value={searchCountryValue}
              onChange={(e) => setSearchCountryValue(e.target.value)}
              type="text"
              placeholder="Хайх улсын нэрээ бичнэ үү..."
            />
          </div>
          <CountryList
            countries={countries}
            selectedPagination={selectedPagination}
          />
        </>
        <div className="container-Pagination ml-5 flex">
          {
            <div className="pagination-boxes">
              {paginationBoxes.map((box, index) => (
                <div
                  key={index}
                  className="pagination-box"
                  onClick={() => setSelectedPagination(box)}
                >
                  <center> {box + 1}</center>
                </div>
              ))}
            </div>
          }
        </div>
        <br />
      </div>
    </div>
  );
}

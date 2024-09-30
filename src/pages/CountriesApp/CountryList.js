import { Link } from "react-router-dom";
import Country from "./Country";

export default function CountryList({ countries, selectedPagination }) {
  const startIndex = selectedPagination * 10;
  const endIndex = startIndex + 10;

  return (
    <div className="container-Content content_attributes">
      {/* {countries.length > 0 &&
        countries.map((country) => (
          <>
            <Link key={country.cca2} to={`/countries/detail/${country.cca2}`}>
              <Country country={country} />
            </Link>
          </>
        ))} */}

      {countries &&
        countries.slice(startIndex, endIndex).map((country) => (
          <>
            <Link key={country.cca2} to={`/countries/detail/${country.cca2}`}>
              <Country country={country} />
            </Link>
          </>
        ))}
    </div>
  );
}

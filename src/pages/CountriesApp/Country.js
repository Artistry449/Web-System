export default function Country({ country }) {
  return (
    <div className="country" key={country.cca2}>
      <div className="country_attributes_container">
        <img
          className="country_img"
          src={country.flags.svg}
          alt="country flag"
        />

        <div className="country_attributes">
          <h4>{country.name.official}</h4>
          <p>{country.population} хүн амтай</p>
        </div>
        <img
          className="arrow_right arrow"
          src="/arrow_right.png"
          alt="arrow_right"
        />
      </div>
    </div>
  );
}

export const getCountries = async () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((parsedCountries) => {
      console.log(
        "[Countries] Улсуудын мэдээллийг амжилттай татаж авлаа: ",
        parsedCountries
      );

      return parsedCountries;
    })
    .catch((res) =>
      console.log(
        "[Countries] Улсуудын мэдээллийг татаж авахад алдаа гарлаа",
        res
      )
    );
};

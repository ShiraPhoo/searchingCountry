let input = document.getElementById("inputBox");
let suggestDiv = document.querySelector(".suggestionBox");

// Call Api
async function callApi() {
  let getApi = await fetch("https://restcountries.eu/rest/v2/all");
  let results = await getApi.json();
  searchCountry(results);
}

function searchCountry(results) {
  input.addEventListener("keyup", function (e) {
    var searchValue = e.target.value;

    if (searchValue) {
      for (let result of results) {
        if (result.name.includes(searchValue)) {
          renderResult(result);
        }
      }
    } else {
      suggestDiv.style.display = "none";
      suggestDiv.innerHTML = "";
    }
  });
}

function renderResult(result) {
  console.log(result);

  suggestDiv.style.display = "block";
  suggestDiv.innerHTML = "";
  console.log(result.currencies[0].code);

  suggestDiv.innerHTML += `<p>Name: ${result.name}</p>
      <div class="flagBox">
        <p>Flag:</p>
        <img class="flagImg" src=${result.flag} alt="" /> 
      </div>
      <p>Population: ${result.population.toLocaleString()} </p>
      <p>Capital: ${result.capital}</p>
      <p>Currency: ${result.currencies[0].code}, ${
    result.currencies[0].symbol
  }</p>  
      <p>Langauge: ${result.languages[0].name}</p>
      `;
}

callApi();
input.focus();

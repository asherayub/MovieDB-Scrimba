/* 
    api: https://www.omdbapi.com/?apikey=552e81dc&s=movieName
*/

const API_KEY = "552e81dc";
let movieName = undefined;
let watchlistMovies = [];
let dataArray = [];
const form = document.querySelector("form");
const inputField = document.getElementById("movie-name");
const moviesEl = document.querySelector(".movies");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  movieName = inputField.value;
  getMovieData(movieName);
});
async function getMovieData(nameOfMovie) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${nameOfMovie}`
  );
  const data = await response.json();
  const imdbIDs = data.Search.map((imdb) => {
    return imdb.imdbID;
  });
  imdbIDs.map((id) => {
    dataArray = [];
    getMovieDataBasedOnIMDB(id);
  });
  // console.table(imdbIDs);
}

async function getMovieDataBasedOnIMDB(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  const data = await response.json();
  dataArray.push(data);
  moviesEl.innerHTML = dataArray
    .map((movie) => {
      const { Poster, Title, imdbRating, Runtime, Genre, Plot } = movie;
      return movieHTML(Poster, Title, imdbRating, Runtime, Genre, Plot);
    })
    .join("");

  document.querySelectorAll(".add").forEach((addBtn) => {
    addBtn.addEventListener("click", (e) => {
      watchlistMovies.push(
        e.target.parentElement.parentElement.parentElement.parentElement
          .outerHTML
      );
      localStorage.setItem("watchlist", watchlistMovies);
      document.getElementById("notifier").style.top = "2%";
      setTimeout(() => {
        document.getElementById("notifier").style.top = "-100%";
      }, 1500);
    });
  });
}

function movieHTML(Poster, Title, imdbRating, Runtime, Genre, Plot) {
  return `<div class="movie">
    <div class="poster">
        <img src="${Poster}" alt="N/A">
    </div>
    <div class="text">
        <div class="r1">
            <h1 class="name">${Title}</h1>
            <div class="rating__container">
            <i class="fa-solid fa-star"></i> <span class="rating">${imdbRating}</span>
            </div>
        </div>
        <div class="r2">
            <p class="length">${Runtime}</p>
            <p class="genre">${Genre}</p>
            <button title="Add to Watchlist" class="add"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
        </div>
        <div class="r3">
        <p class="plot">${Plot.slice(0, 100)}...</p>
        </div>
    </div>
</div>`;
}

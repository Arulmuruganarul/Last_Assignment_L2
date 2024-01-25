let searchResultsSection = document.querySelector("#searchResultsSection");
let searchText = document.querySelector("#searchText");
let userInputEl = document.querySelector("#searchBox");
let carouselList1 = document.querySelector("#carouselList1");

function renderCarousel(movieList) {
  movieList.forEach(async (eachMovie) => {
    // console.log(eachMovie);
    const { genre_ids, title, poster_path, release_date, overview, id } =
      eachMovie;
    const movieDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2ad18877c2ecce5382256b80fefda964`
    );
    const res = await movieDetail.json();
    // console.log(res);
    const { genres } = res;
    let genereNames = "";
    genres.forEach((each) => {
      genereNames += each.name + " ";
    });
    // console.log(genereNames);
    splide1.destroy();
    searchText.textContent = "";
    let listItem = document.createElement("li");
    listItem.classList.add("splide__slide");
    carouselList1.appendChild(listItem);
    let imgEl = document.createElement("img");
    imgEl.classList.add("carousel-img");
    imgEl.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    let heartEL = document.createElement("img");
    heartEL.src = "./images/Heard.png";
    
    imgEl.appendChild(heartEL);
    listItem.appendChild(imgEl);
    let movieTitle = document.createElement("p");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = title;
    listItem.appendChild(movieTitle);
    let genreEl = document.createElement("p");
    genreEl.classList.add("movie-des");
    genreEl.textContent = genereNames;
    listItem.appendChild(genreEl);
    splide1.mount();
  });
}
async function renderSearchMovie(movie) {
  const { genre_ids, title, poster_path, release_date, overview, id } = movie;
  const movieDetail = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=2ad18877c2ecce5382256b80fefda964`
  );
  const res = await movieDetail.json();
  console.log(res);
  const { genres } = res;
  let genereNames = "";
  genres.forEach((each) => {
    genereNames += each.name + " ";
  });
  console.log(genereNames);
  const getRecommended = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=2ad18877c2ecce5382256b80fefda964&with_genres=${genre_ids.join(
      ","
    )}`
  );
  const recommendedData = await getRecommended.json();
  console.log(recommendedData);
  const { results } = recommendedData;
  //   console.log(results);
  searchResultsSection.innerHTML = `
    <img class="search-movie" src=https://image.tmdb.org/t/p/w500/${poster_path} alt=${title} />
    <div class="search-movie-content Your-movie-description">
    <h1 class="search-movie-title">${title}</h1>
    <p class="genere">${genereNames}</p>
    <p class="search-movie-release-date">Release Date: ${release_date}</p>
    <p class="search-movie-description">${overview}</p>
    </div>
    `;
  renderCarousel(results);
}
async function getUserMovie() {
  console.log(this.value);
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${this.value}&api_key=2ad18877c2ecce5382256b80fefda964`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWQxODg3N2MyZWNjZTUzODIyNTZiODBmZWZkYTk2NCIsInN1YiI6IjY1YjIzMjY1NmVlY2VlMDBjOTMzZjA2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1aSTQjDzIQ1BAH2OCc2A0kqegYT53YPtUNQHT2FD40`,
    },
  };
  const responseData = await fetch(apiUrl, options);
  const data = await responseData.json();
  //   console.log(data);
  const { results } = data;
  console.log(results);
  const firstMovieData = results[0];
   //   console.log(firstMovieData);
  //   const { genre_ids, title, poster_path, release_date } = firstMovieData;
  //   let imgEl = document.createElement("img");
  //   imgEl.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  //   searchResultsSection.appendChild(imgEl);
  renderSearchMovie(firstMovieData);
}
const fetchData = () => {
  userInputEl.addEventListener("change", getUserMovie);
};



let splide1 = new Splide("#carousel1", {
  type: "loop",
  perPage: 4,
  gap:"30px",
  pagination: false,
});
fetchData();
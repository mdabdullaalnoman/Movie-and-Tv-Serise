// load popular movie 
const LoadPopularMovie = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=9a5390b9a3a6704663b623e43fc0b4c4');
  const data = await response.json();
  displayPopularMovie(data)
  return data;
};
LoadPopularMovie();



// display popular movie
const displayPopularMovie = (data) => {
  const movies = data.results;
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('popular-card');
    div.innerHTML = `
        <img onclick="loadMovieDetails(${movie.id})" data-bs-toggle="modal" data-bs-target="#openModal" src="https://image.tmdb.org/t/p/original/${movie.poster_path}"></img>
        <h3>${movie.original_title}</h3>
        <p>${movie.release_date}</p>
        `;
    document.getElementById('popular-movies').appendChild(div);
  });
};




// load clicked movie data
const loadMovieDetails = (MovieId) => {
  fetch(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=9a5390b9a3a6704663b623e43fc0b4c4`)
    .then(res => res.json())
    .then(data => displayMovieDetails(data))
};



//display clicked movie details
const displayMovieDetails = (details) => {
  const clickedMovie = document.getElementById('popular-movie-details');
  //clear previous details
  clickedMovie.innerHTML = '';
  const div = document.createElement('div');
  div.style.textAlign = 'center';
  div.style.minWidth = '150px';
 
  // set element on movie details div
  const img = document.createElement('img');
  const h5 = document.createElement('h2');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');

  h5.style.color = 'white';
  h5.innerText = `Movie Tittle:  ${details.original_title}`;
  div.appendChild(h5);

  img.style.height = '250px';
  img.src = `https://image.tmdb.org/t/p/original/${details.poster_path}`;
  div.appendChild(img);

  p1.style.color = 'white';
  p1.innerText = `Release Date:   ${details.release_date}`;
  div.appendChild(p1);

  p2.style.color = 'white';
  p2.innerText = `Production Country:    ${details.production_countries[0].name}`;
  div.appendChild(p2);

  p3.style.color = 'white';
  p3.innerText = `${details.overview}`;
  div.appendChild(p3);

  clickedMovie.appendChild(div);
}




// click search btn and get search results
document.getElementById('search-btn').addEventListener('click', function () {

  fetch('https://api.themoviedb.org/3/movie/popular?api_key=9a5390b9a3a6704663b623e43fc0b4c4')
    .then(res => res.json())
    .then(data => {

      // LoadPopularMovie()
      //   .then(data => { })

      const inputField = document.getElementById('search-value');
      const searchResult = document.getElementById('search-results');

      const popularMovies = data.results;
      const inputValue = inputField.value;

      const filterData = popularMovies.filter(movie => movie.original_title.toLowerCase().indexOf(inputValue.toLowerCase()) != -1);
      // clear previous search result
      searchResult.innerHTML = '';

      // search box error handle
      function handleError(display, innerText) {
        const h1 = document.getElementById('error-show');
        h1.style.color = 'red';
        h1.style.textAlign = 'center';
        h1.style.display = display;
        h1.innerText = innerText;
      };

      if (filterData.length == 0 || inputValue == '') {
        handleError('block', 'No Result Found');
      } else {
        handleError('none', ' ');

        for (const searchData of filterData) {


          const div = document.createElement('div');
          const img = document.createElement('img');
          const h5 = document.createElement('h5');

          img.style.height = '250px';
          img.src = `https://image.tmdb.org/t/p/original/${searchData.poster_path}`;
          div.appendChild(img);

          h5.style.color = 'white';
          h5.innerText = `${searchData.original_title}`;
          div.appendChild(h5);

          inputField.value = '';
          searchResult.appendChild(div);
        }
      }
    })
});
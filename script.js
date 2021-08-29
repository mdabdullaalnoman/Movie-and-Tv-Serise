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
        <h6>${movie.original_title}</h6>
        <p>${movie.release_date}</p>
        `;
    document.getElementById('popular-movies').appendChild(div);
  });
};




// load clicked movie data
const loadMovieDetails = (MovieId) => {
  console.log(MovieId);
  fetch(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=9a5390b9a3a6704663b623e43fc0b4c4`)
    .then(res => res.json())
    .then(data => displayMovieDetails(data))
};



//display clicked movie details
const displayMovieDetails = (details) => {
  console.log(details);
  const clickedMovie = document.getElementById('popular-movie-details');
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="modal fade" id="openModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <h6>${details?.id}</h6>
        <img class="popup-img" src="https://image.tmdb.org/t/p/original${details.poster_path}"></img>
        <h6>${details?.original_title}</h6>
        <p>${details?.overview}</p>
        </div>
      </div>
    </div>
  </div>
    `;


  // const img = document.createElement('img');
  // const h5 = document.createElement('h5');
  // const p = document.createElement('p');

  // img.style.height = '250px';
  // img.src = `https://image.tmdb.org/t/p/original/${details.poster_path}`;
  // div.appendChild(img);

  // h5.style.color = 'white';
  // h5.innerText = `${details.original_title}`;
  // div.appendChild(h5);

  // p.style.color = 'white';
  // p.innerText = `${details.overview}`;
  // div.appendChild(p);

  clickedMovie.appendChild(div);
}




// click search btn and get search results
document.getElementById('search-btn').addEventListener('click', function () {



  LoadPopularMovie()
    .then(data => {


      const inputField = document.getElementById('search-value');
      const searchResult = document.getElementById('search-results');

      const popularMovies = data.results;
      const inputValue = inputField.value;
      const filterData = popularMovies.filter(movie => movie.original_title.toLowerCase().indexOf(inputValue.toLowerCase()) != -1);

      searchResult.innerHTML = '';

      for (const searchData of filterData) {
        
        console.log(searchData);
        const div = document.createElement('div');
        const img = document.createElement('img');
        const h5 = document.createElement('h5');
        const p = document.createElement('p');

        img.style.height = '250px';
        img.src = `https://image.tmdb.org/t/p/original/${searchData.poster_path}`;
        div.appendChild(img);

        h5.style.color = 'white';
        h5.innerText = `${searchData.original_title}`;
        div.appendChild(h5);

        // p.style.color = 'white';
        // p.innerText = `${searchData.overview}`;
        // div.appendChild(p);
        inputField.value = '';
        searchResult.appendChild(div);

      }
    });
})
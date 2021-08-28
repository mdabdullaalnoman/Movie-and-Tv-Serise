const LoadPopularMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9a5390b9a3a6704663b623e43fc0b4c4')
        .then(res => res.json())
        .then(data => displayPopularMovie(data))
};
LoadPopularMovie();

const displayPopularMovie = (data) =>{
    const movies = data.results;
    movies.forEach(movie => {
        console.log(movie);
        const div = document.createElement('div');
        div.classList.add('popular-card');
        div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}"></img>
        <h6>${movie.original_title}</h6>
        <p>${movie.release_date}</p>
        `;
        document.getElementById('popular-movies').appendChild(div);
    });

}
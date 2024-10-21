const tmdbKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWE5OGE5ZDZhNjhjYmQyZDkwYjAxNWU1NDQ5N2ZmOCIsIm5iZiI6MTcyOTQyNzkyMi41MjEwNjgsInN1YiI6IjYxYjc3OTVkZmE0MDQ2MDA2MDUzNzViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.03bu50pQuXRF7U8ggW6P6JiS5sjPEhE3VMwKoWPl-nI';
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';
const playBtn = document.getElementById('playBtn');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: tmdbKey
    }
};
const getGenres = async () => {
    const genreRequestEndpoint = 'genre/movie/list?language=en';
    let genres
    try {
        await fetch(`${tmdbBaseUrl}${genreRequestEndpoint}`, options)
            .then(response => response.json())
            .then(data => {
                genres = data.genres;
            });
    } catch (error) {
        console.error('Error:', error);
    }

    return genres;
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const movieRequestEndpoint = `discover/movie?with_genres=${selectedGenre}`;
    let selectedMovies;
    try {
       await fetch(`${tmdbBaseUrl}${movieRequestEndpoint}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                selectedMovies = data.results;
            });
    } catch (error) {
        console.error('Error:', error);
    }

    return selectedMovies;
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const singleMovieEndpoint = `movie/${movieId}`
    let movieInfo;

    try {
        await fetch(`${tmdbBaseUrl}${singleMovieEndpoint}`, options)
            .then(response => response.json())
            .then(data => {
                movieInfo = data;
            });
    } catch (error) {
        console.error('Error:', error);
    }

    return movieInfo;
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie =  async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = await getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    await displayMovie(info)
};


getGenres().then(populateGenreDropdown);
 playBtn.onclick = showRandomMovie;

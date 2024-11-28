const swiperGenres = document.querySelector('.genre-swiper .swiper-wrapper');
const genreButtons = document.querySelectorAll('.genre-selector');
const genreChoice = document.querySelector('.genreChoice');

async function fetchMoviesByGenre(genreId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTNkZDBiYTFmNDdlNDQ5MmZiOTdjZWVkOWFhZGQxNyIsIm5iZiI6MTczMDcyODgyMi4zOTU1NTA1LCJzdWIiOiI2NzI4YzUzMGMwOTAxMDk1ODBmYTA2NTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sGCUNy0ji5s98OAOe0ZbjzsRgYq3y7h6wv9hNruXG1U'
        }
};
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, options);
    const data = await response.json();
    return data.results;
}

async function updateMoviesByGenre(genreId, genreName) {
    console.log(`updateMoviesByGenre appelé avec genreId: ${genreId}, genreName: ${genreName}`);
    const movies = await fetchMoviesByGenre(genreId);
    console.log("Films récupérés :", movies);

    genreChoice.textContent = `Results for "${genreName}"`;
    swiperGenres.innerHTML = '';

    movies.forEach(movie => {
        if (movie.poster_path) {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            slide.appendChild(img);

            const movieInfo = createMovieInfo(movie);
            slide.appendChild(movieInfo);

            swiperGenres.appendChild(slide);
        }
    });
    genresSwiper.update();
}

genreButtons.forEach(button => {
    button.addEventListener('click', () => {
    genreButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const genreId = button.dataset.genreId;
    const genreName = button.textContent;

    updateMoviesByGenre(genreId, genreName);
});
});

// Comedy default genre
setTimeout(() => {
const defaultGenreButton = document.querySelector('.genre.active');
console.log("État du genre par défaut :", defaultGenreButton);
if (defaultGenreButton){
    const genreId = defaultGenreButton.dataset.genreId;
    const genreName = defaultGenreButton.textContent;

    console.log("Genre par défaut trouvé :", genreName, genreId);

    updateMoviesByGenre(genreId, genreName);

}else {
    console.log("Aucun genre par défaut trouvé.");
}
}, 100);

/* ___ h o v e r - d a t a ___ */

let genreMap = {};

async function fetchGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        // Fill genreMap with API's genres
        data.genres.forEach(genre => {
            genreMap[genre.id] = genre.name;
        });
    } catch (error) {
        console.error('Error', error);
    }
}

fetchGenres();

function getGenreNames(genreIds){
    return genreIds.map(id => genreMap[id]).join(', ');
}

function createMovieInfo(movie) {

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    movieInfo.setAttribute('data-movie-id', movie.id);
    
    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;

    const movieYear = document.createElement('div');
    movieYear.classList.add('movie-year');
    movieYear.textContent = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

    const movieGenre = document.createElement('div');
    movieGenre.classList.add('movie-genre');
    movieGenre.textContent = getGenreNames(movie.genre_ids);

    const movieStar = document.createElement('img');
    movieStar.classList.add('movie-star');
    movieStar.src = 'img/star-rating.png';
    movieStar.alt = 'Star Rating';

    const movieRating = document.createElement('div');
    movieRating.classList.add('movie-rating');
    movieRating.textContent = movie.vote_average.toFixed(1) || 'N/A';

    
    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieYear);
    movieInfo.appendChild(movieGenre);
    movieInfo.appendChild(movieStar);
    movieInfo.appendChild(movieRating);

    return movieInfo;
}
/* ___ s w i p e r - g e n r e s ___ */

const genresSwiper = new Swiper('.genre-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: -15,
    // Navigation arrows
    navigation: {
        nextEl: '.genre-swiper .swiper-button-next',
        prevEl: '.genre-swiper .swiper-button-prev',
    },
});
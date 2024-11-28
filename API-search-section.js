const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTNkZDBiYTFmNDdlNDQ5MmZiOTdjZWVkOWFhZGQxNyIsIm5iZiI6MTczMDcyODgyMi4zOTU1NTA1LCJzdWIiOiI2NzI4YzUzMGMwOTAxMDk1ODBmYTA2NTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sGCUNy0ji5s98OAOe0ZbjzsRgYq3y7h6wv9hNruXG1U'
    }
};

const searchInput = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const searchSwiper = document.querySelector('.search-swiper');

document.getElementById('search-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const query = searchInput.value;
    searchSwiper.style.display = 'block';
    if (query) {
        const results = await fetchSearchResults(query);
        displaySearchResults(results);
    }
});

async function fetchSearchResults(query) {
    
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, options);
    const data = await response.json();
    return data.results;
}

function displaySearchResults(movies) {
    const swiperWrapper = document.querySelector('.search-swiper .swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Clear previous results

    movies.forEach(movie => {
        const { title, release_date, genre_ids, vote_average, poster_path, id } = movie;

        // Create the slide element
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.setAttribute('data-movie-id', id);

        // Movie poster
        const movieThumbnail = document.createElement('img');
        movieThumbnail.classList.add('movie-thumbnail');
        movieThumbnail.src = `https://image.tmdb.org/t/p/w200${poster_path}`;
        movieThumbnail.alt = `${title}`;

        // Movie info container
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        // Title
        const movieTitle = document.createElement('div');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = title;

        // Release year
        const movieYear = document.createElement('div');
        movieYear.classList.add('movie-year');
        movieYear.textContent = release_date ? release_date.split('-')[0] : 'N/A';

        // Genres (using IDs here; you can map them to names if needed)
        const movieGenre = document.createElement('div');
        movieGenre.classList.add('movie-genre');
        movieGenre.textContent = genre_ids.join(' / '); // Replace this with actual genre names if available

        // Star image
        const movieStar = document.createElement('img');
        movieStar.classList.add('movie-star');
        movieStar.src = 'star-rating.png'; // Replace with the path to your star icon

        // Rating
        const movieRating = document.createElement('div');
        movieRating.classList.add('movie-rating');
        movieRating.textContent = vote_average ? vote_average.toFixed(1) : 'N/A';

        // Append elements to movie info
        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieYear);
        movieInfo.appendChild(movieGenre);
        movieInfo.appendChild(movieStar);
        movieInfo.appendChild(movieRating);

        // Append thumbnail and info to the slide
        swiperSlide.appendChild(movieThumbnail);
        swiperSlide.appendChild(movieInfo);

        // Append the slide to the wrapper
        swiperWrapper.appendChild(swiperSlide);
    });
}

// Function to fetch movie details by movie ID
async function fetchMovieDetails(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
    const data = await response.json();
    return data; // Detailed movie data
}

// Function to open and populate the modal with movie data
function openMovieModal(movieData) {
    const modal = document.querySelector('.movie-modal');
    const modalContent = modal.querySelector('.movie-modal-content');
    console.log('Opening modal with movie data:', movieData); // Debug line

    // Populate the modal with movie data
    modal.querySelector('.card-image img').src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    modal.querySelector('.card-title').textContent = movieData.title;
    modal.querySelector('.card-year').textContent = movieData.release_date ? movieData.release_date.split('-')[0] : 'N/A';
    modal.querySelector('.star-rating').textContent = `${movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A'}`;
    modal.querySelector('.card-genre').textContent = movieData.genres.map(genre => genre.name).join(' / ');
    modal.querySelector('.card-description').textContent = movieData.overview;
    modal.querySelector('.cast').textContent = 'Loading cast...'; // Placeholder until cast data loads

    // Show modal
    modal.style.display = 'block';

    // Fetch and display cast
    fetchMovieCast(movieData.id);
}

// Function to fetch cast information for a specific movie
async function fetchMovieCast(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
    const data = await response.json();
    const castList = data.cast.slice(0, 5).map(member => member.name).join(', '); // Limit to top 5 cast members
    document.querySelector('.card .cast').textContent = castList || 'No cast information available';
}

document.querySelector('.search-swiper .swiper-wrapper').addEventListener('click', async (e) => {
    const movieThumbnail = e.target.closest('.swiper-slide');
    if (movieThumbnail && movieThumbnail.hasAttribute('data-movie-id')) {
        const movieId = movieThumbnail.getAttribute('data-movie-id');
        if (movieId) {
            const movieData = await fetchMovieDetails(movieId);
            openMovieModal(movieData);
        }
    }
});


// Close modal when close button is clicked
document.querySelector('.close-movie').addEventListener('click', () => {
    document.querySelector('.movie-modal').style.display = 'none';
});





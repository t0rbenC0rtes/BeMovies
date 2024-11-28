document.addEventListener("DOMContentLoaded", () => {
  populateLatestReleases(); // Call the function when the DOM is fully loaded
});

async function fetchLatestReleases() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      options
    );
    const data = await response.json();

    // Log the data to check its structure
    console.log("API Response:", data);

    // Check if data.results exists and is an array
    if (data.results && Array.isArray(data.results)) {
      return data.results; // Return the array of latest movies
    } else {
      console.error("No results found in the response");
      return []; // Return an empty array if no results are found
    }
  } catch (error) {
    console.error("Error fetching latest releases:", error);
    return []; // Return an empty array in case of an error
  }
}

// Populate the latest releases slider with the fetched data
async function populateLatestReleases() {
  const latestMovies = await fetchLatestReleases();
  if (latestMovies.length === 0) {
    console.log("No movies to display");
    return; // Exit if no movies are returned
  }

  const swiperWrapper = document.querySelector(
    ".latest-swiper .swiper-wrapper"
  );

  // Make sure the swiperWrapper exists
  if (!swiperWrapper) {
    console.error("Swiper wrapper not found!");
    return; // Exit if swiperWrapper doesn't exist
  }

  swiperWrapper.innerHTML = ""; // Clear any existing slides

  latestMovies.forEach((movie) => {
    const { title, release_date, genre_ids, vote_average, poster_path, id } =
      movie;

    // Create the slide element
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.setAttribute("data-movie-id", id);

    // Movie poster
    const movieThumbnail = document.createElement("img");
    movieThumbnail.classList.add("movie-thumbnail");
    movieThumbnail.src = `https://image.tmdb.org/t/p/w200${poster_path}`;
    movieThumbnail.alt = `${title}`;

    // Movie info container
    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    // Title
    const movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = title;

    // Release year
    const movieYear = document.createElement("div");
    movieYear.classList.add("movie-year");
    movieYear.textContent = release_date ? release_date.split("-")[0] : "N/A";

    // Genres (using IDs here; you can map them to names if needed)
    const movieGenre = document.createElement("div");
    movieGenre.classList.add("movie-genre");
    movieGenre.textContent = genre_ids.join(" / "); // Replace this with actual genre names if available

    // Star image
    const movieStar = document.createElement("img");
    movieStar.classList.add("movie-star");
    movieStar.src = "star-rating.png"; // Replace with the path to your star icon

    // Rating
    const movieRating = document.createElement("div");
    movieRating.classList.add("movie-rating");
    movieRating.textContent = vote_average ? vote_average.toFixed(1) : "N/A";

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

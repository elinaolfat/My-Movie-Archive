const axios = require('axios');
const fs = require('fs');

const apiKey = "a8df0bc1e84c757fef12cc328a2e8411";
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

const fetchGenres = async () => {
  try {
    const response = await axios.get(genresUrl);
    const genres = response.data.genres;

    // Write the genres to a JSON file
    fs.writeFileSync('genres.json', JSON.stringify(genres, null, 2), 'utf-8');
    console.log('Genres fetched and saved to genres.json');
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

fetchGenres();

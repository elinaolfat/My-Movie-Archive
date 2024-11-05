const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiKey = "a8df0bc1e84c757fef12cc328a2e8411";

async function fetchMovieInfo(title, year) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}&year=${year}`;
    try {
        const response = await axios.get(searchUrl);

        //console.log('Response:', response.data);

        const movies = response.data.results;

        if (movies.length > 0) {
            // Save the first movie found to JSON file
            const movieData = movies[0];
            const jsonFilePath = path.join(__dirname, 'watchedMovies.json');

            let existingData = [];
            if (fs.existsSync(jsonFilePath)) {
                const fileData = fs.readFileSync(jsonFilePath);
                existingData = JSON.parse(fileData);
            }

            existingData.push(movieData);
            fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
            console.log(`Movie information saved to ${jsonFilePath}`);
        } else {
            console.log('No movies found.');
        }
    } catch (error) {
        console.error('Error fetching movie data:', error.message);
    }
}

// Get title and year from command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Please provide a movie title and year as arguments.');
    process.exit(1);
}

const [title, year] = args;
fetchMovieInfo(title, year);

// enter the below to fetch relevant data
// node public/fetchMovieInfo.js "Movie Title" 2023
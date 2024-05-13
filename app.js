// const SECOND_API_URL2 = 'https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2dff034ece8f33fb53f31c54675fc019&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=2dff034ece8f33fb53f31c54675fc019&query="';

const SECOND_API_URL2 = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2dff034ece8f33fb53f31c54675fc019&page=1';


const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')



async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    // console.log(data.results);
    showMovies(data.results);

}
getMovies(SECOND_API_URL2)

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

        search.value= ''
    } else {
        window.location.reload()
    }
})

function showMovies(movies){
    console.log(movies);
    main.innerHTML=""


    movies.forEach((movie) => {
        const {title, poster_path, overview, vote_average} = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="green">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
          <h3>${title}<small>overview</small></h3>
          <p>
            ${overview}
          </p>
        </div>
        
        `

        main.appendChild(movieEl)
    });
}



function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
    
}

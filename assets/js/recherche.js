const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGM2ZThiNzY0NjNhMzhiOTFmZmE5N2VlMzU1YWYzNiIsIm5iZiI6MTczNTgyMjAwOS4zOTM5OTk4LCJzdWIiOiI2Nzc2OGFiOTE5NGI1ODE2ZDc2MTViYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hvc8PtNka41sXdaGykaOQMfwtK0LEGAw7Yhb4IeYiok'
    }
  };
  
 let params = new URLSearchParams(document.location.search)
let idMovie = params.get("idMovie")

if (idMovie){

  fetch(`https://api.themoviedb.org/3/search/movie?query=${idMovie}&include_adult=false&language=en-US&page=1`, options)
  .then((reponse) => reponse.json())
    .then((search) => {
        console.log(search);
        search.results.forEach(film => {
        moment.locale("fr") 
        document.getElementById("filmSearch").innerHTML +=`
        <section class="cardMovie">
                        <div class="movie">
                            <a href="movie.html?id=${film.id}"><img src="https://image.tmdb.org/t/p/original/${film.poster_path}" alt="${film.title}">
                            <h3>${film.title}</h3>
                            <p>${moment(film.release_date).format("LL")}</p>
                        
                            <div class="mooveNote">
                                <div class="note" title="${film.vote_count} votes">${Math.round(film.vote_average * 10)/10}</div>
                            </div>
                            </a>
                        </div>
                    </section>`    
        });

        
  document.getElementById("filmSearch").addEventListener('wheel', (e) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
    });

    })}

  

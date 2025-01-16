const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGM2ZThiNzY0NjNhMzhiOTFmZmE5N2VlMzU1YWYzNiIsIm5iZiI6MTczNTgyMjAwOS4zOTM5OTk4LCJzdWIiOiI2Nzc2OGFiOTE5NGI1ODE2ZDc2MTViYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hvc8PtNka41sXdaGykaOQMfwtK0LEGAw7Yhb4IeYiok'
    }
};

let params = new URLSearchParams(document.location.search);
let id = params.get("id");



fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`, options)
    .then((reponse) => reponse.json())
    .then((credit) => {



        fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options)
            .then((reponse) => reponse.json())
            .then((film) => {

                fetch(`https://api.themoviedb.org/3/movie/${film.id}/videos?language=fr-FR`, options)
                    .then((reponse) => reponse.json())
                    .then((videos) => {
                        moment.locale("fr")
                        let heure = Math.floor(film.runtime / 60)
                        let minute = film.runtime % 60

                        const scoreSur10 = film.vote_average;
                        const scorePourcentage = Math.round(scoreSur10 * 10)
                        const descriptif = `<div class="idescriptif">
                    <a href="https://www.facebook.com/gaumont/?locale=fr_FR"><span><i
                                class="fa-brands fa-facebook"></i></span></a>
                    <a href="https://github.com/ichdev-art"><span><i class="fa-brands fa-github"></i></span></a>
                    <a href="https://www.gifsanimes.com/data/media/77/fantome-image-animee-0008.gif"><span><i
                                class="fa-solid fa-ghost"></i></span></a>
                </div>
                <p class="Tb">Titre d'origine</p>
                <p>${film.original_title}</p>
                <p class="Tb">Statut</p>
                <p>Film sorti</p>
                <p class="Tb">Langue d'origine</p>
                <p>${film.original_language}</p>`


                        const cardHtml = `<div class="containerTeteLeft">
                <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="image du film">
            </div>
            <div class="containerTeteRight">
                <div class="textTile">
                    <h1>${film.title}<span>(1999)</span></h1>
                    <div class="minitet">
                        <p class="iage">16</p>
                        <p>${film.release_date} (FR) </p>
                        <ul>
                            <li>${film.genres[0].name},${film.genres[1].name}</li>
                            <li>${heure} h ${minute}</li>
                        </ul>
                    </div>
                    <div class="score">
                        <div class="scoreround">
                            <p>${film.vote_average}/10</p>
                        </div>
                        <p class="eval">Score d'évaluation</p>
                    </div>
                    <button><i class="fa-solid fa-heart"></i></button>
                    <button><i class="fa-solid fa-star"></i></button>
                    <a href="https://www.youtube.com/embed/${videos.results[0].key}" target="_blank" class="bande"><i class="fa-solid fa-play"></i> Bande annonce</a>
                    <div class="synopsis">
                        <p>${film.tagline}</p>
                        <h2>Résume</h2>
                        <p>${film.overview}</p>
                    </div>
                </div>
                <div class="createur">
                    <div class="creat">
                        <h3></h3>
                        <h4></h4>
                    </div>
                </div>
            </div>
        </div>
                        `;
                        document.getElementById("container").innerHTML = cardHtml;
                        document.querySelector(".scoreround").textContent = `${scorePourcentage}%`



                        for (let acteur = 0; acteur < 10; acteur++) {
                            document.querySelector(".containerFoot").innerHTML += `<div class="card">
    <img src="https://image.tmdb.org/t/p/w500/${credit.cast[acteur].profile_path}" alt="image acteur">
                <div class="footcard">
                    <h4>${credit.cast[acteur].name
                                }</h4 >
    <p>${credit.cast[acteur].character}</p>
                </div >
            </div >
    `
                        }
                        document.querySelector(".descriptif").innerHTML = descriptif;
                    }
                    )
                    .catch(error => console.error('Erreur :', error));
            })


        document.querySelector(".containerFoot").addEventListener('wheel', (e) => {
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY;
        });
    })

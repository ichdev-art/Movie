fetch("credits.json")
    .then((reponse) => reponse.json())
    .then((credit) => {



        fetch('details.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let heure = Math.floor(data.runtime / 60)
                let minute = data.runtime % 60

                for (let objProperty in data) {
                    console.log(data[objProperty]);

                    if (Array.isArray(data[objProperty])) {
                        for (let item of data[objProperty]) {
                            console.log(item);
                            moment.locale("fr")
                            const descriptif = `<div class="idescriptif">
                    <a href="https://www.facebook.com/gaumont/?locale=fr_FR"><span><i
                                class="fa-brands fa-facebook"></i></span></a>
                    <a href="https://github.com/ichdev-art"><span><i class="fa-brands fa-github"></i></span></a>
                    <a href="https://www.gifsanimes.com/data/media/77/fantome-image-animee-0008.gif"><span><i
                                class="fa-solid fa-ghost"></i></span></a>
                </div>
                <p class="Tb">Titre d'origine</p>
                <p>${data.original_title}</p>
                <p class="Tb">Statut</p>
                <p>Film sorti</p>
                <p class="Tb">Langue d'origine</p>
                <p>${data.original_language}</p>`
                            const cardHtml = `<div class="containerTeteLeft">
                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="image du film">
            </div>
            <div class="containerTeteRight">
                <div class="textTile">
                    <h1>${data.title}<span>(1999)</span></h1>
                    <div class="minitet">
                        <p class="iage">16</p>
                        <p>${data.release_date} (FR) </p>
                        <ul>
                            <li>${data.genres[0].name},${data.genres[1].name}</li>
                            <li>${heure} h ${minute}</li>
                        </ul>
                    </div>
                    <div class="score">
                        <div class="scoreround">
                            <p>${data.vote_average}/10</p>
                        </div>
                        <p class="eval">Score d'évaluation</p>
                    </div>
                    <button><i class="fa-solid fa-heart"></i></button>
                    <button><i class="fa-solid fa-star"></i></button>
                    <a href="https://www.youtube.com/watch?v=0ha2XYVC7_s" target="_blank" class="bande"><i class="fa-solid fa-play"></i> Bande annonce</a>
                    <div class="synopsis">
                        <p>${data.tagline}</p>
                        <h2>Résume</h2>
                        <p>${data.overview}</p>
                    </div>
                </div>
                <div class="createur">
                    <div class="creat">
                        <h3>Lilly Wachowski</h3>
                        <h4>Director,Writer</h4>
                    </div>
                    <div class="creat">
                        <h3>Lana Wachowski</h3>
                        <h4>Director,Writer</h4>
                    </div>
                </div>
            </div>
        </div>
                        `;
                            document.getElementById("container").innerHTML = cardHtml;


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
                    }

                }
            }
            )
            .catch(error => console.error('Erreur :', error));
    })


document.querySelector(".containerFoot").addEventListener('wheel', (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
});
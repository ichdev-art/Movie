const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGM2ZThiNzY0NjNhMzhiOTFmZmE5N2VlMzU1YWYzNiIsIm5iZiI6MTczNTgyMjAwOS4zOTM5OTk4LCJzdWIiOiI2Nzc2OGFiOTE5NGI1ODE2ZDc2MTViYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hvc8PtNka41sXdaGykaOQMfwtK0LEGAw7Yhb4IeYiok'
    }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        for (let objProperty in data) {
            console.log(data[objProperty]);

            if (Array.isArray(data[objProperty])) {
                for (let item of data[objProperty]) {
                    console.log(item);
                    moment.locale("fr")
                    const cardHtml = `
                    <section class="cardMovie">
                        <div class="movie">
                            <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt="${item.title}">
                            <h3>${item.title}</h3>
                            <p>${moment(item.release_date).format("LL")}</p>
                            <div class="mooveNote">
                                <div class="note" title="${item.vote_count} votes">${Math.round(item.vote_average * 10)/10}</div>
                            </div>
                        </div>
                    </section>`;
                    document.getElementById("containerMovie").innerHTML += cardHtml;
                }

                const cards = document.querySelectorAll(".cardMovie");
                cards.forEach((card, index) => {
                    card.addEventListener("click", () => {
                        const movieTitle = encodeURIComponent(data[objProperty][index].id)
                        window.location.href = `movie.html?id=${movieTitle}`;
                    });
                });
            }
        }
    }
    )
    .catch(error => console.error('Erreur :', error));

document.getElementById("containerMovie").addEventListener("wheel", (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
})

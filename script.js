const watchlistContainer = document.getElementById("watchlist-container");
const tombolWatchlist = document.querySelectorAll(".movie-card button");
let watchlist = JSON.parse(localStorage.getItem("pavmoWatchlist")) || [];

function simpanWatchlist() {
    localStorage.setItem("pavmoWatchlist", JSON.stringify(watchlist));
}

function tampilkanWatchlist() {
    watchlistContainer.innerHTML = "";

    if (watchlist.length == 0) {
        watchlistContainer.innerHTML =
            '<p>Your Watchlist is empty.</p>';
            return;
    }

    watchlist.forEach(function(film) {
        const item = document.createElement("div");
        item.className = "watchlist-item";

        const judul = document.createElement("h3");
        judul.textContent = film.judul;

        const genre = document.createElement("p");
        genre.textContent = film.genre;

        const tahun = document.createElement("p");
        tahun.textContent = film.tahun;

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Remove";

        tombolHapus.addEventListener("click", function() {
            watchlist = watchlist.filter(function(data) {
                return data.judul !== film.judul;
            });
            simpanWatchlist();
            tampilkanWatchlist();
        });

        item.appendChild(judul);
        item.appendChild(genre);
        item.appendChild(tahun);
        item.appendChild(tombolHapus);

        watchlistContainer.appendChild(item);
    });
}

tombolWatchlist.forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        const kartuFilm = tombol.parentElement;
        const judul = kartuFilm.querySelector("h3").textContent;
        const informasi = kartuFilm.querySelectorAll("p");

        const film = {
            judul: judul,
            genre: informasi[0].textContent,
            tahun: informasi[1].textContent
        };

        const sudahAda = watchlist.some(function(data) {
            return data.judul === film.judul;
        });

        if (sudahAda) {
            alert("Film sudah ada di Watchlist!");
            return;
        }

        watchlist.push(film);
        simpanWatchlist();
        tampilkanWatchlist();
        alert("Film berhasil ditambahkan!");
    });
});

tampilkanWatchlist();
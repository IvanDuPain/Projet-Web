// Filtrer les albums par époque.
function filtrerAlbums(epoque, bouton) {
    let albums = document.querySelectorAll(".sub-album-card");
    let boutons = document.querySelectorAll(".filter-row button");
    let nombre = 0;

    for (let i = 0; i < albums.length; i++) {
        if (epoque == "tous" || albums[i].classList.contains(epoque)) {
            albums[i].style.display = "block";
            nombre++;
        } else {
            albums[i].style.display = "none";
        }
    }

    // Mettre en jaune le bouton sélectionné.
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("active");
    }
    bouton.classList.add("active");

    // Actualiser le nombre d’albums affichés.
    document.getElementById("compteur").textContent = nombre + " album";

    if (nombre > 1) {
        document.getElementById("compteur").textContent += "s";
    }
}

// Détecter les clics sur les filtres.
let filtres = document.querySelectorAll(".filter-row button");

for (let i = 0; i < filtres.length; i++) {
    filtres[i].addEventListener("click", function () {
        filtrerAlbums(this.value, this);
    });
}

// Ouvrir la fenêtre de l’album.
let boutonsAlbums = document.querySelectorAll("[data-album]");

for (let i = 0; i < boutonsAlbums.length; i++) {
    boutonsAlbums[i].addEventListener("click", function () {
        let album = this.getAttribute("data-album");
        document.getElementById(album).showModal();
    });
}

// Fermer la fenêtre avec la croix.
let boutonsFermer = document.querySelectorAll("dialog .modal-close");

for (let i = 0; i < boutonsFermer.length; i++) {
    boutonsFermer[i].addEventListener("click", function () {
        this.parentElement.close();
    });
}
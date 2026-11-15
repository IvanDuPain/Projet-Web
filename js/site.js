// Menu de navigation sur petit écran (bouton à 3 traits).
let boutonMenu = document.querySelector(".menu-button");
let menu = document.getElementById("menu");

if (boutonMenu && menu) {
    // Ouvrir ou fermer le menu au clic sur le bouton.
    boutonMenu.addEventListener("click", function () {
        menu.classList.toggle("is-open");

        if (menu.classList.contains("is-open")) {
            boutonMenu.setAttribute("aria-expanded", "true");
            boutonMenu.setAttribute("aria-label", "Fermer le menu");
        } else {
            boutonMenu.setAttribute("aria-expanded", "false");
            boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
        }
    });

    // Fermer le menu quand on clique sur un lien.
    let liensMenu = menu.querySelectorAll("a");

    for (let i = 0; i < liensMenu.length; i++) {
        liensMenu[i].addEventListener("click", function () {
            menu.classList.remove("is-open");
            boutonMenu.setAttribute("aria-expanded", "false");
            boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
        });
    }
}

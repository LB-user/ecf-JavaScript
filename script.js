// Liste des variables importantes utilisées dans plusieurs fonctions
let type; // Valeur du select de la dernière requête
let searchValue; // valeur de l'input de la dernière requête
let offset; // Première ligne de la dernière requête
let limit = 100; // Limite de lignes affichable par page (max : 100)

const form = document.querySelector("form");

form.addEventListener("submit", function (ev) { // Evenement de préparation de la requête

    ev.preventDefault();

    const toRemove = document.querySelectorAll(".to-remove");
    const ring = document.querySelector(".ring");
    const select = document.querySelector("#select");
    const inputId = document.querySelector("#input");

    type = select.options[select.selectedIndex].value;
    searchValue = inputId.value
    offset = 0;

    for (i = 0; i < toRemove.length; i++) {

        toRemove[i].remove(toRemove[i])

    }

    const regexI = /[!@#$%^&*(),.?":{}|<>]/g;

    if (regexI.test(searchValue) === false) {

        launch() // script.js
        ring.hidden = false;

    }
    else {

        const div = document.querySelector(".input-search")
        const p = document.createElement("p")
        p.textContent = "Le format de la recherche n'est pas correct"
        p.className = "to-remove"

        div.appendChild(p)

    }


})

function launch() {// Traitement de la requête (élements de navigation)


    uris(function (uri) {

        request(uri, "main", function (response) { // api.js

            createNavigation(response); // nav.js

            createObjectInfosLines(response); //script.js

        });

    })

}

function createObjectInfosLines(response){// Traitement de la requête (récupération des données => stockage par ligne dans un objet newInfos)

    let newNum = offset; //Numéro de ligne

    for (i = 0; i < response.recordings.length; i++) { // Traitement par élements de la réponse

        // Intitialisation des variables importantes
        let line = response.recordings[i];
        let newArtist; // Nom de l'artiste
        let newTitle; // Titre de la musique
        let newAlbum; // Nom de l'album
        let uriC = []; // Tableau des liens pour les covers
        let ratingUri; // Lien pour la note générale
        let newLength; // Durée de la musique
        let newTags = ""; // Genre de la musique

        newNum++;

        // Nom de l'artiste
        if (line["artist-credit"][0].name.length === 1) {

            newArtist = line["artist-credit"][0].name;

        }
        else if (line["artist-credit"][0].name.length > 1) {

            newArtist = line["artist-credit"][line["artist-credit"].length - 1].name;

            for (let j = line["artist-credit"].length - 2; j >= 0; j--) {

                newArtist = newArtist + line["artist-credit"][j].joinphrase + line["artist-credit"][j].name

            }

        }
        else {

            newArtist = "Pas d'artiste défini"

        }

        //Titre de la musique
        newTitle = line.title;

        // Nom de l'album

        if (line["releases"] === undefined) {

            newAlbum = "Pas d'Album défini"
            uriC.push("")

        }
        else {

            newAlbum = line["releases"][0].title;

            //URL pour les covers
            line["releases"].map(uri => uriC.push("https://coverartarchive.org/release/" + uri.id))

        }

        //URL pour les ratings
        ratingUri = "https://musicbrainz.org/ws/2/recording/" + line.id + "?fmt=json&inc=ratings";


        //Durée de la musique

        if (line.length != undefined) {

            tsConvert(line.length, ret => newLength = ret);

        }
        else {

            newLength = "Pas de durée définie"

        }

        // Genre de musique

        if (line["tags"] != undefined) {

            line["tags"].map(genre => newTags = newTags + genre.name + ", ")

            newTags = newTags.split("").slice(0, -2)
            pushPoint = newTags.push(".")
            newTags = newTags.join("")

        }
        else {


            newTags = "Pas de genre défini"


        }

        let newInfos = {

            id: newNum,
            artist: newArtist,
            title: newTitle,
            album: newAlbum,
            genre: newTags,
            length: newLength,
            uri: uriC,
            cover: [],
            ratings: ratingUri


        }

        addList(newInfos); //"liste.js"


    }


}

function tsConvert(milli, callback) { // Converti le Timestamp en mm:ss

    let seconds = Math.floor((milli / 1000) % 60);

    if (seconds < 10) {

        seconds = "0" + seconds

    }

    let minutes = Math.floor((milli / (60 * 1000)) % 60);

    callback(minutes + ":" + seconds)

}
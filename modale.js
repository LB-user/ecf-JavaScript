// DOM de la modale et script drag & drop

function addModale(newInfos) { //Ajoute la modale

    const modale = document.querySelector(".modale");
    const modaleH2 = document.querySelector(".h2-modale")
    const modaleTitle = document.querySelector(".p-title")
    const modaleArtist = document.querySelector(".p-artist")
    const modaleAlbum = document.querySelector(".p-album")
    const modaleGenre = document.querySelector(".p-genre")
    const modaleLength = document.querySelector(".p-length")
    const modaleNote = document.querySelector(".rating-bg")
    const modaleNombreNotes = document.querySelector(".nb-notes")
    const modaleCover = document.querySelector(".cover-list")

    const buttonClose = document.createElement("button")
    buttonClose.className = "li-to-remove button-close"
    buttonClose.textContent = "X"
    buttonClose.addEventListener("click", function () {

        modale.hidden = true;

    })

    modale.appendChild(buttonClose)

    modaleH2.textContent = newInfos.artist + " - " + newInfos.title;
    modaleTitle.textContent = newInfos.title;
    modaleArtist.textContent = newInfos.artist;
    modaleAlbum.textContent = newInfos.album;
    modaleGenre.textContent = newInfos.genre;
    modaleLength.textContent = newInfos.length;

    for (let j = 0; j < newInfos.uri.length; j++) {

        request(newInfos.uri[j], "cover", (responseCover, type) => {

            const li = document.createElement("li")
            li.className = "li-to-remove img-modale"

            modaleCover.appendChild(li)

            switch (type) {

                case "p":

                    const p = document.createElement("p")
                    p.textContent = responseCover;

                    li.appendChild(p)

                case "img":

                    const img = document.createElement("img")
                    img.src = responseCover;

                    li.appendChild(img)

            }

        })

    }

    request(newInfos.ratings, "ratings", responseRatings => {

        if (responseRatings.rating.value) {

            modaleNote.value = responseRatings.rating["value"];

        }
        else {

            modaleNote.value = 0;

        }
        if (responseRatings.rating["votes-count"]) {

            modaleNombreNotes.textContent = responseRatings.rating["votes-count"] + " vote(s)";

        }
        else {

            modaleNombreNotes.textContent = 0 + " vote(s)";

        }

    })

    let ring = document.querySelector(".ring")
    ring.hidden = true;
    modale.hidden = false;

}

// Evenements drag and drop de la modale

let modaleWindow = document.querySelector("#modale");
let modaleChildrens = document.querySelector(".container-modale")

let isMouseDown;
let initX;
let initY;
let height = modaleWindow.offsetHeight;
let width = modaleWindow.offsetWidth;

// Evenement drag de la modale
modaleWindow.addEventListener('mousedown', function (e) {

    isMouseDown = true;
    initX = e.offsetX;
    initY = e.offsetY;

})
// Evenement drag (permet de ne pas déclencher l'évenement si il est initialisé sur un autre élément que le parent ".modale")
modaleChildrens.addEventListener("mousedown", function (e) {

    e.stopPropagation();

})

//Evenement au mouvement permet de déterminer et délimiter la zone de déplacement de la modale
document.addEventListener('mousemove', function (e) {

    if (isMouseDown) {

        let x = e.clientX - initX,
            y = e.clientY - initY;

        if (x < 0) {

            x = 0;

        }

        if (y < 0) {

            y = 0;

        }

        if (window.innerWidth - e.clientX + initX < width) {

            x = window.innerWidth - width;

        }

        if (e.clientY > window.innerHeight - height + initY) {

            y = window.innerHeight - height;

        }

        modaleWindow.style.left = x + 'px';
        modaleWindow.style.top = y + 'px';

    }

})

//Evenement permettant de drop la modale
modaleWindow.addEventListener('mouseup', function () {

    isMouseDown = false;

})
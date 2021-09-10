// Requêtes

function uris(callback) { // Selection uri de la requête
    let uri = 'https://musicbrainz.org/ws/2/recording/?fmt=json&limit=' + limit + '&primarytype:album&notsecondarytype:*&inc=artists+releases+release-groups+artist-credits+genres+tags+media+ratings&offset=' + offset;

    switch (type) {

        case 'everything':

            uri = uri + '&query=recording:"' + encodeURIComponent(searchValue) + '"release:"' + encodeURIComponent(searchValue) + '"artist:"' + encodeURIComponent(searchValue) + '"';
            break;

        case 'artist':

            uri = uri + '&query=artist:"' + encodeURIComponent(searchValue) + '"';
            break;

        case 'title':

            uri = uri + '&query=recording:"' + encodeURIComponent(searchValue) + '"';
            break;

        case 'album':

            uri = uri + '&query=release:"' + encodeURIComponent(searchValue) + '"';
    }

    callback(uri) //api.js

}

function request(uri, requestType, callback) { //Requête AJAX

    const request = new XMLHttpRequest();

    request.open("GET", uri, true);
    request.addEventListener("readystatechange", function () {

        if (request.readyState === XMLHttpRequest.DONE) {

            switch (requestType) {

                case "main":

                    if (request.status < 400) {


                        const response = JSON.parse(request.responseText);

                        let ring = document.querySelector(".ring");

                        ring.hidden = true;

                        if (response.count === 0) {

                            aucunResultats("Aucun résultat. Entrez une nouvelle recherche.")

                        }
                        else {

                            callback(response) //script.js

                        }

                    }
                    else if (request.status === 404) {

                        nbResultats(0)
                        aucunResultats("Aucun résultat.")

                    }
                    else {

                        aucunResultats("Une erreur inconnue est survenue")

                    }
                    break;

                case "cover":

                    if (request.status < 400) {

                        const responseCover = JSON.parse(request.responseText);

                        responseCoverArray = [];

                        for (let i = 0; i < responseCover.images.length; i++) {

                            if (responseCover.images[i].thumbnails.small) {

                                responseCoverArray.push(responseCover.images[i].thumbnails.small)

                            }
                            else {

                                responseCoverArray.push("img/index.png")

                            }

                        }

                        for (let j = 0; j < responseCoverArray.length; j++) {

                            callback(responseCover.images[j].thumbnails.small, "img")

                        }
                    }
                    else if (request.status === 404) {

                        callback("img/index.png", "img")

                    }
                    else {

                        callback("L'image ne s'affiche pas pour des raisons inconnues", "p")

                    }
                    break;

                case "ratings":

                    if (request.status < 400) {

                        const responseRating = JSON.parse(request.responseText);

                        callback(responseRating)

                    }
                    else if (request.status === 404) {

                        callback("Pas de notes définie")

                    }
                    else {

                        callback("Erreur inconnue")

                    }

            }

        }

    });
    
    request.send();

}
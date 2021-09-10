// Navigation: Elements de la <div class="container-search">

function createNavigation(response){
    let num = response.count; // Nombre total de réponses
    //Création de la  section de recherche avancée
    selectLine(num) //dom.js
    nbResultats(num) //dom.js
    addButtons(num) //dom.js
}

function selectLine(num) { //Ajoute l'input de recherche avancée
    // <div class="container-search">
    //     <form class="to-remove">
    //         <label>Entrez le numéro de la ligne :</label>
    //         <input></input>
    //         <button class="to-remove"><span>Rechercher</span></button>
    //     </form>
    // </div>
    const container = document.querySelector(".container-search");

    const form = document.createElement("form")
    form.className = "to-remove";

    const label = document.createElement("label")
    label.textContent = "Entrez le numéro de la ligne :"

    const input = document.createElement("input")

    const btn = document.createElement("button")
    btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        const ring = document.querySelector(".ring");
        const regex = /\d/;
        if (input.value > 0 && regex.test(input.value) && input.value <= num) {
            const toRemove = document.querySelectorAll(".to-remove");
            for (let i = 0; i < toRemove.length; i++) {
                toRemove[i].remove(toRemove[i])
            }
            offset = input.value - 1;
            ring.hidden = false;
            launch()
        }
        else {
            if (!document.querySelector("#text-search")) {
                const p = document.createElement("p")
                p.textContent = "Le format de la recherche n'est pas correct où la ligne n'existe pas !"
                p.className = "to-remove"
                p.id = "text-search"

                form.appendChild(p)
            }
        }
    })

    const span = document.createElement("span")
    span.textContent = "Rechercher";

    container.appendChild(form)
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(btn)
    btn.appendChild(span)
}

function nbResultats(num) { //Ajoute le nombre total de résultats
    // <div class="container-search">
    //     <p class="resultats to-remove">(num + " Résultats")</p>
    // </div>
    const containerSearch = document.querySelector(".container-search");

    const p = document.createElement("p")
    p.className = "resultats to-remove"
    p.textContent = num + " Résultats"

    containerSearch.appendChild(p)
}

function addButtons(num) { // Ajoute les boutons de navigation

    const containerSearch = document.querySelector(".container-search");
    const divBtnsL = document.createElement("div")
    divBtnsL.className = "div-buttons-left to-remove"
    
    const divBtnsR = document.createElement("div")
    divBtnsR.className = "div-buttons-right to-remove"

    containerSearch.appendChild(divBtnsL)
    containerSearch.appendChild(divBtnsR)

    if (offset > 0) {
        addButton(0, "First", "left") //Dom.js
    }
    if (offset >= limit) {
        addButton(offset - limit, "Previous", "left") //Dom.js
    }
    if (offset <= num - limit - 1) {
        addButton(offset + limit, "Next", "right") //Dom.js
    }
    if (offset < num - limit) {
        addButton(num - limit, "Last", "right") //Dom.js
    }
}

function addButton(num, btnName, position) { // Ajoute un bouton de navigation
    // <div class="container-search">
    //     <button class="button-slide"><span>(btnName)</span></button>
    // </div>
    const divBtns = document.querySelector(".div-buttons-" + position);

    let btn = document.createElement("button")
    btn.className = "button-slide";
    btn.addEventListener("click", function () {
        const ring = document.querySelector(".ring");
        ring.hidden = false;
        const toRemove = document.querySelectorAll(".to-remove");
        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].remove(toRemove[i])
        }
        offset = num;
        launch()
    })

    const span = document.createElement("span")
    span.textContent = btnName;

    divBtns.appendChild(btn)
    btn.appendChild(span)
}
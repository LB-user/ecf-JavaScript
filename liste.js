// Liste des résultats

function aucunResultats(text) { //Ajoute un paragraphe (Aucun résultat de la requête principale)

    // <div class="general-list">
    //     <article class="list-item to-remove">
    //         <p>(text)</p>
    //     </article>
    // </div>

    let generalList = document.querySelector(".general-list")

    let article = document.createElement("article")
    article.className = "list-item to-remove"

    let p = document.createElement("p")
    p.textContent = text;

    generalList.appendChild(article)
    article.appendChild(p)


}

function addList(newInfos) {  //Ajoute la liste des résultats de la requête

    // <li class="list-item">
    //     <ul class="list-elements">
    //     </ul>
    // </li>

    const list = document.querySelector(".search-list")

    const li = document.createElement("li");
    li.className = "list-item to-remove";

    const ul = document.createElement("ul");
    ul.className = "list-elements";


    list.appendChild(li);
    li.appendChild(ul);

    addElementList(newInfos.id, ul)
    addElementList(newInfos.artist, ul)
    addElementList(newInfos.title, ul)
    addElementList(newInfos.album, ul)
    addElementListButton(newInfos, ul)

}

function addElementList(newValue, ul) { //Ajoute les éléments de la listes

    // <li class="list-elements-item">
    //     <p class="element-p">

    //     </p>
    // </li>

    const li = document.createElement("li");
    li.className = "list-elements-item";

    const p = document.createElement("p");
    p.className = "element-p";
    p.textContent = newValue;

    ul.appendChild(li)
    li.appendChild(p)

}

function addElementListButton(newInfos, ul) { //Ajoute les boutons(Actions) de la liste

    // <li class="list-item">
    //     <button class="element-btn">+</button>
    // </li>

    const li = document.createElement("li");
    li.className = "list-elements-item";

    const button = document.createElement("button")
    button.className = "element-btn clickable"
    button.addEventListener("click", function () {
        //Ajoute un element recherche en cours dans la modale

        //Controle si la modale à déjà été ouverte(évite le multiclique) où si la modale est fermée
        if(button.className==="element-btn clickable" || document.querySelector(".modale").hidden === true){

            let ring = document.querySelector(".ring")
            ring.hidden = false;

            if(document.querySelector(".unclickable") !== null){

                unclickableButton = document.querySelector(".unclickable")
                unclickableButton.className = "element-btn clickable"

            }
            const toRemoveLi = document.querySelectorAll(".li-to-remove");

            for (let i = 0; i < toRemoveLi.length; i++) {

                toRemoveLi[i].remove(toRemoveLi[i])

            }

            button.className="element-btn unclickable"
            addModale(newInfos) // modale.js

        }

    })

    const img = document.createElement("img")
    img.className = "img-list-btn"
    img.src = "img/plus.png";

    ul.appendChild(li)
    li.appendChild(button)
    button.appendChild(img)
}
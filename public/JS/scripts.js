
var storage = document.getElementById('shoes');
var add = [];
var f = document.getElementById("filter"); 
var filter = [];

document.addEventListener('DOMContentLoaded', listar());

function listar() {
    fetch('./data')
        .then(res => res.json())
        .then(shoes => {
            storage.innerText = '';
            add = []
            shoes.map(pair => {
                var pairName = pair.nome;
                var shoeRef = "[" + pairName.slice(0, pairName.indexOf(' ',0))+ "]";
                pairName = pairName.substring(8,pairName.lenght);
                var shoeName = pairName.replace(".jpeg", '');
                var onde = pair.caminho;
                var shoeCaminho = onde.replace("public", '');

                add.push({
                    material    : shoeName,
                    referencia  : shoeRef,
                    caminho     : onde
                });
                storage.innerHTML += `
                <div class="cardItem">
                    <img class="image" src="${shoeCaminho}">
                    <p id="shoeName">${shoeName}</p>
                    <p id="shoeRef">${shoeRef}</p>
                </div>`

            })
    })
}

function search(key) {
    f.value = ''
    filter = [];
    if(key.length>=3) {
        // storage.innerText = '';
        add.map((i)=> {
            if(i.material.indexOf(key)>-1 || i.referencia.indexOf(key)>-1) {
            filter.push(i);
        }})
        if(filter.length>0) {
            storage.innerText = ''
            filter.map(doc => {
                storage.innerHTML += `
                    <div class="cardItem">
                        <img class="image" src="${doc.caminho.substring(doc.caminho.indexOf("c")+1,doc.caminho.length)}">
                        <p>${doc.material}</p>
                        <p>${doc.referencia}</p>
                    </div>`
            })
        }
    } else {
        alert("Insira pelo menos 3 caracteres!");
    }
}
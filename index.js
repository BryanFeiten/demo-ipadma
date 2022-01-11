const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

var raiz = "/assets";
var data = [];
var aux = 0

function listarArquivos(base) {
    let pastas = fs.readdirSync(base);

    pastas.map((p)=> {
        var caminho = path.join(base, p);
        var stats = fs.lstatSync(caminho);

        if(stats.isDirectory()) {
            listarArquivos(caminho);
        } else {
            data[aux] = {
                nome: path.basename(caminho),
                caminho: caminho,
                tamanho: stats.size + 'Bytes',
                tipo: path.extname(caminho)
            };
            aux += 1;
        }
    })

}

app.use(express.static('./public')); 

app.get('/data', cors(), (req, res) => {
    res.send(data);
})

app.listen(port, () => console.log(`app running on port ${port}`))

listarArquivos("./public" + raiz);
console.log(data);
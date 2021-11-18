const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express()
const port = 5000;

var raiz = "/assets";
var data = [];
var aux = 0

function listarArquivos(base) {
    let pastas = fs.readdirSync(base);

    for(p in pastas) {
        var caminho = path.join(base, pastas[p]);
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
    }
}

app.use(cors())

//rota das funções
app.use('/func',(req,res)=>{
    //pega o valor por meio de um query ex: ?variavel=string
    if(req.query.func ===  'update_list'){
        //atualizar a lista de arquivos
        listarArquivos("./public" + raiz);
        console.log('updated')
        res.send('updated')
    }
})

//correção para o pkg do node funcionar corretamente
app.use(express.static('./public')); 


app.get('/data', (req, res) => {
    res.send(data);
})


app.listen(port, () => console.log(`app running on port ${port}`))

listarArquivos("./public" + raiz);
console.log(data);
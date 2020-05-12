class consultasJQuery{
    constructor(){
        this.opts = { crossDomain: true }
    }
    
    onPeopleResponse = characterData => console.log(`Hola, yo soy ${characterData.name}`)

    obtenerPersonaje(id){
        return new Promise((resolve, reject) => {
            const url = `${API_URL}${PEOPLE_URL.replace(':id', id)}`
            $.get(url, this.opts, data => {
                resolve(data)
            }).fail(()=> reject(id))
        })
    }
}

class consultasXMLHttpRequest{
    constructor(){
        this._httpRequest = new XMLHttpRequest();
    }

    consultar(url){
        return new Promise((resolve, reject)=>{
            this._httpRequest.open('GET', url, true);

            this._httpRequest.onreadystatechange = (datos) => {
                if(this._httpRequest.readyState === 4 && this._httpRequest.status === 200){
                    var characterData = JSON.parse(this._httpRequest.responseText);
                    resolve(characterData);
                } else if (this._httpRequest.status !== 200){
                    reject('No se pudo realizar la consulta')
                }
            }
            this._httpRequest.send(null)
        })
    }
}

const API_URL = 'https://swapi.dev/api/'
const PEOPLE_URL = 'people/:id'

var jq = new consultasJQuery();
//Promesas en paralelo
async function obtenerPersonajes(){
    var ids = [1,2,3,4,5,6]
    var promesas = ids.map(id => jq.obtenerPersonaje(id))
    try {
        var personajes = await Promise.all(promesas)
        console.log(personajes)
    } catch (id) {
        console.log(`No se puede realizar la consulta del id ${id}`)
    }
}

obtenerPersonajes()
/**
 *            /---> fulfilled (resolve) ---> .then(val => {...})
 *           /
 *   pending
 *           \
 *            \---> rejected (reject) ---> .catch(err => {..})
 */

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

//Multiples Request
var jq = new consultasJQuery();
var http = new consultasXMLHttpRequest();

http.consultar(`${API_URL}${PEOPLE_URL.replace(':id', 1)}`).then(personaje => {
    console.log(`El personaje 1 es ${personaje.name}`)
}).catch(error => console.log(error))


jq.obtenerPersonaje(2).then(personaje => {
    console.log(`El personaje 2 es ${personaje.name}`)
}).catch( id => console.log(`No se puede realizar la consulta del id ${id}`))

//Encadenar Promesas
jq.obtenerPersonaje(3).then(personaje => {
    console.log(`El personaje 3 es ${personaje.name}`)
    return jq.obtenerPersonaje(4)
})
.then(personaje => {
    console.log(`El personaje 4 es ${personaje.name}`)
    return jq.obtenerPersonaje(5)
})
.then(personaje => {
    console.log(`El personaje 5 es ${personaje.name}`)
})
.catch( id => console.log(`No se puede realizar la consulta del id ${id}`)) //Ya que es la misma clase de promesa, el catch se comparte

//Promesas en paralelo
var ids = [1,2,3,4,5,6]
var promesas = ids.map(id => jq.obtenerPersonaje(id))
Promise.all(promesas).then(personajes => console.log(personajes)).catch(id => console.log(`No se puede realizar la consulta del id ${id}`))
class consultasJQuery{
    constructor(){
        this.opts = { crossDomain: true }
    }
    
    onPeopleResponse = characterData => console.log(`Hola, yo soy ${characterData.name}`)

    obtenerPersonaje(id){
        const url = `${API_URL}${PEOPLE_URL.replace(':id', id)}`
        $.get(url, this.opts, this.onPeopleResponse).fail(()=>console.log(`Error. No se pudo obtener el personaje ${id}`))
    }
}

class consultasXMLHttpRequest{
    constructor(){
        //Se crea un objeto de la clase XMLHttpRequest
        this._httpRequest = new XMLHttpRequest();
    }

    consultar(url){
        /**
         ** Se establece conexion con el sitio al cual se va a hacer la peticion
         ** GET: es el metodo para hacer la consulta
         ** url: la URL a la cual se consultan los datos
         ** true: se indica que la peticion sera asincrona
         */
        this._httpRequest.open('GET', url, true);

        // *Se especifica la funcion(callback) que realizara despues de ejecutar la peticion
        this._httpRequest.onreadystatechange = (datos) => {
            // *Si la operacion fue completado (readyState = 4) y el status fue exitoso (status = 200)
            if(this._httpRequest.readyState === 4 && this._httpRequest.status === 200){
                // * Ya que el _httpRequest.responseText retorna un string, se debe pasar a objeto (Solo aplica para string con formato JSON)
                var characterData = JSON.parse(this._httpRequest.responseText);
                console.log(`Hola, yo soy ${characterData.name}`)
            } else if (this._httpRequest.status !== 200){
                console.log("No se pudo realizar la consulta")
            }
        }

        // *Se envia la solicitud
        this._httpRequest.send(null)
    }
}

const API_URL = 'https://swapi.dev/api/'
const PEOPLE_URL = 'people/:id'

//Multiples Request
var jq = new consultasJQuery();
var http = new consultasXMLHttpRequest();

http.consultar(`${API_URL}${PEOPLE_URL.replace(':id', 1)}`)
jq.obtenerPersonaje(2)
jq.obtenerPersonaje(3)
jq.obtenerPersonaje(4)
jq.obtenerPersonaje(5)
jq.obtenerPersonaje(6)
jq.obtenerPersonaje(7)

//*Para llamarlos en serie, hay que hacer un callback que llame a la siguiente peticion 
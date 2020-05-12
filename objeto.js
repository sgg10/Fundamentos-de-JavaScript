var persona = {
    nombre: 'Pepito',
    apellido: 'Perez',
    edad: 15
}

/*
    saludar(persona){
        console.log(persona.nombre.toUpperCase())
    }
*/

saludar({nombre}){
    console.log(nombre.toUpperCase())
}

modificar(obj){
    return{
        ...obj,
        edad: 15
    }
    /**
     *  ...obj -> Copia/desgloza todo lo contenido en el objeto
     * edad: 15 -> Modifica/Agrega la llave edad
     */
}
class Persona{
    constructor(nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
    }

    saludar(){
        console.log(`Hola ${this.nombre} ${this.apellido}`)
    }
}

class Desarrollador extends Persona{
    constructor(nombre, apellido){
        super(nombre, apellido)
    }

    saludar(){
        console.log(`Hola ${this.nombre} ${this.apellido} y eres un desarrollador`)
    }
}
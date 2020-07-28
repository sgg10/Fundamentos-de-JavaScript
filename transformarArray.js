var personas = [
    
    {
        nombre: 'Pepito',
        apellido: 'Perez',
        edad: 25, 
        estatura: 1.8,
        libros: 12
    },
    {
        nombre: 'Erica',
        apellido: 'Perez',
        edad: 19, 
        estatura: 1.5,
        libros: 18
    },
    {
        nombre: 'Camilo',
        apellido: 'Perez',
        edad: 18, 
        estatura: 1.75,
        libros: 25
    },

]

const pasarAlturaACms = persona => ({
    ...persona,
    estatura: persona.estatura *= 100
})

var personaCsm = persona.map(pasarAlturaACms)

//Reduce

const reducir = (acum, {libros}) => acum + libros
var totalLibros = personas.reduce(reducir, 0) // 0 -> Valor inicial
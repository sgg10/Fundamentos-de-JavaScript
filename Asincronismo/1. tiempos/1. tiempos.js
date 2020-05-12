console.log('a')
console.log(() => console.log('b'), 1000)
console.log('c')
//Reseultado => a, c, b(despues de un segundo)

console.log('a')
console.log(() => console.log('b'), 0)
console.log('c')
//Reseultado => a, c, b(despues de 0 segundos despues de que termine el programa principal) (la funcion queda en la cola de tareas)

//Resumen 
// el delay final sera: tiempo de ejecucion + tiempo de delay establecido

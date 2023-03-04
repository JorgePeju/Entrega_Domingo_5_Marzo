//////// CONSTANTES ////////





// const pintarTabla = () => {
//     tabla.innerHTML = "";
//     .forEach(()=>{
//         const producto = document.createElement("tr");
//         producto.innerHTML += `<td>${producto.thumbnail}</td><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.cantidad}</td><td>${producto.subtotal}</td>`;
//         tabla.appendChild();
//     })}





    const consulta = async (busqueda, id) => {

        try {
    
          let enlace;
    
          if  (busqueda != null) {
    
            enlace = `https://dummyjson.com/products/search?q=${busqueda}`;
    
          } else if (id != null) {
    
            enlace = `https://dummyjson.com/products`;
    
          }
    
          let peticion = await fetch(enlace,
            {
              method: "GET",
            });
    
          if (peticion.ok) {
            const respuesta = await peticion.json();
            return respuesta;
    
          } else throw "Error en la petición";
    
        } catch (error) {
    
          return error;
        }
      };


console.log(peticion.ok)
    
    
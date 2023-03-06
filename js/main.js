document.addEventListener("DOMContentLoaded", () => {

  //            VARIABLES  - CONSTANTES           //

  const arrayProductosSeleccionados = JSON.parse(localStorage.getItem('productos')) || [];

  const urlIndex = "index.html"
  const urlCarrito = "carritoCompra.HTML"

  const estrellas = ["material_practica-carrito-compra\star1.png" , "material_practica-carrito-compra\star2.png"];

  const divIndex = document.querySelector("#productos");
  const divCesta = document.querySelector("#tablaCarrito");



 //                  EVENTOS                      //

 document.addEventListener('click', (ev) => {
                          // quizá y probablemente {target}

  // cambiar de index a carrito


  // cambiar de carrito a Index


  // actualizar carrito quizá dos


  // 


  const pintarEstrellitas = () => {

  };

  const setLocal = () => {

    localStorage.setItem('productos', JSON.stringify(arrayProductosSeleccionados));

};



const getLocal = () => {

    return JSON.parse(localStorage.getItem('productos')) || [];

}; 




 })

  const consultarDatos = async (id) => {
    let enlace;
    if (id) {
      enlace = `https://dummyjson.com/products/${id}`
    } else {
      enlace = 'https://dummyjson.com/products/'
    }


    try {
      let solicitud = await fetch(enlace);
      if (solicitud) {
        let peticion = await solicitud.json()
        return peticion
      } else {
        throw ({
          ok: false,
          mensaje: 'No pueden obtenerse los datos'
        })
      }
    } catch (error) {
      return error
    }
  }



  const init = async () => {

    let html = location.search
    
    if (html == urlIndex) {
       // funcion pintar index
       // funcion pintar carrito
    };

    if (html == urlCarrito) {
       // obtener URL
      // pintar carrito
    }
       
    
}
init();





});
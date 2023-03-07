document.addEventListener('DOMContentLoaded', () => {


  //              VARIABLES            //


  const arrayProductosSeleccionados = JSON.parse(localStorage.getItem('productos')) || [];
  const divIndex = document.querySelector('#productos');
  const pintarTablaCarrito = document.querySelector('#tablaCarrito');
  




  //                EVENTOS               //

  document.addEventListener('click', ({target}) => {

      if(target.matches('#comprar')){
          location.href = 'carritoCompra.html';
      };

      // if(target.matches('#volver')){ // cuando cree el boton volver
      //     location.href = 'index.html';
      // };

      if(target.matches('#carrito')){
          tablaCarrito.classList.toggle('hidden')
      };


  });



  //                FUNCIONES                     //

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



  const pintarEstrellitas = () => {

  

  };



  



  const setLocal = () => {

      localStorage.setItem('productos', JSON.stringify(arrayProductosSeleccionados));

  }; 



  const getLocal = () => {

      return JSON.parse(localStorage.getItem('productos')) || [];

  };



  const almacenarDatos = async (id) => {   // revisar

      const {solicitud} = await consultarDatos();

      const {products} = solicitud;

      let producto = products.find((item) => item.id == id);

      if(arrayProductosSeleccionados.find((item) => item == producto)){


      } else {
          
          let objProductosTabla = {
              id: producto.id,
              foto: producto.thumbnail,
              nombre: producto.title,
              precio: producto.price,
              rating: producto.rating,
              cantidad: 1,
              subtotal: producto.price
          }
          
          arrayProductosSeleccionados.push(objProductosTabla);

          setLocal();

          pintarTabla(id);

      }

  }; 

  
  const pintarIndex = async () => {
    const {ok, solicitud} = await consultarDatos();
    const {products} = solicitud;
  
    if (ok) {
      let cards = '';
  
      products.forEach((item) => {
        const imgEstrellas = pintarEstrellas(item.rating);
  
        const cardHTML = `
          <article class="grid-item-cards">
            <img src="${item.images[0]}">
            <h3>${item.title}</h3>
            <p>Precio: ${item.price.toLocaleString('de-DE')} €</p>
            ${imgEstrellas}
            <button class="card-btn" data-id="${item.id}">Añadir al carrito</button>
          </article>
        `;
  
        cards += cardHTML;
      });
  
      divIndex.innerHTML = cards;
    }
  };


  const pintarTabla = (id) => {
    pintarTablaCarrito.innerHTML = '';
  
    const productos = getLocal();
    const producto = productos.find((item) => item.id == id);
  
    if (producto) {
      console.log('Producto encontrado. ');
    } else {
      let tablaHTML = '';
  
      productos.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
  
        const fila = `
          <tr>
            <td><img src="${item.foto}"></td>
            <td>${item.nombre}</td>
            <td>${item.precio.toLocaleString('de-DE')} €</td>
            <td><i class="fa-sharp fa-solid fa-circle-minus"></i></td>
            <td>${item.cantidad}</td>
            <td><i class="fa-sharp fa-solid fa-circle-plus"></i></td>
            <td>${subtotal.toLocaleString('de-DE')} €</td>
            <td><i class="fa-sharp fa-solid fa-circle-xmark" id="xmark" data-id="${item.id}"></i></td>
          </tr>
        `;
  
        tablaHTML += fila;
      });
  
      pintarTablaCarrito.innerHTML = tablaHTML;
    }
  };



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
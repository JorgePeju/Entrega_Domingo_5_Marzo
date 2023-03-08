document.addEventListener("DOMContentLoaded", () => {
  //              VARIABLES                 //


  const divCard = document.querySelector("#card");
  const divTabla = document.querySelector("#tabla");
  const toggle = document.querySelector(".toggle");
  const fragment = document.createDocumentFragment();
  const totalCarrito = document.getElementById("totalcarrito");


  const arrayProductosSeleccionados = JSON.parse(localStorage.getItem("productos")) || [];


  //                   EVENTOS                  //

  document.addEventListener("click", ({ target }) => {

    if (target.matches(".addBtn")) {
      let id = target.id;
      buscarProducto(id);
      pintarTabla()
    }

    if (target.matches(".comprar")) {
      location.href = "carritoCompra.html";
    }

    if (target.matches("#volver")) {
      location.href = "index.html";
    }

    if (target.matches(".carrito i")) {
      toggle.classList.toggle("ocultar")
    }

    if (target.matches(".vaciar")) {
      arrayProductosSeleccionados.length = 0;
      localStorage.removeItem("productos");
      totalCarrito.textContent = arrayProductosSeleccionados.length;
      pintarTabla();
    }
    
  });


  //                       FUNCIONES                   //

  const obtenerDatos = async () => {
    try {
      let ruta = `https://dummyjson.com/products/`;

      let peticion = await fetch(ruta, {
        method: "GET",
      });

      if (peticion.ok) {
        const respuesta = await peticion.json();

        return respuesta;

      } else throw "Error en la consulta";

    } catch (error) {

      return error;
    }
  };

  const setLocal = () => {
    localStorage.setItem("productos", JSON.stringify(arrayProductosSeleccionados));
  };
  const getLocal = () => {
    return arrayProductosSeleccionados;
  };


  const pintarIndex = async () => {
    let objProductos = await obtenerDatos();
    const arrayProductos = objProductos.products;

    innerHTML = "";

    arrayProductos.forEach(({ title, id, images,estrellita }) => {
      const divCardIndex = document.createElement("DIV");
      divCardIndex.classList.add("cardIndex");
      divCardIndex.innerHTML += `
          <div><img src="${images[0]}" class="card-img"></div>
          <h2 class="card-title">${title}</h2> 
          <button class="addBtn" id="${id}">Añadir</button>`;
          // Estrellitas(estrellita)
      fragment.append(divCardIndex); // revisar el H del titulo
    });
    divCard.append(fragment);
  };


  const pintarTabla = async () => {
    divTabla.innerHTML = "";
    const arrayProductosTabla = getLocal();
    let tablaHTML = "";
    arrayProductosTabla.forEach(({ titulo, precio, thumbnail, cantidad, subtotal }) => {
      tablaHTML += `<tr>
          <td class=""><div><img src="${thumbnail}" class="thumbnail"></div></td>
          <td>${titulo}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>${subtotal}</td>
        </tr>`;
    });
    let comprarHTML = '<button class="comprar">Comprar</button>';
    let vaciarHTML = '<button class="vaciar">Vaciar</button>';
    tablaHTML += `<tr>
        <td colspan="4"></td>
        <td>${comprarHTML} ${vaciarHTML}</td>
      </tr>`;
    divTabla.innerHTML = tablaHTML;
  };

  const buscarProducto = async (id) => {
    const { products } = await obtenerDatos();
    const producto = products.find((item) => item.id == id)


    let cantidad = 1;
  
    let subtotal = cantidad * producto.price;

    if (producto) {
      const productoExiste = arrayProductosSeleccionados.find((item) => item.id == id)

      if (productoExiste) {

        productoExiste.cantidad = productoExiste.cantidad + 1;
        productoExiste.subtotal = productoExiste.cantidad * productoExiste.subtotal;

      } else {

        let objNuevo = {
          id: producto.id,
          titulo: producto.title,
          cantidad: cantidad,
          precio: producto.price,
          subtotal: subtotal,
          thumbnail: producto.thumbnail,
          estrellita:producto.rating,
        }

        arrayProductosSeleccionados.push(objNuevo);
      }
      totalCarrito.textContent = arrayProductosSeleccionados.length;
    }
    setLocal();

  };

  // const Estrellitas = () => {


  // }


  const init = () => {

    const url = location.toString(); // .href -> escritura/lectura

    if (url.includes("carritoCompra")) {
      pintarTabla();
      getLocal();
    } else {
      pintarIndex();
      pintarTabla();
    }
  }

  init()

});
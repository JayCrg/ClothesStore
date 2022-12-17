$(document).ready(() => {
  let modelo = new Modelo();
  let vista = new Vista();
  if (localStorage.getItem("carrito") != null)
    modelo.loadCarrito()
  if (localStorage.getItem('preferencias') != null) {
    modelo.loadPreferencias()
    vista.numeroDeObjetosEnCarrito(modelo.getCarrito());
    if (modelo.getCarrito() != '')
      vista.cambiarVisibilidadIconoTienda();
  }
  vista.iconoTiendaBota();
  vista.marcarSeccion();
  asignarBotones(vista, modelo);
  desplegarMenu(modelo, vista);
});


function asignarBotones(vista, modelo) {
  var promesa = null;
  $("#hombre").click(function () {
    vista.mostrarCarga()
    promesa = modelo.getHombres(modelo.getOrden());
    desplegarProductos(vista, modelo, $(this), promesa);
  });
  $("#mujer").click(function () {
    vista.mostrarCarga()
    promesa = modelo.getMujeres(modelo.getOrden());
    desplegarProductos(vista, modelo, $(this), promesa);

  });
  $("#electro").click(function () {
    vista.mostrarCarga()
    promesa = modelo.getElectro(modelo.getOrden());
    desplegarProductos(vista, modelo, $(this), promesa);

  });
  $("#joyeria").click(function () {
    vista.mostrarCarga()
    promesa = modelo.getJoyas(modelo.getOrden());
    desplegarProductos(vista, modelo, $(this), promesa);
  });

  $(".logo").click(function () {
    $("main").empty();
    desplegarMenu(modelo, vista);
  });

  $("li[title=carrito]").click(function () {
    $("main").empty();
    desplegarCarrito(modelo, vista);
  });
  $('#inicio').click(function () {
    $("main").empty();
    vista.vistaFormulario();
    $('.inputs.login button').click(function () {
      modelo.setUsuario($('.inputs.login input[type="password"]').val());
      promesa = modelo.signUp();
      promesa.then(res=>res.json()).then(json=>{
        if(json.id == 1 || json.id == 11)
          vista.mostarMensajeBienvenida()
        else
        vista.mostrarMensajeError(json.message)
      })
    });
    $('.inputs.sign button').click(function () {});
  });

}

function desplegarMenu(modelo, vista) {
  $("main").attr("class", "");
  vista.vistaMenu();
  $('#SeeProducts').click(function () {
    vista.mostrarCarga()
    promesa = modelo.getProductos(modelo.getOrden());
    $("main").empty();
    promesa.then(res => res.json()).then(json => {
      vista.ocultarCarga();
      vista.vistaProductos(json, 'SeeProducts', modelo.getOrden());
      interaccionProductos(modelo, vista, promesa);
    });
  });
}

function desplegarProductos(vista, modelo,  boton, promesa,) {
  let id
  if(typeof boton == 'string')
    id = boton;
  else
    id = boton.attr("id");
  $("main").empty();
  promesa.then(res => res.json()).then(json => {
    vista.ocultarCarga()
    vista.vistaProductos(json, id, modelo.getOrden());
    interaccionProductos(modelo, vista, promesa);
    reordenar(modelo, vista);
  });
}

function interaccionProductos(modelo, vista, promesa) {
  $('.producto').click(function () { ///vamos al detalle del producto
    id = $(this).attr("id");
    promesa = modelo.getProducto(id);
    $("main").empty();
    promesa.then(res => res.json()).then(json => {
      vista.vistaDetalle(json);
      $('.textoProducto button').click(function () {
        let talla = $('.textoProducto select').val();
        modelo.addCarrito(json.id, json.title, json.price, json.image, talla);
        modelo.saveCarrito();
        if ($('.cantidadProductos').text() == '' || $('.cantidadProductos').text() == '0')
          vista.cambiarVisibilidadIconoTienda();
        vista.numeroDeObjetosEnCarrito(modelo.getCarrito());
      });
    });
  });
}

function desplegarCarrito(modelo, vista) {
  if (modelo.getCarrito() == '') {
    vista.vistaCarritoVacio();
  } else {
    vista.vistaCarrito(modelo);
    $('.botonCompra').click(function () {
      modelo.comprarCarrito();
      $("main").empty();
      desplegarCarrito(modelo, vista);
    });
    $('.eliminar').click(function () {
      duplaAux = ($(this).parent().attr("id"));
      dupla = duplaAux.split("-"); //array con  id y 1 talla
      modelo.deleteFromCarrito(dupla[0], dupla[1]);
      vista.borrarPorId(dupla[0], dupla[1]);
      vista.numeroDeObjetosEnCarrito(modelo.getCarrito());
      if (modelo.getCarrito() == '') {
        $("main").empty();
        vista.vistaCarritoVacio();
        vista.cambiarVisibilidadIconoTienda();
      }
      modelo.saveCarrito();
    });
    $('.restar').click(function () {
      duplaAux = ($(this).parent().parent().parent().attr("id"));
      dupla = duplaAux.split("-"); //array con id y talla
      modelo.restarUnidad(dupla[0], dupla[1]);
      vista.numeroDeObjetosEnCarrito(modelo.getCarrito());
      vista.vistaCarrito(modelo);
      $('main').empty();
      desplegarCarrito(modelo,vista);
      if (modelo.getCarrito() == '') {
        $("main").empty();
        vista.vistaCarritoVacio();
        vista.cambiarVisibilidadIconoTienda();
      }
      modelo.saveCarrito();
    });
    $('.sumar').click(function () {
      duplaAux = ($(this).parent().parent().parent().attr("id"));
      dupla = duplaAux.split("-"); //array con id y talla
      modelo.sumarUnidad(dupla[0], dupla[1]);
      vista.numeroDeObjetosEnCarrito(modelo.getCarrito());
      vista.vistaCarrito(modelo);
      $('main').empty();
      desplegarCarrito(modelo,vista);
      if (modelo.getCarrito() == '') {
        $("main").empty();
        vista.vistaCarritoVacio();
        vista.cambiarVisibilidadIconoTienda();
      }
      modelo.saveCarrito();
    });
  }
}

function reordenar(modelo, vista){
  $('#orden').change(function () {
    modelo.setOrden($(this).val());
    modelo.savePreferencias();
    vista.mostrarCarga()
    if($('main').attr('id') == 'prHombre'){
      vista.mostrarCarga()
      promesa = modelo.getHombres(modelo.getOrden());
      $("main").empty();
      desplegarProductos(vista, modelo, 'hombre', promesa);
    }
    if($('main').attr('id') == 'prMujer'){
      vista.mostrarCarga()
      promesa = modelo.getMujeres(modelo.getOrden());
      $("main").empty();
      desplegarProductos(vista, modelo, 'mujer', promesa);
    }
    if($('main').attr('id') == 'prElectro'){
      vista.mostrarCarga()
      promesa = modelo.getMujeres(modelo.getOrden());
      $("main").empty();
      desplegarProductos(vista, modelo, 'electro', promesa);
    }
    if($('main').attr('id') == 'prJoyeria'){
      vista.mostrarCarga()
      promesa = modelo.getMujeres(modelo.getOrden());
      $("main").empty();
      desplegarProductos(vista, modelo, 'joyeria', promesa);
    }
    if($('main').attr('id') == 'prGeneral'){
      vista.mostrarCarga()
      promesa = modelo.getProductos(modelo.getOrden());
      $("main").empty();
      desplegarProductos(vista, modelo, 'SeeProducts', promesa);
    }

  });
}










class Vista {
  constructor() {
    this.main = $("main")
    this.header = $("header")
    this.footer = $("footer")

    this.ropa1 = 'https://imgs.search.brave.com/E606hkcPegU9K9vWEDUD7TE1IXnTeheLEgfMfCwLUWc/rs:fit:600:883:1/g:ce/aHR0cDovLzMuYnAu/YmxvZ3Nwb3QuY29t/Ly1xRXJJTHNYSVEy/US9Ud2lxNURWaEhz/SS9BQUFBQUFBQUJG/SS9hb2xJcnVWUzhu/MC9zMTYwMC9yb3Bh/LWRlLWludmllcm5v/LWEtbGEtbW9kYS1w/YXJhLW11amVyLmpw/Zw';
    this.ropa2 = 'https://imgs.search.brave.com/rEB50dvqGp6nHDhyGJaP5rPSZPXiaMAINwKmaHuMKkM/rs:fit:387:581:1/g:ce/aHR0cDovL21pc2lt/YWdlbmVzZGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzA0L2JsdXNhcy1k/ZS1tb2RhLTMuanBn';
    this.ropa3 = 'https://imgs.search.brave.com/5C-7rJ0jZhT7c51V4NzSl3Kf658bHmh1bfohjkUaSAw/rs:fit:682:1024:1/g:ce/aHR0cDovL2JsdWVi/b3V0aXF1ZWNvbG9t/YmlhLmZpbGVzLndv/cmRwcmVzcy5jb20v/MjAxMi8wNi9yb3Bh/LWp1dmVuaWwtaG9t/YnJlLWRpZXNlbC02/ODJ4MTAyNC5qcGc';
    this.imgHero = 'https://imgs.search.brave.com/GpRAuqJ8PZcKvurK99AFxw1rY0zOLcBrPUl_vIY17ZI/rs:fit:1038:398:1/g:ce/aHR0cDovL3d3dy5w/cm90b2NvbG8ub3Jn/L2V4dGZpbGVzL2kt/MTAzNDMtY0cuMTUx/NjAuMS5qcGcucGFn/ZXNwZWVkLmNlLlpI/S0t4eW9KVE4uanBn';
    this.imgEslogan = "https://imgs.search.brave.com/S2_zzqvj7WXxUw8Oi2jkGdPi5tZUbS6HjYXa9NmYMb8/rs:fit:790:790:1/g:ce/aHR0cDovL3d3dy5j/dXR5cGFzdGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA0L21heGlfZW50/cmFkYS5qcGc";
    this.carr1 = './images/bolso.webp'
    this.carr2 = './images/chicas.webp'
    this.carr3 = './images/collar.webp'
    this.carr4 = './images/ropa.webp'
    this.carruselfotos = [this.carr1, this.carr2, this.carr3, this.carr4];

    this.pattern = "[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`{|}~+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2,3})?";
  }
  iconoTiendaBota() {
    $(".log-shop li").hover(function () {
      $(this).children("i").addClass('fa-bounce')
    }, function () {
      $(this).children("i").removeClass('fa-bounce')
    }
    );
  }
  numeroDeObjetosEnCarrito(carrito) {
    //cambiar el contenido del span por el numero de productos en el carrito
    $(".log-shop span").text(carrito.length);
  }
  cambiarVisibilidadIconoTienda() {
    $(".cantidadProductos").toggleClass('llena');
  }
  mostrarCarga() {
    $(".container > aside").attr('class', 'carga');
    $("body").attr('class', 'carga');
  }
  ocultarCarga() {
    $(".container > aside").attr('class', 'oculta');
    $("body").attr('class', 'oculta');
  }
  marcarSeccion() {
    $(".search ul li").click(function () {
      $(`.search *`).removeClass('marcada');
      $(this).addClass('marcada');
    })
    $('.logo').click(function () {
      $(`.search *`).removeClass('marcada');
    })
    $('.log-shop').click(function () {
      $(`.search *`).removeClass('marcada');
    });
  }
  vistaMenu() {
    this.main.append(`<section id="hero"></section>`);
    this.main.append(`<section id="eslogan"></section>`);
    this.main.append(`<section id="carrusel"></section>`);
    this.main.append(`<section id="siguenos"></section>`);
    this.main.append(`<section id="contacto"></section>`);

    $("#hero").append(`<img src="${this.imgHero}" alt="hero">`);

    $("#eslogan").append(`<div class='imgEslogan'></div>`);
    $("#eslogan").append(`<div class='textoEslogan'></div>`);
    $(".imgEslogan").append(`<img src="${this.imgEslogan}" alt="Gente comprando"></img>`);
    $(".textoEslogan").append(`<h1>¡Welcome to your <span class='color'>favourite Store</span>!</h1>`);
    $(".textoEslogan").append(`<p>Here you will everything you need for your home</p>`);
    $(".textoEslogan").append(`<p>¡And much more!</p>`);
    $(".textoEslogan").append(`<button id='SeeProducts'>See products</button>`);

    $("#carrusel").append(`<div id='imagenesCarrusel'></div>`);
    $("#imagenesCarrusel").append(`<img src="${this.carr1}"></img>`);
    this.hammertimeCarrusel = new Hammer(this.main.children("#carrusel").children("#imagenesCarrusel").children("img")[0]);
    this.rotarCarrusel(this.carruselfotos);

    $("#siguenos").append(`<div class='imageneRedes ropa'></div>`);
    $("#siguenos").append(`<div class='imageneRedes ropa2'></div>`);
    $("#siguenos").append(`<div class='imageneRedes ropa3'></div>`);
    $("#siguenos").append(`<div class='textoRedes'></div>`);
    $('.imageneRedes.ropa').append(`<img src="${this.ropa1}" alt="Modelo Femenina"></img>`);
    $('.imageneRedes.ropa2').append(`<img src="${this.ropa2}" alt="Modelo Femenina"></img>`);
    $('.imageneRedes.ropa3').append(`<img src="${this.ropa3}" alt="Modelo Masculino"></img>`);
    $(".textoRedes").append(`<h1>Follow us in our <span class='color'>socials</span></h1>`);
    $(".textoRedes").append(`<p>And tune in with all the news!</p>`);
    $(".textoRedes").append(`<span class='iconos'></span>`);
    $(".textoRedes .iconos").append(`<a href="https://twitter.com/" target="_blank" title='Twitter'><i class="fa-brands fa-twitter"></i></a>`);
    $(".textoRedes .iconos").append(`<a href="https://www.instagram.com/" target="_blank" title='Instagram'><i class="fa-brands fa-instagram"></i></a>`);
    $(".textoRedes .iconos").append(`<a href="https://www.facebook.com/" target="_blank" title='Facebook'><i class="fa-brands fa-facebook"></i></a>`);

    $("#contacto").append(`<h1><span class='color'>Contact us!</span></h1>`);
    $("#contacto").append(`<p>Send your email to contact you</p>`);
    $("#contacto").append(`<input type="email" placeholder="Email" pattern="${this.pattern}">`);
    $("#contacto").append(`<button>Send</button>`);
  }

  vistaProductos(json, categoria, orden = 'asc') {
    $('main').attr('class', 'productos');
    let titulo;
    if (categoria == 'SeeProducts'){
      titulo = 'Our <span class="color">Products</span>';
      $('main').attr('id', 'prGeneral');
    }
    else if (categoria == 'hombre'){
      titulo = 'Clothing for <span class="color">men</span>';
      $('main').attr('id', 'prHombre');
    }
    else if (categoria == 'mujer'){
      titulo = 'Clothing for <span class="color">women</span>';
      $('main').attr('id', 'prMujer');
    }
    else if (categoria == 'joyeria'){
      titulo = '<span class="color">Jewelry</span>';
      $('main').attr('id', 'prJoyeria');
    }
    else if (categoria == 'electro'){
      titulo = '<span class="color">Electronic</span> components';
      $('main').attr('id', 'prElectro');
    }

    this.main.append(`<section id="presentacion"></section>`);
    $("#presentacion").append(`<h1>${titulo}</h1>`);
    $("#presentacion").append(`<div class='ordenar'></div>`);
    $(".ordenar").append(`<span>Order:</span>`);
    $(".ordenar").append(`<select name="orden" id="orden"></select>`);
    if(orden == 'asc'){
      $("#orden").append(`<option value="asc" selected='selected'>Ascending</option>`);
      $("#orden").append(`<option value="desc">Descending</option>`);
    }
    else{
      $("#orden").append(`<option value="asc">Ascending</option>`);
      $("#orden").append(`<option value="desc" selected='selected'>Descending</option>`);
    }
      this.main.append(`<section id="listadoProductos"></section>`);
      for (let i = 0; i < json.length; i++) {
        $("#listadoProductos").append(`<article class='producto' id='${json[i].id}'></article>`);
        $(`#${json[i].id}`).append(`<div class='imagenProducto ${json[i].id}'></div>`);
        $(`.imagenProducto.${json[i].id}`).append(`<img src="${json[i].image}" alt="${json[i].title}">`);
        $(`#${json[i].id}`).append(`<h2>${json[i].title}</h2>`);
        $(`#${json[i].id}`).append(`<p>${json[i].price}</p>`);
      }
    }

  vistaDetalle(json) {
    $('main').attr('class', 'detalle');
    this.main.append(`<section id="presentacion"></section>`);
    $("#presentacion").append(`<div class='imagenProducto'></div>`);
    $(".imagenProducto").append(`<img src="${json.image}" alt="${json.title}">`);
    $("#presentacion").append(`<div class='textoProducto'></div>`);
    $(".textoProducto").append(`<h1>${json.title}</h1>`);
    $(".textoProducto").append(`<p>${json.price}</p>`);
    $(".textoProducto").append(`<p>${json.description}</p>`);
    if (json.category.includes('clothing')) {
      $(".textoProducto").append(`<select class="tallas"></select>`);
      $(".tallas").append(`<option value="S">Talla S</option>`);
      $(".tallas").append(`<option value="M">Talla M</option>`);
      $(".tallas").append(`<option value="L">Talla L</option>`);
    }
    $(".textoProducto").append(`<button>Añadir al carrito</button>`);
  }

  vistaCarrito(modelo) {
    $('main').attr('class', 'carrito');
    this.main.append(`<section><h1>Tu <span class="color">carrito</span></h1></section>`);
    this.main.append(`<section id="listadoCarrito"></section>`);
    for (let i = 0; i < modelo.getCarrito().length; i++) {
      $("#listadoCarrito").append(`<article class='producto' id='${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}'></article>`);
      $(`#${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<div class='imagenProductoCarrito ${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}'></div>`);
      $(`.imagenProducto.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<img src="${modelo.getCarrito()[i].image}" alt="${modelo.getCarrito()[i].nombre}">`);
      $(`#${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<div class="info ${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}"></div>`);
      $(`.info.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<h2>${modelo.getCarrito()[i].nombre}</h2>`);
      $(`.info.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p>${modelo.getCarrito()[i].talla}</p>`);
      $(`.info.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p>${modelo.getCarrito()[i].precio}</p>`);
      $(`.info.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p class='cantProd'>${modelo.getCarrito()[i].cantidad}</p>`);
      $(`.info.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<div class="cambiarCantidad ${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}"></div>`);
      $(`.cambiarCantidad.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p class='restar' title='Restar Unidad'><i class="fa-solid fa-minus"></i></p>`);
      $(`.cambiarCantidad.${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p class='sumar'title='Sumar Unidad'><i class="fa-solid fa-plus"></i></p>`);
      $(`#${modelo.getCarrito()[i].id}-${modelo.getCarrito()[i].talla}`).append(`<p class='eliminar' title='Eliminar Producto'><i class="fa-solid fa-trash"></i></p>`);
    }
    this.main.append(`<section id="totalCarrito"></section>`);
    $("#totalCarrito").append(`<p>Total: ${Math.round((modelo.getCarritoTotal() + Number.EPSILON) * 100) / 100}`);
    $("#totalCarrito").append(`<button class='botonCompra'>Comprar</button>`);
  }

  vistaCarritoVacio() {
    $('main').attr('class', 'carrito');
    this.main.append(`<section><h1>Tu <span class="color">carrito</span></h1></section>`);
    this.main.append(`<section id="listadoCarritoVacio"><h2>There's nothing to see here yet</h2></section>`);
    $('#listadoCarritoVacio').append(`<p>Why don't we go and look for something pretty?</p>`);
  }

  vistaFormulario(){
    $('main').attr('class', 'formulario');
    (this.main).append(`<div id=login></div>`);
    $('#login').append(`<section><h1>Don't you have any account yet? <span class="color">Sign Up</span></h1></section>`);
    $('#login').append(`<section class='inputs login'></section>`);
    $('.inputs.login').append(`<input type="text" name="nombre" id="nombre" required placeholder='Name'>`);
    $('.inputs.login').append(`<input type="password" name="password" id="password" placeholder='Password' required>`);
    $('.inputs.login').append(`<input type="email" name="email" placeholder='Email' id="email" required pattern="${this.pattern}">`);
    $('.inputs.login').append(`<input type="tel" name="telefono" pattern="[0-9]{9}" id="telefono" required placeholder='Phone Number'>`);
    $('.inputs.login').append(`<button>Send</button>`);
    $('.inputs.login').append(`<div class='welcome login'>Welcome you <span class='color'>Favourite Store</span></div>`);


    this.main.append(`<div id='signup'></div>`);
    $('#signup').append(`<section><p>Already have an account? <span class='color'>Log in</span></p></section>`);
    $('#signup').append(`<section class='inputs sign'></section>`);
    $('.inputs.sign').append(`<input type="email" name="email" id="emailsign" placeholder="Your Email" pattern="${this.pattern}" required>`);
    $('.inputs.sign').append(`<input type="password" name="password" id="passwordsign" placeholder="Password" required>`);
    $('.inputs.sign').append(`<button>Send</button>`);
    $('.inputs.sign').append(`<div class='welcome sign'>Welcome back to your <span class='color'>Favourite Store</span></div>`);

  }

  rotarCarrusel(carrusel) {
    let i = 0;
    setInterval(function () {
      $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
      i++;
      if (i == carrusel.length) {
        i = 0;
      }
    }, 5000)
    if (this.hammertimeCarrusel) {
      this.hammertimeCarrusel.on("swipeleft", function () {
        i++;
        if (i == carrusel.length) {
          i = 0;
        }
        $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
      });
      this.hammertimeCarrusel.on("swiperight", function () {
        i--;
        if (i == -1) {
          i = carrusel.length - 1;
        }
        $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
      });
    }
  }
  borrarPorId(id, talla) {
    $(`#${id}-${talla}`).remove();
  }
}




class Modelo {
  constructor() {
    this.carrito = []
    this.preferencias = [
      'asc',
      false,
    ]
  }
  getOrden() {
    return this.preferencias[0];
  }
  getModoNoche() {
    return this.preferencias[1];
  }
  setOrden(orden) {
    this.preferencias[0] = orden;
  }
  setModoNoche(modo) {
    this.preferencias[1] = modo;
  }

  getProductos(orden = "asc") {
    return fetch(`https://fakestoreapi.com/products?sort=${orden}`)
  }

  getHombres(orden = "asc") {
    return fetch(`https://fakestoreapi.com/products/category/men\'s clothing?sort=${orden}`)
  }

  getMujeres(orden = "asc") {
    return fetch(`https://fakestoreapi.com/products/category/women\'s clothing?sort=${orden}`)
  }
  getJoyas(orden = "asc") {
    return fetch(`https://fakestoreapi.com/products/category/jewelery?sort=${orden}`)
  }
  getElectro(orden = "asc") {
    return fetch(`https://fakestoreapi.com/products/category/electronics?sort=${orden}`)
  }
  getProducto(id) {
    return fetch(`https://fakestoreapi.com/products/${id}`)
  }
  getCarrito() {
    return this.carrito;
  }
  addCarrito(id, nombre, precio, imagen, talla = '') {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id == id && this.carrito[i].talla == talla) {
        this.carrito[i].cantidad += 1;
        return;
      }
    }
    let objeto = new ObjetoComprado(id, nombre, precio, imagen, talla);
    this.carrito.push(objeto);
  }
  deleteFromCarrito(id, talla) {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id == id && this.carrito[i].talla == talla)
        this.carrito.splice(i, 1);
    }
    this.saveCarrito()
  }
  vaciarCarrito() {
    this.carrito = [];
  }
  getCarritoTotal() {
    let total = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      total += this.carrito[i].precio * this.carrito[i].cantidad;
    }
    return total;
  }
  saveCarrito() {
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }
  loadCarrito() {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
  }
  loadPreferencias() {
    this.preferencias = JSON.parse(localStorage.getItem("preferencias"));
  }
  savePreferencias() {
    localStorage.setItem("preferencias", JSON.stringify(this.preferencias));
  }
  cantidadCarrito() {
    let cantidad = 0;
    for (let i = 0; i < this.carrito.length; i++) {
      cantidad += this.carrito[i].cantidad;
    }
    return cantidad;
  }
  restarUnidad(id, talla) {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id == id && this.carrito[i].talla == talla) {
        this.carrito[i].cantidad -= 1;
        if (this.carrito[i].cantidad == 0) {
          this.carrito.splice(i, 1);
        }
        return;
      }
    }
  }
  sumarUnidad(id, talla) {
    for (let i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].id == id && this.carrito[i].talla == talla) {
        this.carrito[i].cantidad += 1;
        return;
      }
    }
  }
  signUp() {
    return fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify(
                {
                    email:'John@gmail.com',
                    username:'johnd',
                    password: 'm38rmF$',
                    name:{
                        firstname:'John',
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })
      }
}

class ObjetoComprado {
  constructor(id, nombre, precio, imagen, talla = '') {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 1;
    this.imagen = imagen;
    this.talla = talla;
  }
  setCantidad(cantidad) {
    this.cantidad = cantidad;
  }
}
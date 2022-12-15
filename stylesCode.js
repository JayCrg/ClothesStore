function asignarBotones(vista, modelo) {
  var promesa = null;
  $("#hombres").click(function () {
    promesa = modelo.getHombres();
    desplegarProductos(vista, modelo, $(this), promesa);
  });
  $("#mujeres").click(function () {
    promesa = modelo.getMujeres();
    desplegarProductos(vista, modelo, $(this), promesa);

  });
  $("#electro").click(function () {
    promesa = modelo.getElectro();
    desplegarProductos(vista, modelo, $(this), promesa);

  });
  $("#joyeria").click(function () {
    promesa = modelo.getJoyas();
    desplegarProductos(vista, modelo, $(this), promesa);

  });
  $(".logo").click(function () {
    $("main").empty();
    desplegarMenu(modelo, vista);
  });
}

function desplegarMenu(modelo, vista) {
  $("main").attr("class", "");
  vista.vistaMenu();
  $('.textoEslogan button').click(function () {
    promesa = modelo.getProductos();
    $("main").empty();
    promesa.then(res => res.json()).then(json => vista.vistaProductos(json));
  });
}

function desplegarProductos(vista, modelo, boton, promesa) {
  let id = boton.attr("id");
  $("main").empty();
  promesa.then(res => res.json()).then(json => {
    console.log(json)
    vista.vistaProductos(json, id);
    $('.producto').click(function () {
      id = $(this).attr("id");
      promesa = modelo.getProducto(id);
      $("main").empty();
      promesa.then(res => res.json()).then(json => vista.vistaDetalle(json));
  });
});
}



$(document).ready(() => {
  let modelo = new Modelo();
  let vista = new Vista();
  vista.iconoTiendaBota();
  vista.marcarSeccion();
  asignarBotones(vista, modelo);
  desplegarMenu(modelo, vista);
});


























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
    $(".textoEslogan").append(`<h1>¡Bienvenido a tu <span class='color'>tienda favorita</span>!</h1>`);
    $(".textoEslogan").append(`<p>Encontrá todo lo que necesitás para tu hogar</p>`);
    $(".textoEslogan").append(`<p>¡Y mucho más!</p>`);
    $(".textoEslogan").append(`<button>Ver productos</button>`);

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
    $(".textoRedes").append(`<h1>Síguenos en nuestras <span class='color'>redes sociales</span></h1>`);
    $(".textoRedes").append(`<p>¡Y enterate de todas las novedades!</p>`);
    $(".textoRedes").append(`<span class='iconos'></span>`);
    $(".textoRedes .iconos").append(`<a href="https://twitter.com/" target="_blank" title='Twitter'><i class="fa-brands fa-twitter"></i></a>`);
    $(".textoRedes .iconos").append(`<a href="https://www.instagram.com/" target="_blank" title='Instagram'><i class="fa-brands fa-instagram"></i></a>`);
    $(".textoRedes .iconos").append(`<a href="https://www.facebook.com/" target="_blank" title='Facebook'><i class="fa-brands fa-facebook"></i></a>`);

    $("#contacto").append(`<h1><span class='color'>¡Contáctanos!</span></h1>`);
    $("#contacto").append(`<p>Mándanos tu correo para recibir información</p>`);
    $("#contacto").append(`<input type="email" placeholder="Correo electrónico" pattern="${this.pattern}">`);
    $("#contacto").append(`<button>Enviar</button>`);
  }

  vistaProductos(json, categoria = '') {
    $('main').attr('class', 'productos');
    let titulo;
    if (categoria == '') {
      titulo = 'Nuestros <span class="color">Productos</span>';
    } else if (categoria = 'hombre') {
      titulo = 'Ropa para <span class="color">hombres</span>';
    }
    else if (categoria = 'mujer') {
      titulo = 'Ropa para <span class="color">mujeres</span>';
    }
    else if (categoria = 'accesorios') {
      titulo = 'Accesorios para <span class="color">todos</span>';
    }
    this.main.append(`<section id="presentacion"><h1>${titulo}</h1></section>`);
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
  //  console.log(json);
    $('main').attr('class', 'detalle');
    this.main.append(`<section id="presentacion"></section>`);
    $("#presentacion").append(`<div class='imagenProducto'></div>`);
    $(".imagenProducto").append(`<img src="${json.image}" alt="${json.title}">`);
    $("#presentacion").append(`<div class='textoProducto'></div>`);
    $(".textoProducto").append(`<h1>${json.title}</h1>`);
    $(".textoProducto").append(`<p>${json.price}</p>`);
    $(".textoProducto").append(`<p>${json.description}</p>`);
    $(".textoProducto").append(`<select class="tallas"></select>`);
    $(".tallas").append(`<option value="S">Talla S</option>`);
    $(".tallas").append(`<option value="M">Talla M</option>`);
    $(".tallas").append(`<option value="L">Talla L</option>`);
    $(".textoProducto").append(`<button>Añadir al carrito</button>`);
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
}














class Modelo {
  constructor() {
    this.carrito = []
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
}
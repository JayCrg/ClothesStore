
$(document).ready(() => {
    let vista = new Vista();
    vista.iconoTiendaBota();
    vista.marcarSeccion();
    vista.vistaMenu();
    
  });
  
  class Vista{
    constructor(){
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
    iconoTiendaBota(){
      $(".log-shop li").hover(function(){
        $(this).children("i").addClass('fa-bounce')
      }, function(){
        $(this).children("i").removeClass('fa-bounce')}
      );
    }
    marcarSeccion(){
      $(".search ul li").click(function(){
        $(`.search *`).removeClass('marcada');
        $(this).addClass('marcada');
      })
      $('.logo').click(function(){
        $(`.search *`).removeClass('marcada');
      })
    }
    vistaMenu(){
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
      $(".textoRedes .iconos").append(`<a href="https://twitter.com/" target="_blank"><i class="fa-brands fa-twitter"></i></a>`);
      $(".textoRedes .iconos").append(`<a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>`);
      $(".textoRedes .iconos").append(`<a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook"></i></a>`);
      
      $("#contacto").append(`<h1><span class='color'>¡Contáctanos!</span></h1>`);
      $("#contacto").append(`<p>Mándanos tu correo para recibir información</p>`);
      $("#contacto").append(`<input type="email" placeholder="Correo electrónico" pattern="${this.pattern}">`);
      $("#contacto").append(`<button>Enviar</button>`);
    }

    rotarCarrusel(carrusel){
      let i = 0;
      setInterval(function(){
        $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
        i++;
        if(i == carrusel.length){
          i = 0;
        }
      }, 5000)
      if(this.hammertimeCarrusel){
        this.hammertimeCarrusel.on("swipeleft", function() {
          i++;
          if(i == carrusel.length){
            i = 0;
          }
          $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
        });
        this.hammertimeCarrusel.on("swiperight", function() {
          i--;
          if(i == -1){
            i = carrusel.length - 1;
          }
          $("#imagenesCarrusel").children("img").attr("src", `${carrusel[i]}`);
        });
      }
    }
  }
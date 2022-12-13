var imgHero = 'https://imgs.search.brave.com/GpRAuqJ8PZcKvurK99AFxw1rY0zOLcBrPUl_vIY17ZI/rs:fit:1038:398:1/g:ce/aHR0cDovL3d3dy5w/cm90b2NvbG8ub3Jn/L2V4dGZpbGVzL2kt/MTAzNDMtY0cuMTUx/NjAuMS5qcGcucGFn/ZXNwZWVkLmNlLlpI/S0t4eW9KVE4uanBn';
var imgEslogan = "https://imgs.search.brave.com/S2_zzqvj7WXxUw8Oi2jkGdPi5tZUbS6HjYXa9NmYMb8/rs:fit:790:790:1/g:ce/aHR0cDovL3d3dy5j/dXR5cGFzdGUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA0L21heGlfZW50/cmFkYS5qcGc";

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
      
      this.carr1 = './images/bolso.webp'
      this.carr2 = './images/chicas.webp'
      this.carr3 = './images/collar.webp'
      this.carr4 = './images/ropa.webp'
      this.carruselfotos = [this.carr1, this.carr2, this.carr3, this.carr4];
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

      $("#hero").append(`<img src="${imgHero}" alt="hero">`);

      $("#eslogan").append(`<div class='imgEslogan'></div>`);
      $("#eslogan").append(`<div class='textoEslogan'></div>`);
      $(".imgEslogan").append(`<img src="${imgEslogan}" alt="Gente comprando"></img>`);
      $(".textoEslogan").append(`<h1>¡Bienvenido a tu tienda favorita!</h1>`);
      $(".textoEslogan").append(`<p>Encontrá todo lo que necesitás para tu hogar</p>`);
      $(".textoEslogan").append(`<p>¡Y mucho más!</p>`);
      $(".textoEslogan").append(`<button>Ver productos</button>`);

      $("#carrusel").append(`<div id='imagenesCarrusel'></div>`);
      $("#imagenesCarrusel").append(`<img src="${this.carr1}"></img>`);
      this.hammertimeCarrusel = new Hammer(this.main.children("#carrusel").children("#imagenesCarrusel").children("img")[0]);
      this.rotarCarrusel(this.carruselfotos);
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
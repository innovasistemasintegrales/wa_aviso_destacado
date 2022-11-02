$(document).ready(main);

var cont = 1;
function main(){
    /* eventos para menu */
    $('#ico_menu').click(function(){
        if(cont ==1){
            $('#menu').animate({right:'0'});
            cont = 0;
        }else{
            cont = 1;
            $('#menu').animate({right:'-100%'});
        }
    });

    /* Eventos para opciones inicio */
    $('#op_inicio').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion nosotrs */
    $('#op_nosotros').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion servicios */
    $('#op_servicios').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion galeria */
    $('#op_galeria').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion contactanos */
    $('#op_contactanos').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion administrador */
    $('#op_admin').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* Evento para opcion reservar */
    $('#op_reservar').click(function(){
        if(cont == 0)
        {
            $('#menu').animate({right:'-100%'});
            cont = 1;
        }
    });
    /* ======================================FUNCIONES MENU TIENDA======================================== */


}
/* CAROUSEL */
$(document).ready(function() {
    $('#WidtAvisoPropio').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#WidtAvisoPropio').removeClass('cS-hidden');
        } 
    });  
    $('#WidtOtrosAvisos').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#WidtOtrosAvisos').removeClass('cS-hidden');
        } 
    });  
});

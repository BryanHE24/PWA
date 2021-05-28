// Script de prueba
//$(document).ready(function(){
     //   alert("Hi world!");
//});
/************************************************************ */

// Service worker 

if('serviceWorker' in navigator){ // comprueba si existe el service worker en el navegador
        console.log('Puedes usar los serviceWorker en tu navegador'); // envia una respuesta en caso de que existiera

    // Carga el ServiceWorker
    navigator.serviceWorker.register('./sw.js') // carga el serviceworker de archivo sw.js para poder usarlo
                            .then(res => console.log('ServiceWorker cargado correctamente', res)) // esta promesa y function callbackdevuelve una respuesta 
                            .catch(err => console.log('serviceWorker no se ha podido registrar', err)); // en caso de que haiga un error capturara el error con la funcion de flecha callback
    /************************************************************************************************* */

}else{ // en caso de que no lo tenga instalado
    console.log('No puedes usar los serviceWorker en tu navegador'); // manda este mensaje 
}

/*****************************************************************/


// Este script tiene como funcion hacer un scroll suavizado
$(document).ready(function(){ 

    $("#menu a").click(function(e) { // Selecciona los elementos del menu y 
        e.preventDefault(); //evita que esto automáticamente me haga una redirección a la R.L que ponga en el enlace y que entonces autorice la pantalla o cualquier cosa 
        
        $("html, body").animate({ 
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false; // para que respete el preventDefaul
    }); 

});
/********************************************************************************/
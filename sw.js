// Service worker

// Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_SH_web'; //en esa caché se van a estar guardando las cosas.

// Ficheros a cachear en la aplicacion
var urlsToCache = [
    './', // cachea todo lo que hay en el directorio actual 
    './CSS/styles.css', // cachea el css que esta entre el direcctorio actual
    './imagenes/favicon.png', // cachea la imagen favicon.png dentro del direcctorio actual
    //cachear todas las demas imagenes
    './imagenes/1.png',
    './imagenes/2.png',
    './imagenes/3.png',
    './imagenes/4.png',
    './imagenes/5.png',
    './imagenes/6.png',
    './imagenes/facebook.png',
    './imagenes/instagram.png',
    './imagenes/twitter.png'

];

  //'./imagenes/favicon-1024.png',
    //'./imagenes/favicon-512.png',
   // './imagenes/favicon-384png',
   // './imagenes/favicon-256.png',
   // './imagenes/favicon-192.png',
   // './imagenes/favicon-128.png',
    //'./imagenes/favicon-96.png',
   // './imagenes/favicon-64.png',
    //'./imagenes/favicon-32.png',
    //'./imagenes/favicon-16.png'

// Evento install
// instalacion del service worker y guardar datos en cache los recursos estaticos
self.addEventListener('install', e => { // instala service worker
    e.waitUntil( // espera a que se abra el cache 
        caches.open(CACHE_NAME) // abre la cache CACHE_NAME definida anterior mente en la linea 2
              .then(cache => { // promesa para abrir el cache 
                  return cache.addAll(urlsToCache) // devolver y añadir la caché que acabamos de abrir por aquí.
                   .then(() => {  // una ves que abra la cache
                        self.skipWaiting(); // obligatoriamente espera a que se guarden los archivos al cache
                   });
                
              })
              .catch(err => { console.log('No se ha registrado el cache', err) // mandar el error por consola
            })
    );
})

// evento activate
// para que la app funcione sin conexion 
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys() // recoger todos los elementos de la caché que hay ahora
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => { // recorrer en cada iteración vamos a coger ese elemento y vamos a crear una variable llamada cacheNames que va a ser la que vamos a estar recorriendo y la que vamos a estar manipulando
                    
                        if(cacheWhitelist.indexOf(cacheName) === -1){ // buscar el elemento de la caché que estamos recorriendo
                            // Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }

                })

            );
        })
        .then(() => {
            // activar cache
            self.clients.claim();
        })
    );
})

// evento fetch  // self hace referencia al service worker

self.addEventListener('fetch', e => { //esto significa respondeme con datos que esten en el servidor

    e.respondWith(
        caches.match(e.request) // compruebe si la request que viene en el evento Fetch si esa información ya está cacheado vale.
        .then(res => {
            if(res){
                // devuelve datos desde el cache
                return res;
            }

            return fetch(e.request); // en el caso de que no esté en caché esa información guardada dentro del servidor o dentro de la aplicación PWA la recupero de el servidor y devuelvo esa información
        })

    );

});
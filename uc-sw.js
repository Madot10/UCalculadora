/**
 * @file uc-sw.js
 * @description Service Worker de UCalculadora para soporte PWA (Progressive Web App) y funcionamiento sin conexión (offline).
 * Administra el caché local mediante Google Workbox, almacenando archivos críticos (HTML, CSS, JS) en el dispositivo del usuario para permitir accesibilidad cuando no hay conexión a internet, 
 * y maneja las políticas de actualización de recursos.
 */


/** Configuracion del service worker offline. Modificar nombres de cache y precarga si cambia la estrategia PWA. */
const SERVICE_WORKER_CONFIG = { WORKBOX_URL: "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js", CACHE_NAME: "pwabuilder-offline", PRECACHE_URLS: ["./offline.html", "./index.html"], OFFLINE_URL: "offline.html" };

// Este es el Service Worker que maneja la experiencia combinada offline (página offline y copia de páginas en caché)
importScripts(SERVICE_WORKER_CONFIG.WORKBOX_URL);
//workbox.googleAnalytics.initialize();

/**
 * Inicializa el módulo de Google Analytics para Workbox.
 * Permite que los eventos analíticos (como clics en botones) que ocurren cuando el usuario 
 * no tiene internet, se guarden en cola y se envíen a los servidores de Google automáticamente 
 * cuando recupere la conexión.
 * El parámetro 'cd2: Offline' marca estadísticamente estos eventos como ocurridos sin conexión.
 */
workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd2: 'Offline',
  },
});

/**
 * Intercepta el evento nativo de instalación (install) del Service Worker.
 * Durante esta fase, el navegador descarga el worker por primera vez.
 * 'event.waitUntil' bloquea la instalación de la PWA hasta que la función 'preLoad()' 
 * termine exitosamente de descargar y guardar todos los archivos base (HTML) en el caché local.
 */
self.addEventListener('install', function (event) {
  event.waitUntil(preLoad());
});

/**
 * Pre-carga los recursos esenciales (HTML, página offline) en el almacenamiento local.
 * Esta rutina se ejecuta una sola vez durante la instalación inicial del Service Worker.
 * 
 * @returns {Promise} Una promesa que se resuelve cuando todos los archivos críticos han sido cacheados.
 */
var preLoad = function () {
  // Log original mantenido para verificar instalación PWA (Mantenimiento)
  // console.log('[PWA] Install Event processing');
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    // Log original mantenido para verificar indexación PWA (Mantenimiento)
    // console.log('[PWA] Cached index and offline page during Install');
    return cache.addAll(SERVICE_WORKER_CONFIG.PRECACHE_URLS);
  });
}

/**
 * Intercepta todas las peticiones de red (fetch) que hace la aplicación.
 * Intenta buscar los archivos frescos en la red; si falla (por estar sin conexión), sirve la versión almacenada en caché.
 */
self.addEventListener('fetch', function (event) {
  // Log original mantenido para auditar tráfico del SW (Mantenimiento)
  // console.log('[PWA] The service worker is serving the asset.');
  event.respondWith(checkResponse(event.request).catch(function () {
    return returnFromCache(event.request)
  }));
  event.waitUntil(addToCache(event.request));
});

/**
 * Verifica si la respuesta HTTP proveniente del servidor es válida (no es un error 404).
 * 
 * @param {Request} request - Petición original enviada al servidor.
 * @returns {Promise<Response>} Promesa que se resuelve con la respuesta de red si es válida, o rechaza en caso contrario.
 */
var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response)
      } else {
        reject()
      }
    }, reject)
  });
};

/**
 * Agrega silenciosamente en el fondo una petición exitosa al almacenamiento caché.
 * Mantiene la memoria local de la aplicación PWA actualizada con los últimos archivos navegados.
 * 
 * @param {Request} request - Petición a almacenar en caché.
 * @returns {Promise<void>} Promesa que finaliza cuando el archivo se ha guardado en disco.
 */
var addToCache = function (request) {
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      // Log original mantenido para auditoría de archivos guardados offline (Mantenimiento)
      // console.log('[PWA] add page to offline'+response.url)
      return cache.put(request, response);
    });
  });
};

/**
 * Recupera un archivo desde el caché local si el usuario está sin internet (Offline).
 * Si el archivo solicitado no existe en el caché, devuelve obligatoriamente la vista predeterminada de error/offline.
 * 
 * @param {Request} request - Petición del archivo buscado localmente.
 * @returns {Promise<Response>} La respuesta cacheada o la vista 'offline.html'.
 */
var returnFromCache = function (request) {
  return caches.open(SERVICE_WORKER_CONFIG.CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match(SERVICE_WORKER_CONFIG.OFFLINE_URL)
      } else {
        return matching
      }
    });
  });
};
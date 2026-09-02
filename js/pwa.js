/**
 * @file pwa.js
 * @description Módulo encargado de gestionar la funcionalidad de Progressive Web App (PWA).
 * Se responsabiliza de verificar si el Service Worker ya está activo, y en caso 
 * negativo, registrar el script (uc-sw.js) que habilita el soporte offline y 
 * la caché de la aplicación. También incluye manejadores para el evento de instalación 
 * en dispositivos (móvil/escritorio), integrando un registro de métricas hacia Google Analytics.
 */


/** 
 * Configuración estática central para el registro y analítica de la PWA.
 * Define los parámetros esenciales que la aplicación necesita para funcionar offline y reportar métricas.
 * 
 * @property {string} SERVICE_WORKER_PATH - Ruta relativa al archivo principal del Service Worker.
 * @property {string} SCOPE - Alcance o directorio raíz donde el Service Worker tendrá control. (Nota: Debe actualizarse si la ruta pública en GitHub Pages o el dominio cambian).
 * @property {string} EVENT_CATEGORY - Nombre de la categoría bajo la cual se agruparán los eventos de instalación de la PWA enviados a Google Analytics (gtag).
 */
const PWA_CONFIG = { 
    SERVICE_WORKER_PATH: "uc-sw.js", 
    SCOPE: "/UCalculadora/", 
    EVENT_CATEGORY: "PwaInteraccion" 
};

/**
 * Validar y registrar el Service Worker de la PWA.
 * Primero evalúa si ya existe un controlador (service worker activo) para ahorrar recursos de registro.
 * Si no lo hay, lo registra bajo el alcance (scope) especificado para habilitar la experiencia offline.
 */
if (navigator.serviceWorker.controller) {
  // Salida por consola empleada para mantenimiento futuro:
  // Notifica que ya existe un Service Worker activo controlando la página, evitando doble registro.
  console.log('[PWA] active service worker found, no need to register');
} else {
  // Si no hay un Service Worker activo, procedemos a registrar el script definido en PWA_CONFIG.
  navigator.serviceWorker.register(PWA_CONFIG.SERVICE_WORKER_PATH, {
    scope: PWA_CONFIG.SCOPE
  }).then(function (reg) {
    // Salida por consola empleada para mantenimiento futuro:
    // Confirma que el Service Worker se registró exitosamente en la ruta esperada.
    console.log('Service worker has been registered for scope:' + reg.scope);
  });
}

/**
 * Escucha el evento de instalación de la aplicación ('beforeinstallprompt').
 * Este evento es disparado por el navegador cuando determina que se puede instalar la PWA
 * (por ejemplo, mostrando el diálogo "Añadir a la pantalla de inicio").
 * Se usa para inyectar métricas (gtag) y conocer el comportamiento del usuario.
 * 
 * @param {Event} e - Evento disparado nativamente por el navegador.
 */
window.addEventListener('beforeinstallprompt', function (e) {
  // Notificar a Analytics que el prompt de instalación se ha gatillado para este usuario.
  gtag('event', "PopInstall?", {
    'event_category': PWA_CONFIG.EVENT_CATEGORY
  });

  // Escuchar la promesa 'userChoice' para saber qué decidió hacer el usuario ante el prompt.
  e.userChoice.then(function (choiceResult) {
    // Enviar a Analytics el desenlace (outcome): puede ser "accepted" o "dismissed"
    gtag('event', "AnswerPop", {
      'event_category': PWA_CONFIG.EVENT_CATEGORY,
      'event_label': choiceResult.outcome
    });
  });
});
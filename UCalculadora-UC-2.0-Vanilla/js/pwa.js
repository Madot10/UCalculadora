//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
    console.log('[PWA] active service worker found, no need to register')
  } else {
  
  //Register the ServiceWorker
    navigator.serviceWorker.register('uc-sw.js', {
      scope: '/UCalculadora/'
    }).then(function(reg) {
      console.log('Service worker has been registered for scope:'+ reg.scope);
    });
  }
  
  // reemplazar 'standalone' por 'fullscreen' o 'minimal-ui' según el manifest de la app
if (matchMedia('(display-mode: standalone)').matches) {
    // iOS 11.3+ y Android
    isInBrowser = "Pwa";
  } else if ('standalone' in navigator) {
    // para iOS &lt; 11.3
    isInBrowser = "Pwa";
  }
  
/*EVENTS */
  window.addEventListener('beforeinstallprompt', function(e) {
    gtag('event', "PopInstall?", {
        'event_category': "PwaInteraccion" + isInBrowser
      });

    e.userChoice.then(function(choiceResult) {
     gtag('event', "AnswerPop", {
        'event_category': "PwaInteraccion" + isInBrowser,
        'event_label': choiceResult.outcome
      });
    });
  });
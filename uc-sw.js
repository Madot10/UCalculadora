//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
//workbox.googleAnalytics.initialize();

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd2: 'Offline',
  },
});

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
    event.waitUntil(preLoad());
  });
  
  var preLoad = function(){
    //console.log('[PWA] Install Event processing');
    return caches.open('pwabuilder-offline').then(function(cache) {
     //console.log('[PWA] Cached index and offline page during Install');
      return cache.addAll(['./offline.html', './index.html']);
    });
  }
  
  self.addEventListener('fetch', function(event) {
    //console.log('[PWA] The service worker is serving the asset.');
    event.respondWith(checkResponse(event.request).catch(function() {
      return returnFromCache(event.request)}
    ));
    event.waitUntil(addToCache(event.request));
  });
  
  var checkResponse = function(request){
    return new Promise(function(fulfill, reject) {
      fetch(request).then(function(response){
        if(response.status !== 404) {
          fulfill(response)
        } else {
          reject()
        }
      }, reject)
    });
  };
  
  var addToCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        //console.log('[PWA] add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };
  
  var returnFromCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return cache.match(request).then(function (matching) {
       if(!matching || matching.status == 404) {
         return cache.match('offline.html')
       } else {
         return matching
       }
      });
    });
  };
  
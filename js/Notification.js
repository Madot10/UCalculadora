window.OneSignal = window.OneSignal || [];


function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'UCalculadora/OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'UCalculadora/OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/UCalculadora/' };
    console.log("Load new");
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init({
        appId: "5bc53e0e-df54-43b0-9da3-90efd72057ad",
        autoRegister: false,
        notifyButton: {
          enable: true,
        },
      });
});

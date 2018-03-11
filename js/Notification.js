window.OneSignal = window.OneSignal || [];

var initOptions = {
    appId: "ddecc811-167e-42a9-92ba-955bef5af634",
    autoRegister: false,
    notifyButton: {
      enable: true,
    },
  };

function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = '/OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = '/OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/' };
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init(initOptions);
});

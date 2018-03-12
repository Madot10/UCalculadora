window.OneSignal = window.OneSignal || [];

var initOptions = {
    appId: "ddecc811-167e-42a9-92ba-955bef5af634",
    autoRegister: false,
    notifyButton: {
      enable: true,
    },
  };

function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'UCalculadora//OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'UCalculadora//OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/UCalculadora/' };
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init(initOptions);

    OneSignal.on('subscriptionChange', function (isSubscribed) {
        //Change
        if(isSubscribed){
            //Esta suscrito
           
            LauchModal();
            console.log("Suscrito");
            
            
            
        }
    });
});

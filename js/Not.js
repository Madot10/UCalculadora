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
            OneSignal.sendTag("user_completed","false");

            OneSignal.sendTag('avisosUcab',"true");
            OneSignal.sendTag('eventosUcab',"true");
            OneSignal.sendTag('eventosEst',"true");

           // LauchModal();
            OpenDiv('notificaciones');
            
        }
    });
});

//Chequear estado de suscripcion. DEVUELVE BOOLEAN
async function checkSusc(){
    let state = new Promise(resolve =>{

        OneSignal.push(["getUserId", function(userId) {
                console.log('User id: '+userId);

                if(userId == null){
                    state = false;
                    console.log("Sus: " + null);
                }else{
                    state = true;
                    console.log("Sus: " + true);
                }
                
            }]);
    });

    return await state;
}

//Estado del prop permision DEVUELVE BOOLEAN
async function statePermission(){
    let stPer = new Promise(resolve =>{

        OneSignal.push(["getNotificationPermission", function(permission) {
            //console.log("Site Notification Permission:", permission);
            // (Output) Site Notification Permission: default
            if(permission == 'denied'){
                //negada
                stPer = false;
            }else{
                //aceptada o normal
                stPer = true;
            }
        }]);
    });
    return await stPer;
}

//Lanza prop de permiso
function lauchPermission(){

    OneSignal.push(function() {
        OneSignal.registerForPushNotifications();
    });

}

//Get Json de tags
async function getTagsJson(){
    return new Promise(resolve =>{

        OneSignal.push(function() {
            OneSignal.getTags(function(tags) {
                resolve(tags);
              });
        });
    });

}
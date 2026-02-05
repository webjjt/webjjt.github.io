window.updateAvailable = new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
        const errorMessage = `This browser doesn't support service workers`;
        console.error(errorMessage);
        reject(errorMessage);
        return;
    }
    navigator.serviceWorker.addEventListener('message', (e) => {
        if (e.data?.type === 'PWA_UPDATED') {
            console.info('new version found');
        }

    

    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.info(`Service worker registration successful (scope: ${registration.scope})`);
            registration.onupdatefound = () => {
                console.info(`onupdatefound`);
                const installingServiceWorker = registration.installing;
                installingServiceWorker.onstatechange = () => {
                    console.info('onstatechanged');
                    console.info(installingServiceWorker.state);
                    if (installingServiceWorker.state === 'installed') {
                        console.info('goto resolve');
                        resolve(!!navigator.serviceWorker.controller);
                    }
                }
            };
        })
        .catch(error => {
            console.error('Service worker registration failed with error:', error);
            reject(error);
        });
});

window.registerForUpdateAvailableNotification = (caller, methodName) => {
   


    window.updateAvailable.then(isUpdateAvailable => {
        console.info('suite de updatavailable');
        if (isUpdateAvailable) {
            console.info('isupdateavailable goto caller')
            caller.invokeMethodAsync(methodName).then();
        }
        console.info('sortie de registerforupdate');
    });
};
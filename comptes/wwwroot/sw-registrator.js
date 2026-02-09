window.updateAvailable = new Promise((resolve, reject) => {
    console.info('js in updateAvailable');
    if (!('serviceWorker' in navigator)) {
        const errorMessage = `This browser doesn't support service workers`;
        console.error(errorMessage);
        reject(errorMessage);
        return;
    }

    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.info(`Service worker registration successful (scope: ${registration.scope})`);
            registration.onupdatefound = () => {
                const installingServiceWorker = registration.installing;
                installingServiceWorker.onstatechange = () => {
                    console.info('worker onstatechange');
                    console.info(installingServiceWorker.state);
                    if (installingServiceWorker.state === 'installed') {
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

    console.info(' js in registerForUpdateAvailableNotification');
    window.updateAvailable.then(isUpdateAvailable => {

        if (isUpdateAvailable) {
            caller.invokeMethodAsync(methodName).then();
        }
    });
};
window.RegisterService = () => {
    console.info('Register worker without update notification');
    navigator.serviceWorker.register('service-worker.js');
};

window.Reload = () => {

    window.location.reload();
};
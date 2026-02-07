window.pwaUpdates = {
    onUpdateReady: (dotnetRef) => {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.addEventListener('message', (e) => {
            if (e.data?.type === 'PWA_UPDATED') {
                dotnetRef.invokeMethodAsync('ShowUpdateToast');
            }
        });
    },
    applyUpdate: async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
            // Fallback: force reload
            location.reload();
        }
    }
};

// Let the waiting worker take control immediately when told
self?.addEventListener?.('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING' && self.skipWaiting) {
        self.skipWaiting();
    }
});
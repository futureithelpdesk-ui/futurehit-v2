// Service Worker for notifications
self.addEventListener('install', (event) => {
    console.log('🔔 Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activated');
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: event.data.icon || 'https://saytohellofuture.cc.cd/favicon.ico'
        });
    }
});

// 🔥 Service Worker for FUTURE HELPDESK
self.addEventListener('install', (event) => {
    console.log('🔔 SW installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('✅ SW activated');
    event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            vibrate: [200, 100, 200]
        });
    }
});

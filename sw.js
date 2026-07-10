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
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: event.data.icon || 'https://saytohellofuture.cc.cd/favicon.ico'
        });
    }
});

// Handle push notifications
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'FUTURE HELPDESK';
    const options = {
        body: data.body || 'You have a new notification!',
        icon: data.icon || 'https://saytohellofuture.cc.cd/favicon.ico'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

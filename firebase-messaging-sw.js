// Firebase Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAdXa8nD1vSrTRfarRRENf_rnAz2X3h1eY",
    authDomain: "futurehit-70d26.firebaseapp.com",
    projectId: "futurehit-70d26",
    storageBucket: "futurehit-70d26.firebasestorage.app",
    messagingSenderId: "434094239982",
    appId: "1:434094239982:web:c07508527759a162ba83ff",
    measurementId: "G-XB6D7H3374"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Background message:', payload);
    const title = payload.notification?.title || 'FUTURE HELPDESK';
    const options = {
        body: payload.notification?.body || 'You have a new notification',
        icon: '/favicon.ico',
        data: {
            url: payload.data?.url || '/'
        }
    };
    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clients) => {
            for (const client of clients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

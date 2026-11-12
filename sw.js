// TrustTalk Service Worker: zeigt System-Hinweise an und oeffnet beim Antippen den passenden Chat.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const client = wins.find((c) => 'focus' in c);
    if (client) {
      await client.focus();
      if (data.chatId) client.postMessage({ type: 'open-chat', chatId: data.chatId, title: data.title || '' });
    } else if (self.clients.openWindow) {
      await self.clients.openWindow('./');
    }
  })());
});

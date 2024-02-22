const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('https://push-notification-slwc.onrender.com/save-subscription', {
    // const response = await fetch('http://localhost:3001/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}
// Public Key:
// BLc5KPuZfVtKxxl-MXK6PT7ZqE583WlLcG500Y2BU_AbjNzjoR1Rz2yB_vVIugoQH17k22v1YS5pepNxiH-Y9nk

// Private Key:
// yb8FoXcxJBSXX9xF1sO07UfYN-oUKDNjPIkbfrhBkgA

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BLc5KPuZfVtKxxl-MXK6PT7ZqE583WlLcG500Y2BU_AbjNzjoR1Rz2yB_vVIugoQH17k22v1YS5pepNxiH-Y9nk")
    })
    console.log("hey")
    console.log(subscription)
    const response = await saveSubscription(subscription)
    console.log(response)
})

self.addEventListener("push", e => {
    self.registration.showNotification("Wohoo!!", { body: e.data.text() })
})

const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// psuedo code 
// 1. need variable gloabally to store the event
// 2. need to stop broswer from just showing the prompt
// 3. update UI after event
window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';

});

// TODO: Implement a click event handler on the `butInstall` element
// psuedo code 
// 1. 
// 2. 
// 
butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});

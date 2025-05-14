const socket = new WebSocket("ws://localhost:8080")

socket.addEventListener('open', event => {
    console.log('WebSocket connection established!');
    setTimeout(() => {
        socket.send('Hello Server!');
    },2000)
});
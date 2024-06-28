let name = null;
let roomNo = null;
let chat= io.connect('/chat');

function enterRoom() {

    document.getElementById('login-form').style.display = "none";
    initChatSocket()
}


function connectToRoom() {

    /**
     *
     * going to take it from urlparama
     */
    const urlParams = new URLSearchParams(window.location.search);
    roomNo = urlParams.get('id');

    name = document.getElementById('username').value;

    /**
     *
     * will have to check if the name is already present, if so not allow it
     */
    chat.emit('create or join', roomNo, name);
}
/**
 * it initialises the socket for /chat
 */
function initChatSocket() {
    // called when someone joins the room. If it is someone else it notifies the joining of the room
    chat.on('joined', function (room, userId) {
        if (userId === name) {
            // it enters the chat
            hideLoginInterface(room, userId);
        } else {
            // notifies that someone has joined the room
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });
    // called when a message is received
    chat.on('chat', function (room, userId, chatText) {
        let who = userId
        if (userId === name) who = 'Me';
        writeOnChatHistory('<b>' + who + ':</b> ' + chatText);
    });

}
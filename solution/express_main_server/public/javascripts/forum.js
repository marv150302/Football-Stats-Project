let name = null;
let roomNo = null;
let chat= io.connect('/chat');
let user_count = 1;

function enterRoom() {

    document.getElementById('login-form').style.display = "none";
    document.getElementById('chat').style.display = "block";

    initChatSocket()
    connectToRoom();
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
    /*chat.on('joined', function (room, userId) {
        if (userId === name) {
            // it enters the chat
            hideLoginInterface(room, userId);
        } else {
            // notifies that someone has joined the room
            addChatMessage('https://via.placeholder.com/50', userId)
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });*/
    // called when a message is received
    chat.on('chat', function (room, userId, chatText) {
        addChatMessage('/images/profile-default-icon.png', userId, chatText, timeAgo(new Date()))
    });

}


/**
 * Function to format the date as "X days ago"
 * @param date the date of the message
 * @returns {string}
 */
function timeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
}

/**
 *
 * Function to add message to the chat
 * @param userLogo the logo of the user
 * @param userName the username
 * @param message the message to be sent
 * @param date the date on which the message was sent
 */
function addChatMessage(userLogo, userName, message, date) {
    const chatContainer = document.getElementById('chat-container');
    const card = document.createElement('div');
    card.classList.add('card', 'bg-dark', 'text-white');

    card.innerHTML = `
                <div class="card-header">
                    <img src="${userLogo}" alt="${userName}">
                    <div class="header-content">
                        <h5 class="card-title mb-0">${userName}</h5>
                        <h6 class="card-subtitle mb-0 text-muted">${date}</h6>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">${message}</p>
                </div>
                <div class="card-footer">
                    <button class="vote-button" onclick="toggleVote(this)"><i class="fas fa-arrow-up"></i></button>
                    <button class="vote-button" onclick="toggleVote(this)"><i class="fas fa-arrow-down"></i></button>
                </div>
            `;


    chatContainer.appendChild(card);
}

function toggleVote(button) {
    if (button.children[0].classList.contains('fa-arrow-up')) {
        button.classList.toggle('text-success');
        if (button.classList.contains('text-success')) {
            button.nextElementSibling.classList.remove('text-danger');
        }
    } else if (button.children[0].classList.contains('fa-arrow-down')) {
        button.classList.toggle('text-danger');
        if (button.classList.contains('text-danger')) {
            button.previousElementSibling.classList.remove('text-success');
        }
    }
}


/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('message').value;
    chat.emit('chat', roomNo, name, chatText);

    //addChatMessage('https://via.placeholder.com/50', name, chatText, timeAgo(new Date()))
}
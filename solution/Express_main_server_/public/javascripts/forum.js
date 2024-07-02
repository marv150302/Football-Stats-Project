let username = null;
let roomId = null;
const chat = io.connect('/chat');

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id').toLowerCase();

    if (type) {
        switch(type) {
            case 'game':
                const gameInfo = await sendAxiosQuery('/api/get-game-info', { game_id: id });
                loadGameHeader(gameInfo);
                break;
            case 'competition':
                setContainerImage('competition-logo', `https://tmssl.akamaized.net/images/logo/header/${id}.png`);
                break;
            case 'club':
                setContainerImage('club-logo', `https://tmssl.akamaized.net/images/wappen/head/${id}.png`);
                break;
            case 'player':
                const playerImage = urlParams.get('url');
                setContainerImage('player-image', playerImage);
                break;
        }
    }
});

/**
 *
 * Function to set the image of the header of the chat
 * @param imgId
 * @param src
 */
function setContainerImage(imgId, src) {
    document.getElementById('chat-container').innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <img id="${imgId}" src="${src}" alt="${imgId.replace('-', ' ')}">
            </div>
        </div>
        <hr>
    `;
}

function loadGameHeader(game) {
    const chatContainer = document.getElementById('header');
    const gameHeader = createBigGameCard(game);
    gameHeader.classList.remove('bg-dark');
    gameHeader.classList.add('bg-success');
    chatContainer.appendChild(gameHeader);
}

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    clearErrorMessages();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    if (validateForm(usernameInput, passwordInput)) {
        enterRoom(usernameInput, passwordInput);
    }
});

function clearErrorMessages() {
    document.getElementById('username-error').innerText = '';
    document.getElementById('password-error').innerText = '';
}

/**
 * Function used to validate form
 * @param username
 * @param password
 * @returns {boolean}
 */
function validateForm(username, password) {
    let isValid = true;

    if (!username) {
        document.getElementById('username-error').innerText = 'Username is required.';
        isValid = false;
    }

    if (!password) {
        document.getElementById('password-error').innerText = 'Password is required.';
        isValid = false;
    }

    return isValid;
}

/**
 * Function that handles the hiding and displaying of the login form/chat
 * @param usernameInput
 * @param passwordInput
 */
function enterRoom(usernameInput, passwordInput) {
    document.getElementById('login-form').style.display = "none";
    document.getElementById('chat').style.display = "block";

    username = usernameInput;
    initChatSocket();
    connectToRoom();
}

/**
 * Function for connecting the user to the room
 */
function connectToRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('id');
    username = document.getElementById('username').value;

    chat.emit('create or join', roomId, username);
}

/**
 * Function for initializing the chat socket
 */
function initChatSocket() {
    chat.on('chat', (room, userId, chatText) => {
        addChatMessage('/images/boy.png', userId, chatText, timeAgo(new Date()));
    });
}

/**
 *
 * Function used to calculate how many days passed since sending of message
 * @param date
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
 * Function for adding message to the container
 * @param userLogo the logo of the user
 * @param userName the username
 * @param message the text
 * @param date the number of days since the post(this will be adjusted in the future)
 */
function addChatMessage(userLogo, userName, message, date) {
    const chatContainer = document.getElementById('chat-container');
    const card = document.createElement('div');
    card.classList.add('card', 'bg-dark', 'text-white');
    card.style.border = 'none';
    card.innerHTML = `
        <div class="card-body">
            <img src="${userLogo}" alt="${userName}">
            <div class="header-content">
                <h6 class="card-title mb-0 text-primary">@${userName}</h6>
                <br>
                <h6 class="card-subtitle mb-0 text-muted">${date}</h6>
            </div>
            <p class="card-text">${message}</p>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-8">
                    <button class="vote-button" onclick="toggleVote(this)"><i class="fas fa-arrow-up"></i></button>
                    <button class="vote-button" onclick="toggleVote(this)"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-outline-warning">Reply</button>
                    <button type="button" class="btn btn-outline-success">Share</button>
                </div>
            </div>
        </div>
    `;
    chatContainer.appendChild(card);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom after adding a new message
}

/**
 *
 * Function used to toggle between upvote and downvote
 * @param button
 */
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

function sendChatText() {
    const chatText = document.getElementById('message').value;
    if (chatText.trim() !== "") {
        chat.emit('chat', roomId, username, chatText);
        document.getElementById('message').value = '';
    }
}

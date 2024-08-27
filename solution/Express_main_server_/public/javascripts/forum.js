    let username = null;
    let roomId = null;
    const chat = io.connect('/chat');

    document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id').toLowerCase();

    if (type) {
    switch (type) {
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

    // Function to set the image of the header of the chat
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

    // Load game header into the chat
    function loadGameHeader(game) {
    const chatContainer = document.getElementById('header');
    const gameHeader = createBigGameCard(game);
    gameHeader.classList.remove('bg-dark');
    gameHeader.classList.add('bg-success');
    chatContainer.appendChild(gameHeader);
}

    // Login form submission handler
    document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    clearErrorMessages();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    if (validateForm(usernameInput, passwordInput)) {
    enterRoom(usernameInput, passwordInput);
}
});

    // Function to clear error messages
    function clearErrorMessages() {
    document.getElementById('username-error').innerText = '';
    document.getElementById('password-error').innerText = '';
}

    // Function to validate the login form
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

    // Function that handles the hiding and displaying of the login form/chat
    function enterRoom(usernameInput, passwordInput) {
    document.getElementById('login-form').style.display = "none";
    document.getElementById('chat').style.display = "block";

    username = usernameInput;
    initChatSocket();
    connectToRoom();
}

    // Function for connecting the user to the room
    function connectToRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('id');
    username = document.getElementById('username').value;

    chat.emit('create or join', roomId, username);
}

    // Function for initializing the chat socket
    function initChatSocket() {
    chat.on('chat', (room, userId, chatText) => {
        addChatMessage('/images/boy.png', userId, chatText, timeAgo(new Date()));
    });
}

    // Function used to calculate how many days passed since sending of message
    function timeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
}

    // Function for adding message to the container
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

    // Function used to toggle between upvote and downvote
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

    // Function to send chat text
    function sendChatText() {
    const chatText = document.getElementById('message').value;
    if (chatText.trim() !== "") {
    chat.emit('chat', roomId, username, chatText);
    document.getElementById('message').value = '';
}
}

    // Registration form toggle and validation
    document.getElementById('register-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-card').style.display = 'block';
});

    document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registration-card').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

    document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const passwordConfirm = document.getElementById('reg-password-confirm').value.trim();

    let isValid = true;

    // Clear previous errors
    document.getElementById('reg-username-error').textContent = '';
    document.getElementById('reg-email-error').textContent = '';
    document.getElementById('reg-password-error').textContent = '';
    document.getElementById('reg-password-confirm-error').textContent = '';

    // Username check
    if (username.length < 3) {
    document.getElementById('reg-username-error').textContent = 'Username must be at least 3 characters long.';
    isValid = false;
}

    // Email validation check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
    document.getElementById('reg-email-error').textContent = 'Please enter a valid email address.';
    isValid = false;
}

    // Password length check
    if (password.length < 6) {
    document.getElementById('reg-password-error').textContent = 'Password must be at least 6 characters long.';
    isValid = false;
}

    // Password match check
    if (password !== passwordConfirm) {
    document.getElementById('reg-password-confirm-error').textContent = 'Passwords do not match.';
    isValid = false;
}

    // If the form is valid, proceed with registration
    if (isValid) {
        location.reload();

    }
});
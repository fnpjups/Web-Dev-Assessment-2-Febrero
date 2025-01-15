// Navigation functionality
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetPage = link.getAttribute('data-page');

        pages.forEach(page => {
            page.classList.add('hidden');
        });

        document.getElementById(targetPage).classList.remove('hidden');
    });
});

// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const error = document.getElementById('signup-error');

    if (email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sign Up Successful! Redirecting to Login page...');
                error.style.display = 'none';
                document.getElementById('signup').classList.add('hidden');
                document.getElementById('login').classList.remove('hidden');
            } else {
                error.textContent = data.message || 'Sign Up Failed!';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        }
    } else {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
    }
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('login-error');

    if (email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome back, ${data.user.name}!`);
                error.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(data));

                // Redirect to the home page
                document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
                document.getElementById('home').classList.remove('hidden');
            } else {
                error.textContent = data.message || 'Invalid email or password.';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        }
    } else {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
    }
});

//Sign up and login modals

//Get modal elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

//Get open modal buttons
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

//Get close buttons
const closeLoginBtn = document.getElementById('close-login');
const closeSignupBtn = document.getElementById('close-signup');

//Open login modal
login.onclick = function() {
    loginModal.style.display = 'flex';
}

//Open sign up modal
signup.onclick = function() {
    signupModal.style.display = 'flex';
}

//Close login modal
closeLoginBtn.onclick = function() {
    loginModal.style.display = 'none';
}

//Close sign up modal
closeSignupBtn.onclick = function() {
    signupModal.style.display = 'none';
}

//Close modal if outside click
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    } else if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
}

//Code from https://stackoverflow.com/questions/16626673/playing-a-video-when-clicking-on-an-element-of-an-image
//Handles loading the respective video for each image
function loadVideo1() {
var videoEl = document.getElementsByTagName('video')[2];
var sourceEl = videoEl.getElementsByTagName('source')[0];
sourceEl.src = 'frontend/Assets/Cyber Cage.mp4';
videoEl.load();
document.getElementById('videoHeading').textContent = 'Cyber Cage';
document.getElementById('videoDescription').textContent = 'Deploys a cage which blocks enemies vision and slows them down while passing through.';
}

function loadVideo2() {
var videoEl = document.getElementsByTagName('video')[2];
var sourceEl = videoEl.getElementsByTagName('source')[0];
sourceEl.src = 'frontend/Assets/Spycam.mp4';
videoEl.load();
document.getElementById('videoHeading').textContent = 'Spycam';
document.getElementById('videoDescription').textContent = 'A re-usable ability. When placed down and in control of the camera, player is able to fire a marking dart. This dart will reveal the position of any player hit with the dart.';
}

function loadVideo3() {
var videoEl = document.getElementsByTagName('video')[2];
var sourceEl = videoEl.getElementsByTagName('source')[0];
sourceEl.src = 'frontend/Assets/Trapwire.mp4';
videoEl.load();
document.getElementById('videoHeading').textContent = 'Trapwire';
document.getElementById('videoDescription').textContent = 'When placed down between two places, any player who trips on the wire is slowed, revealed, and stunned if not destroyed.';
}

function loadVideo4() {
var videoEl = document.getElementsByTagName('video')[2];
var sourceEl = videoEl.getElementsByTagName('source')[0];
sourceEl.src = 'frontend/Assets/Neutral Theft.mp4';
videoEl.load();
document.getElementById('videoHeading').textContent = 'Neutral theft';
document.getElementById('videoDescription').textContent = 'Used on the body of a dead enemy player. This reveals the position of all enemies still alive.';
}

//Function to handle the fade-in effect
const fadeInElements = document.querySelectorAll('.fade-in');

//IntersectionObserver to detect when the elements are in the viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');  //Add visible class when element is in view
            observer.unobserve(entry.target);  //Stop observing the element after it fades in
        }
    });
}, {
    threshold: 0.5  //Trigger when 50% of the element is in the viewport
});

//Observes each fade-in element
fadeInElements.forEach(element => {
    observer.observe(element);
});
document.addEventListener('DOMContentLoaded', () => {
    const msg = new SpeechSynthesisUtterance("Welcome to pie space");
    window.speechSynthesis.speak(msg);

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const text = `Open ${event.target.textContent}`;
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
            alert(text);
        });
    });

    const optionsBtn = document.getElementById('options-btn');
    const optionsMenu = document.getElementById('options-menu');

    optionsBtn.addEventListener('click', () => {
        optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
    });

    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'PIE.space',
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            alert('Web Share API not supported in this browser.');
        }
    });

    setTheme(getSavedTheme());
    animateHeading();

    setTimeout(() => {
        document.getElementById('hacking-screen').style.display = 'none';
        document.getElementById('loading-screen').style.display = 'flex';

        let percent = 0;
        const loadingInterval = setInterval(() => {
            percent += 1;
            document.getElementById('loading-progress').style.width = percent + '%';
            document.getElementById('loading-percent').textContent = percent + '%';

            if (percent === 100) {
                clearInterval(loadingInterval);
                document.getElementById('loading-screen').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
                startClock();
            }
        }, 30); // Adjust the speed of the loading bar
    }, 300); // Duration of the hacking screen
});

function startClock() {
    const indianClock = document.getElementById('indian-clock');
    setInterval(() => {
        const now = new Date();
        const indiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        indianClock.textContent = indiaTime.toLocaleTimeString();
    }, 1000);
}

document.getElementById('search-box').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const ul = document.getElementById('social-media-list');
    const li = ul.getElementsByTagName('li');
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    let resultsFound = false;
    
    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName('a')[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            const resultItem = document.createElement('li');
            const resultLink = document.createElement('a');
            resultLink.href = a.href;
            resultLink.target = "_blank";
            resultLink.textContent = txtValue;
            resultItem.appendChild(resultLink);
            searchResults.appendChild(resultItem);
            resultsFound = true;
        } else {
            li[i].style.display = "none";
        }
    }
    
    if (resultsFound) {
        searchResults.style.display = 'block';
    } else {
        searchResults.style.display = 'none';
    }
});

function setTheme(theme) {
    if (theme === 'system') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    document.body.className = theme;
    saveTheme(theme);
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function getSavedTheme() {
    return localStorage.getItem('theme') || 'system';
}

function animateHeading() {
    const text = "Welcome to PIE.space";
    const heading = document.getElementById('animated-heading');
    let index = 0;

    function type() {
        if (index < text.length) {
            heading.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150); // Adjust typing speed here
        } else {
            setTimeout(() => {
                heading.textContent = '';
                index = 0;
                setTimeout(type, 500); // Adjust delay before retyping
            }, 2000); // Delay before deleting the text
        }
    }

    type();
}

function openRocketSimulator() {
    alert("To run the rocket simulator, please download and execute the provided Python script on your local machine.");
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
    });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let hasError = false;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        hasError = true;
    } else {
        nameError.style.display = 'none';
    }
    
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        hasError = true;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format';
        emailError.style.display = 'block';
        hasError = true;
    } else {
        emailError.style.display = 'none';
    }
    
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        messageError.style.display = 'block';
        hasError = true;
    } else {
        messageError.style.display = 'none';
    }
    
    if (!hasError) {
        const contactDetails = `
            Name: ${nameInput.value.trim()}<br>
            Email: ${emailInput.value.trim()}<br>
            Phone: ${document.getElementById('phone').value.trim()}<br>
            Message: ${messageInput.value.trim()}
        `;
        document.getElementById('contact-details').innerHTML = contactDetails;
        document.getElementById('contact-info').style.display = 'block';
        alert('Form submitted successfully!');
        // Add your form submission code here
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

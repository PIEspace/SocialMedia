document.addEventListener('DOMContentLoaded', () => {
    const msg = new SpeechSynthesisUtterance("Welcome to pie space");
    window.speechSynthesis.speak(msg);

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            alert(`You are now leaving to visit ${event.target.textContent}`);
        });
    });

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
                showSlides();
            }
        }, 30); // Adjust the speed of the loading bar
    }, 300); // Duration of the hacking screen
});

function startClock() {
    const indianClock = document.getElementById('indian-clock');
    setInterval(() => {
        const now = new Date();
        const indiaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        indianClock.textContent = indiaTime.toLocaleTimeString('en-US', options);
    }, 1000);
}

let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

document.getElementById('search-box').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const ul = document.getElementById('social-media-list');
    const li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName('a')[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});

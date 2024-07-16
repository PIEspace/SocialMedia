document.addEventListener('DOMContentLoaded', () => {
    const msg = new SpeechSynthesisUtterance("Welcome to PIE.space");
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
            }
        }, 30); // Adjust the speed of the loading bar
    }, 300); // Duration of the hacking screen
});

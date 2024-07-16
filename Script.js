document.addEventListener('DOMContentLoaded', () => {
    const msg = new SpeechSynthesisUtterance("Welcome to pie space");
    window.speechSynthesis.speak(msg);

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            alert(`You are now leaving to visit ${event.target.textContent}`);
        });
    });
});

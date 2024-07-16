document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            alert(`You are now leaving to visit ${event.target.textContent}`);
        });
    });
});

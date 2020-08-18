const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modalWhite = document.querySelector('.modal');

for( let card of cards ) {

    card.addEventListener('click', function () {

        const foodId = card.getAttribute('id');
        const foodDesc = card.getElementsByTagName('h2');
        modalOverlay.classList.add('active');
        modalOverlay.querySelector('#food').src = `assets/${foodId}.png`;
        modalOverlay.querySelector('#desc').textContent = `${foodDesc}`;

    })

}

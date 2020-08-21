const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modalWhite = document.querySelector('.modal');

for( let card of cards ) {

    card.addEventListener('click', function () {

        const foodId = card.getAttribute('id');
        const foodContent = card.innerHTML;
        modalOverlay.classList.add('active');
        modalWhite.innerHTML = `${foodContent} <span class = 'close-modal'>Fechar modal</span>`;

        document.querySelector('.close-modal').addEventListener('click', function(){
            modalOverlay.classList.remove('active');
            modalOverlay.querySelector('img').src = '';
        })

    })

}
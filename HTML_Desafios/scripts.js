const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card_content');

for(let card of cards) {
    card.addEventListener('click', function (){
        modalOverlay.classList.add('active');
    })
}

document.querySelectorAll('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active');
})
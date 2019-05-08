import geral from "./modules/Product/_product-index"

document.addEventListener('DOMContentLoaded', geral.init);

function bodyActive (){
    const body = document.querySelector('body')
    body.addEventListener('click', () => {
        body.classList.add('is--active')
    })
}


bodyActive();
import CacheSelector from './_cache-selector';

const { specification , product } = CacheSelector;

const Methods  = {
    init() {
        if(window.matchMedia('(min-width: 1024px)').matches){
            Methods.fixBarProductBuy();
            Methods.scrollToForm();
        }
    },
    fixBarProductBuy(){
        window.addEventListener('scroll', () => {
            if(specification.getBoundingClientRect().top < 190){
                product.fix.classList.add('is--active');
            } else {
                product.fix.classList.remove('is--active');
            }
        })
    },
    scrollToForm(){
        product.fixOutStock.addEventListener('click', () => {
            product.outStock.scrollIntoView({block: "end", behavior: "smooth"});
        })
    },
}

export default {
    init: Methods.init
}
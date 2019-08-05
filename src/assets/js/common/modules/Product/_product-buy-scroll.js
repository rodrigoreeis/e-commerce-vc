import CacheSelector from './_cache-selector';
import GlobalSelector from '../General/_global-selector';

const { $footer } = GlobalSelector;
const { specification , product } = CacheSelector;

const Methods  = {
    init() {
        if(window.matchMedia('(min-width: 1024px)').matches){
            Methods.fixBarProductBuy();
        }
        Methods.scrollToForm();
    },
    fixBarProductBuy(){
        window.addEventListener('scroll', () => {
            if(specification.getBoundingClientRect().top < 190){
                !localStorage.novidades ? product.fix.classList.add('is--active--two') : product.fix.classList.add('is--active');
            } else {
                    product.fix.classList.remove('is--active');
                    product.fix.classList.contains('is--active--two') ? product.fix.classList.remove('is--active--two') : product.fix.classList.remove('is--active--two');
            }
        })
    },
    scrollToForm(){
        product.fixOutStock.addEventListener('click', () => {
            product.outStock.scrollIntoView({block: "center", behavior: "smooth"});
        })
    },
}

export default {
    init: Methods.init
}
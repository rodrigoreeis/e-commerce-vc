import * as HELPERS from './methods';
import CacheSelector from './_cache-selector';

const { product, descriptions , specification} = CacheSelector;

const Methods  = {
    init() {
        Methods.getFixDescriptions();
        Methods.tabChange();
        Methods.scrollToDescription();
    },
    getFixDescriptions(){
        HELPERS.productInfo(0)
            .then((response) => {
                product.shotDescription.innerHTML = response.shotDescription;
                product.code.textContent = `Código do item: ${response.code}`;
                Methods.__setDescriptions(response);
               
            })
    },
    __setDescriptions(response){
        product.description.innerHTML = response.shotDescription;
        product.howToUse.innerHTML = response.howUse;
        product.composition.innerHTML = response.composition;
        descriptions.video.innerHTML = response.video;
    },

    tabChange(){
        [...descriptions.self].map((el) => {
            el.addEventListener('click', ({currentTarget}) => {
                if(!currentTarget.classList.contains('is--active')){
                    HELPERS.removeAllActives('.js--tab--action');
                    currentTarget.classList.add('is--active');
                    document.querySelector(`.rr-product-specification__content[data-tab="${currentTarget.dataset.tab}"]`).classList.add('is--active');
                }
            })
        })
    },

    scrollToDescription(){
        [...descriptions.scroll].map((el) =>{
            el.addEventListener('click', (ev) => {
                ev.preventDefault();
                specification.scrollIntoView({block: "end", behavior: "smooth"});
            })
        })
    },
}

export default {
    init: Methods.init
}
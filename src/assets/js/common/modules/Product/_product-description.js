import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product, descriptions } = CacheSelector;

const Methods  = {
    init() {
        Methods.getFixDescriptions();
        Methods.tabChange();
    },
    getFixDescriptions(){
        METHODS.productInfo(0)
            .then((response) => {
                product.shotDescription.textContent = response.shotDescription;
                product.code.textContent = `Código do item: ${response.code}`;
                Methods.__setDescriptions(response);
            })
    },
    __setDescriptions(response){
        product.description.textContent = response.shotDescription;
        product.howToUse.textContent = response.howUse;
        product.composition.textContent = response.composition;
    },

    tabChange(){
        [...descriptions.self].map((el) => {
            el.addEventListener('click', ({currentTarget}) => {
                if(!currentTarget.classList.contains('is--active')){
                    Methods.__removeAllActives();
                    currentTarget.classList.add('is--active');
                    document.querySelector(`.rr-product-specification__content[data-tab="${currentTarget.dataset.tab}"]`).classList.add('is--active');
                }
            })
        })
    },

    __removeAllActives(){
        [...descriptions.items].map((item) => {
            item.classList.remove('is--active');
        })
    },
}

export default {
    init: Methods.init
}
import { closeOverlay } from '../General/utils/methods';
import Axios from 'axios';
import Selector from './_cache-selector';
import getInformationItem from './_product-info';

import * as HELPERS from './methods';

const { product, thumbMobile } = Selector;

const Methods = {
	init() {
        getInformationItem(0);
        Methods.getVariationsProducts();
    },
	async getVariationsProducts(){
        const { productId } = skuJson_0;
        const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
        try {
            const response = await Axios.get(endpoint)
            return Methods.__createThumb(response);
        } catch (error){ 
            console.log(error) 
        }
    },
    __createThumb({data}){
        const obj = data[0];
        obj.items.map((items, index) => {
            const qtyItem = items.sellers[0].commertialOffer.AvailableQuantity;
            const color = items.Cor[0].replace(/,([A-zA-Z z0-9-_]*)/g, "");
            const colorName = items.Cor[0].match(/,([A-zA-Z z0-9-_]*)/g);
            Methods.__createElements(color, index, qtyItem, colorName);

        })
    },
    __createElements(color, index, qtyItem, colorName){
        const box = `
            <span class='rr-product__thumb--box js--box--thumb
                ${!qtyItem != 0 ? "out-of-stock" : ''}'
                data-index="${index}" 
                style=background-color:${color};>
                <i>
                    ${colorName[0].replace(',','')}
                </i>
            </span>`
        product.thumb.innerHTML += box;
        Methods.__bindEventClick();
    },
    __bindEventClick(){
        const thumbBoxs = document.querySelectorAll('.rr-product__thumb--box');
        [...thumbBoxs].map((el) => {
            el.addEventListener('click', ({currentTarget}) => {
                const _currentIndex = currentTarget.dataset.index;
                if (!currentTarget.classList.contains('is--active')){
                    HELPERS.removeAllActives('.js--box--thumb');
                    currentTarget.classList.add('is--active');
                    getInformationItem(_currentIndex);
                    Methods.__changeImage(_currentIndex);
                    if(window.matchMedia('(max-width: 768px)').matches){
                        closeOverlay(thumbMobile.thumb);
                    }
                }
                Methods.__showFormProductOutStock(currentTarget);
            })
        })
    },
    __showFormProductOutStock(currentTarget){
        if (currentTarget.classList.contains('out-of-stock')){
            product.containerBuy.classList.add('is--remove');
            product.containerPrice.classList.add('is--remove');
            product.outStock.classList.add('is--active');
        } else{
            product.containerBuy.classList.remove('is--remove');
            product.containerPrice.classList.remove('is--remove');
            product.outStock.classList.remove('is--active');
        }
    },
    __changeImage(_currentIndex){
        HELPERS.removeAllActives('.rr-product__image');
        const _currentImage = document.querySelector(`.rr-product__image[data-index="${_currentIndex}"]`);
        _currentImage.classList.add('is--active');
    },
}
export default {
	init: Methods.init
};
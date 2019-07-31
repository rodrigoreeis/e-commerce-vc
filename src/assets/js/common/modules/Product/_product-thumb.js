import Axios from 'axios';
import Selector from './_cache-selector';
import getInformationItem from './_product-info';

const {product, slick} = Selector

const Methods = {
	init() {
        Methods.getVariationsProducts();
        getInformationItem(0);
    },
	async getVariationsProducts(){
        const { productId } = skuJson_0;
        const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
        try{
            const response = await Axios.get(endpoint)
            return Methods.__createThumb(response);
        } catch (error){ 
            console.log(error) 
        }
    },
    __createThumb({data}){
        const obj = data[0];
        obj.items.map((items, index) => {
            const skuId = items.itemId;
            const qtyItem = items.sellers[0].commertialOffer.AvailableQuantity;
            const color = items.Cor[0].replace(/,([A-zA-Z z0-9-_]*)/g, "");
            Methods.__createElements(color, index, skuId, qtyItem);
        })
    },
    __createElements(color, index, skuId, qtyItem){
        const box = document.createElement('div');
        box.classList.add('rr-product__thumb--box')
        !qtyItem != 0 ? box.classList.add('out-of-stock') : true;
        box.style.background = `${color}`;
        box.setAttribute('data-index', index);
        box.setAttribute('data-sku', skuId);
        product.thumb.appendChild(box);
        box.addEventListener('click', ({currentTarget}) => {
            const _currentIndex = currentTarget.dataset.index;
            if (!currentTarget.classList.contains('is--active')){
                Methods.__removeAllActives();
                currentTarget.classList.add('is--active');
                getInformationItem(_currentIndex);
                Methods.__changeImage(_currentIndex);
            }
            Methods.__showFormProductOutStock(currentTarget)
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
    __removeAllActives(){
        const boxThumbs = document.querySelectorAll('.rr-product__thumb--box');
        [...boxThumbs].map((box) => {
            box.classList.remove('is--active');
        })
    },
    __changeImage(_currentIndex){
        Methods.__removeAllImagesActive();
        const _currentImage = document.querySelector(`.rr-product__image[data-index="${_currentIndex}"]`);
         _currentImage.classList.add('is--active');
    },
    __removeAllImagesActive(){
        const images = document.querySelectorAll('.rr-product__image');
        [...images].map((image) => {
            image.classList.remove('is--active');
        });
    }
}
export default {
	init: Methods.init
};
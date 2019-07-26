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
        const colorHexadecimal = new RegExp(/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})|([0-9a-fA-F]{3})$/g);
        obj.items.map((items, index) => {
            const skuId = items.itemId;
            const color = items.Cor[0].match(colorHexadecimal);
            Methods.__createElements(color, index, skuId);
        })
    },
    __createElements(color, index, skuId){
        const box = document.createElement('div');
        box.classList.add('rr-product__thumb--box')
        product.thumb.appendChild(box);
        box.style.background = `${color}`;
        box.setAttribute('data-index', index);
        box.setAttribute('data-sku', skuId);
        box.addEventListener('click', ({currentTarget}) => {
            const _currentIndex = currentTarget.dataset.index;
            getInformationItem(_currentIndex);
            const _currentImage = document.querySelector('.')
        })
    },
    __changeImage(){
        
    },
}
export default {
	init: Methods.init
};
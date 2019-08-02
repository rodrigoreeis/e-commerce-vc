import Axios from 'axios';
import Selector from './_cache-selector';
import GlobalSelector from '../General/_global-selector';
import {openOverlay, closeOverlay}from '../General/utils/methods';


const { product , thumbMobile} = Selector;
const { $globals } = GlobalSelector

const Methods = {
    init() {
        if(window.matchMedia('(max-width: 768px)').matches){
            Methods.getVariationsProducts();
            Methods.openTabColors();
            Methods.closeTabColors();
        }
    },
	async getVariationsProducts(){
        const { productId } = skuJson_0;
        const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
        try {
            const response = await Axios.get(endpoint)
            return Methods.__colorsThumbMobile(response);
        } catch (error){ 
            console.log(error) 
        }
    },
    __colorsThumbMobile({data}) {
        const obj = data[0];
        thumbMobile.moreColors.textContent = `${obj.items.length} cores`
        obj.items.map((items) => {
            const colors = items.Cor[0].replace(/,([A-zA-Z z0-9-_]*)/g, "");
            const miniColors = `
                <span class="rr-thumb-wrapper__colors--item" 
                    style="background-color:${colors}">
            `
            thumbMobile.colors.innerHTML += miniColors;
        })
    },
    

    openTabColors() {
        console.log(thumbMobile.container);
        thumbMobile.container.addEventListener('click', () => {
            openOverlay();
            thumbMobile.thumb.classList.add('is--active');
        })
    },
    closeTabColors() {
        $globals.overlay.addEventListener('click', () => {
			closeOverlay(thumbMobile.thumb);
        });    
    }
}
export default {
	init: Methods.init
};
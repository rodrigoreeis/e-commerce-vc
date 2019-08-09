import CacheSelector from './_cache-selector';
import Axios from 'axios';

const {$shelf} = CacheSelector;

const Methods = {
	init(){
        Methods.getInformationItems();
    },

    async getInformationItems(){
        const productIds = [...$shelf.productId].map((item) => {
            const itemId = item.dataset.productid;
            return itemId;
        })
        console.log(productIds);
        const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productIds.join('&fq=productId:')}`
        try {
            const response = await Axios.get(endpoint)
            return Methods.__informationItems(response);
        } catch (error){ 
            console.log(error) 
        }
    },

    __informationItems({data}) {
        const column = document.querySelector('.resultItemsWrapper > div > div > ul');
        let filter = data.filter(el => el.items.length != 1)
        filter.map((el) => {
            const link = el.link;
            el.items.map(item => {
                column.innerHTML += Methods.__createShelf(item, link)
            })
        })
    },
    __createShelf(item, link){
        const shelf = `
            <li>
                <article class="rr-shelf__item"> 
                    <a class="rr-shelf__container" href="${link}">
                        <div class="rr-shelf__img-container">
                            <div class="rr-shelf__placeloader">
                                <img src="${item.images[0].imageUrl}" width="200" height="200" alt="${item.images[0].imageText}">
                            </div>
                        </div>
                        <div class="rr-shelf__content">
                            <h3 class="rr-shelf__title"> ${item.name} </h3>
                            <div class="rr-shelf__price-container"> 
                                <p class="rr-shelf__price-terrt">
                                    ${!item.sellers[0].commertialOffer.Price == 0
                                        ? ` <span class="rr-shelf__best-price"> 
                                                ${item.sellers[0].commertialOffer.Price.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'})} 
                                            </span> `
                                        : ` <p class="rr-shelf__out-of-stock-terrt"> Produto Esgotado </p>`
                                    }
                                </p>
                            </div>
                        </div>
                    </a>
                    ${!item.sellers[0].commertialOffer.Price == 0
                        ? ` <div class="rr-shelf__buy">
                                <button class="rr-shelf__buy--btn">
                                    <a href="${link}"> Comprar </a> 
                                </button>
                            </div>`
                        : ''
                    }
                </article>  
            </li>
        `
        return shelf;
    },
};

export default {
	init: Methods.init,
};











// const productInfo = async (items) => {
// 	const { productId } = skuJson_0;
// 	const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
// 	try{
// 		const response = await Axios.get(endpoint)
// 		return mountObject(response, items)
// 	} catch (error){ 
// 		console.log(error)
// 	}
// };
import GlobalSelector from "../_global-selector";
import {getOrderForm, updateOrderForm, addToCart} from "../utils/_VTEXHelpers";

const {$minicart, $shelf} = GlobalSelector;

const Methods = {
    init(){
        Methods.priceAmountMinicart();
        Methods.amountItemsMinicart();
        Methods.createProducts();
        Methods.addItemToMinicart();
    },
    priceAmountMinicart(){
        getOrderForm()
            .done((result) => {
                $minicart.price.textContent = (result.value / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
            })
    },
    amountItemsMinicart(){
        getOrderForm()
            .done((result) => {
                $minicart.amount.textContent = result.items.length
            })
    },
    __createItems(items){
        const wrapperProduct = document.createElement('div');
        const imgProduct = document.createElement('img');
        const containerProduct = document.createElement('div');
        const nameProduct = document.createElement('p');
        const priceDiscountProduct = document.createElement('del');
        const priceProduct = document.createElement('span');
        const linkProduct = document.createElement('a');
        
        wrapperProduct.classList.add('rr-product__wrapper')
        imgProduct.classList.add('rr-product__img')
        containerProduct.classList.add('rr-product__container')
        nameProduct.classList.add('rr-product__name')
        priceProduct.classList.add('rr-product__price')
        priceDiscountProduct.classList.add('rr-product__old-price')
        
        
        $minicart.products.appendChild(wrapperProduct)
        linkProduct.appendChild(imgProduct);
        wrapperProduct.appendChild(linkProduct);
        wrapperProduct.appendChild(containerProduct)
        containerProduct.appendChild(nameProduct)
        containerProduct.appendChild(priceDiscountProduct)
        containerProduct.appendChild(priceProduct)

        linkProduct.setAttribute('href', items.detailUrl);
        imgProduct.setAttribute('src', items.imageUrl.replace('55-55', '80-80'))
        nameProduct.textContent = items.name
        priceDiscountProduct.textContent = items.listPrice == items.price ? priceDiscountProduct.remove() : (items.listPrice / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
        priceProduct.textContent = (items.price / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});

    },
    createProducts(){
        getOrderForm()
            .then((result) => {
                // console.log(result.items.slice(-1)[0])
                result.items.map((items) => {
                Methods.__createItems(items);
            })
            })
    },
    addItemToMinicart(){
        [...$shelf.btn].map((button) => {
            button.addEventListener('click', ({currentTarget}) => {
                console.log("clicado")
                const elementId = currentTarget.firstChild.getAttribute('data-productId');
                fetch(`/api/catalog_system/pub/products/search/?fq=productId:${elementId}`)
                    .then((response) => response.json())
                    .then((result) => {
                        let skuItem = result[0].items[0].itemId
                        const item = {
                            id: skuItem,
                            quantity: 1,
                            seller: '1'
                        }
                        getOrderForm()
                            .then((response) => {
                                console.log(skuItem);
                                const itemsId = response.items.map((el) =>  el.id)
                                const validateProduct = itemsId.indexOf(skuItem);
                                console.log(validateProduct, itemsId)
                                if(validateProduct != -1){
                                    alert('Esse produto já existe no carrinho!')
                                }else{
                                    addToCart(item)
                                    .done((response) => {
                                        console.log('Item adicionado!');
                                        Methods.__addNewItemMinicart();
                                        Methods.priceAmountMinicart();
                                        Methods.amountItemsMinicart();
                                    });
                                }
                            })
                    })
            })
        })
    },
    __addNewItemMinicart(){
        getOrderForm()
            .then((result) => {
                // console.log(result)
                // const itemsId =	result.items.map((el) =>  el.id)
                // console.log(itemsId.indexOf(skuProductId), 'foo')
                const items = result.items.slice(-1)[0];
                Methods.__createItems(items);
            })
    }
}


export default {
    init: Methods.init,
} 





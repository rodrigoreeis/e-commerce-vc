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
            .then((result) => {
                $minicart.price.textContent = (result.value / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
            })
    },
    amountItemsMinicart(){
        getOrderForm()
            .then((result) => {
                $minicart.amount.textContent = result.items.length
            })
    },
    createProducts(){
        getOrderForm()
            .then((result) => {
                result.items.map((items) => {
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
                    
                    linkProduct.setAttribute('href', items.detailUrl);
                    imgProduct.setAttribute('src', items.imageUrl.replace('55-55', '80-80'))
                    nameProduct.textContent = items.name
                    priceDiscountProduct.textContent = items.listPrice == items.price ? priceDiscountProduct.remove() : (items.listPrice / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
                    priceProduct.textContent = (items.price / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});


                    $minicart.products.appendChild(wrapperProduct)
                    linkProduct.appendChild(imgProduct);
                    wrapperProduct.appendChild(linkProduct);
                    wrapperProduct.appendChild(containerProduct)
                    containerProduct.appendChild(nameProduct)
                    containerProduct.appendChild(priceDiscountProduct)
                    containerProduct.appendChild(priceProduct)
            })
            })
    },

    addItemToMinicart(){
        [...$shelf.btn].map((button) => {
            button.addEventListener('click', ({currentTarget}) => {
                const elementId = currentTarget.firstChild.getAttribute('data-productId');
                fetch(`/api/catalog_system/pub/products/search/?fq=productId:${elementId}`)
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                        console.log('skuproduct')
                    let skuItem = response[0].items[0].itemId
                    const item = {
                        id: skuItem,
                        quantity: 1,
                        seller: '1'
                    }
                    vtexjs.checkout.addToCart([item], null, 1)
                        .done(function(orderForm) {
                            alert('Item adicionado!');
                            console.log(orderForm);
                        });
                })
            })
        })
    }
}


export default {
    init: Methods.init,
} 





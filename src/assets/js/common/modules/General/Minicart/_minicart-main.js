import GlobalSelector from "../_global-selector";
import {getOrderForm, updateItem, addToCart, removeItem} from "../utils/_VTEXHelpers";
import {openOverlay, closeOverlay, ajaxLoader, finishAjaxLoader} from "../utils/methods";

const {$minicart, $shelf, $globals} = GlobalSelector;

const Methods = {
    init(){
        Methods.closeMinicart();
        Methods.openMinicart();
        Methods.priceAmountMinicart();
        Methods.amountItemsMinicart();
        Methods.createShelfProducts();
        Methods.addItemToMinicart();
    },
    openMinicart(){
        $minicart.openMinicart.addEventListener('click', () => {
            Methods.__minicartIsOpen();
        })
    },
    closeMinicart(){
        $minicart.closeMinicart.addEventListener('click', () => {
            closeOverlay($minicart.shelf)
        })
        $globals.overlay.addEventListener('click', () => {
            closeOverlay($minicart.shelf)
        })
    },
    __minicartIsOpen(){
        $minicart.shelf.classList.add('is--active');
        openOverlay();
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
                $minicart.amount.textContent = result.items.length < 10 ? `0${result.items.length}` : result.items.length;  
            })
    },
    __createItems(items, itemIndex){
        const wrapperProduct = document.createElement('div');
        const imgProduct = document.createElement('img');
        const containerProduct = document.createElement('div');
        const nameProduct = document.createElement('p');
        const priceDiscountProduct = document.createElement('del');
        const priceProduct = document.createElement('span');
        const linkProduct = document.createElement('a');
        const removeItem = document.createElement('span');

        wrapperProduct.classList.add('rr-product__wrapper')
        imgProduct.classList.add('rr-product__img')
        containerProduct.classList.add('rr-product__container')
        nameProduct.classList.add('rr-product__name')
        priceProduct.classList.add('rr-product__price')
        priceDiscountProduct.classList.add('rr-product__old-price')
        removeItem.classList.add('rr-product__remove')
        
        $minicart.products.appendChild(wrapperProduct)
        linkProduct.appendChild(imgProduct);
        wrapperProduct.appendChild(linkProduct);
        wrapperProduct.appendChild(containerProduct)
        wrapperProduct.appendChild(removeItem)
        containerProduct.appendChild(nameProduct)
        containerProduct.appendChild(priceDiscountProduct)
        containerProduct.appendChild(priceProduct)

        removeItem.addEventListener('click', ({currentTarget}) => {
            Methods.__removeToItem(currentTarget);
        });

        removeItem.setAttribute('data-index', `${itemIndex}`)
        linkProduct.setAttribute('href', items.detailUrl);
        imgProduct.setAttribute('src', items.imageUrl.replace('-55-55', '-80-80'))
        nameProduct.textContent = items.name
        priceDiscountProduct.textContent = items.listPrice == items.price ? priceDiscountProduct.remove() : (items.listPrice / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
        priceProduct.textContent = (items.price / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
    },
    __minicartEmpy(){
        $minicart.empy.classList.add('is--active');
        if($minicart.products.classList.contains('is--active') || $minicart.bottom.classList.contains('is--active')){
            $minicart.products.classList.remove('is--active');
            $minicart.bottom.classList.remove('is--active');
        }
    },
    __minicartNotEmpy(){
        $minicart.products.classList.add('is--active');
        $minicart.bottom.classList.add('is--active');
        if($minicart.empy.classList.contains('is--active')){
            $minicart.empy.classList.remove('is--active');
        }
    },
    createShelfProducts(){
        getOrderForm()
            .then((result) => {
                if(!result.items.length){
                    Methods.__minicartEmpy();
                }else{
                    Methods.__minicartNotEmpy();
                    const items = result.items;
                    for(let i = 0; i < items.length; i++){
                        Methods.__createItems(items[i], [i])
                    }
                }
            })
    },
    addItemToMinicart(){
        [...$shelf.btn].map((button) => {
            button.addEventListener('click', ({currentTarget}) => {
                Methods.__minicartIsOpen();
                Methods.__minicartNotEmpy();
                console.log("clicado")
                const elementId = currentTarget.firstChild.getAttribute('data-productId');
                fetch(`/api/catalog_system/pub/products/search/?fq=productId:${elementId}`)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result[0].items[0].itemId)
                        let skuItem = result[0].items[0].itemId
                        const item = {
                            id: skuItem,
                            quantity: 1,
                            seller: '1'
                        }
                        Methods.__validateProductInMinicart(skuItem, item)
                    })
            })
        })
    },
    __validateProductInMinicart(skuItem, item){
        getOrderForm()
            .then((response) => {
                const itemsId = response.items.map((el) =>  el.id)
                const validateProduct = itemsId.indexOf(skuItem);
                if(validateProduct != -1){
                    alert('Esse produto já existe no carrinho!')
                }
                else{
                    ajaxLoader();
                    Methods.__addToItem(item);
                }
            })
    },
    __addNewItemMinicart(){
        getOrderForm()
            .then((result) => {
                const items = result.items.slice(-1)[0];
                const indexNewItem = (result.items.length) -1; 
                Methods.__createItems(items, indexNewItem);
            })
    },
    __addToItem(item){
        addToCart(item)
            .done((response) => {
                console.log('Item adicionado!');
                finishAjaxLoader();
                Methods.__addNewItemMinicart();
                Methods.priceAmountMinicart();
                Methods.amountItemsMinicart();
            });
    },

    __removeToItem(currentTarget){
        ajaxLoader()
        const indexProduct = currentTarget.getAttribute('data-index');
        currentTarget.parentNode.remove();
        getOrderForm()
            .then((result) => {
                const itemToRemove = [{
                    "index": indexProduct,
                    "quantity:": 1,
                }]
                return removeItem(itemToRemove)
            }).done((result) => {
                console.log('item removido');
                if(!result.items.length){
                    Methods.__minicartEmpy();
                }
                Methods.__updatedIndexProduct();
                Methods.priceAmountMinicart();
                Methods.amountItemsMinicart();
                finishAjaxLoader();
              })
    },
    __updatedIndexProduct(){
        const itemIndex = document.querySelectorAll('.rr-product__remove');
        getOrderForm()
            .then((result) => { 
                const index = result.items;
                for(let i = 0; i < index.length; i++){
                    console.log(itemIndex[i])
                    itemIndex[i].setAttribute('data-index', `${i}`)
                }
        });
    }
}

export default {
    init: Methods.init,
} 





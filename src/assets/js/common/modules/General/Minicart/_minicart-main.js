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
                if(result.totalizers.length != 0){
                    $minicart.price.textContent = (result.totalizers[0].value / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
                }
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
        const pricePercentage = document.createElement('span')
        const priceProduct = document.createElement('span');
        const linkProduct = document.createElement('a');
        const removeItem = document.createElement('span');
        const containerQty = document.createElement('div')
        const quantityMore = document.createElement('a');
        const quantityValue = document.createElement('input');
        const quantityLess = document.createElement('a');

        wrapperProduct.classList.add('rr-minicart-product__wrapper')
        imgProduct.classList.add('rr-minicart-product__img')
        containerProduct.classList.add('rr-minicart-product__container')
        nameProduct.classList.add('rr-minicart-product__name')
        pricePercentage.classList.add('rr-minicart-product__price-percentage')
        priceProduct.classList.add('rr-minicart-product__price')
        priceDiscountProduct.classList.add('rr-minicart-product__old-price')
        removeItem.classList.add('rr-minicart-product__remove')
        containerQty.classList.add('rr-minicart-product__qty')
        quantityLess.classList.add('js--minicart-qty', 'rr-minicart-product__qty--less')
        quantityValue.classList.add('rr-minicart-product__qty--val')
        quantityMore.classList.add('js--minicart-qty','rr-minicart-product__qty--more')

        $minicart.products.appendChild(wrapperProduct)
        linkProduct.appendChild(imgProduct);
        wrapperProduct.appendChild(linkProduct);
        wrapperProduct.appendChild(containerProduct)
        wrapperProduct.appendChild(removeItem)
        containerQty.appendChild(quantityLess)
        containerQty.appendChild(quantityValue)
        containerQty.appendChild(quantityMore)
        containerProduct.appendChild(nameProduct)
        containerProduct.appendChild(priceDiscountProduct)
        containerProduct.appendChild(priceProduct)
        containerProduct.appendChild(pricePercentage)
        containerProduct.appendChild(containerQty)

        quantityMore.addEventListener('click', ({currentTarget}) => {
            ajaxLoader();
            Methods.__changeQuantityItem(currentTarget);
        })
        quantityLess.addEventListener('click', ({currentTarget}) => {
            ajaxLoader();
            Methods.__changeQuantityItem(currentTarget);
        })
        removeItem.addEventListener('click', ({currentTarget}) => {
            Methods.__removeToItem(currentTarget);
        });
        removeItem.textContent = "X";
        quantityValue.setAttribute('type', 'text')
        quantityValue.setAttribute('readonly', 'readonly')
        quantityValue.setAttribute('value', `${items.quantity}`)
        quantityLess.setAttribute('data-qty', '-')
        quantityMore.setAttribute('data-qty', '+')
        removeItem.setAttribute('data-index', `${itemIndex}`)
        linkProduct.setAttribute('href', items.detailUrl);
        imgProduct.setAttribute('src', items.imageUrl.replace('-55-55', '-120-120'))
        nameProduct.textContent = items.name
        priceDiscountProduct.textContent = Methods.__priceItems(items, priceDiscountProduct, pricePercentage);
        priceProduct.textContent = (items.price / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
        if(quantityValue.value == 1){
            quantityLess.classList.add('is--disabled');
        }
    },
    __priceItems(items, priceDiscountProduct, pricePercentage){
        if(items.listPrice == items.price){
            priceDiscountProduct.remove();
            pricePercentage.remove();
        }else{
            (items.listPrice / 100).toLocaleString('pt-BR',{style: 'currency', currency:'BRL'}); 
            if( porcetage != 0){
                const porcetageDiscount = (((( items.price / 100) / ((items.listPrice / 100))) - 1) * 100)
                pricePercentage.textContent =`${porcetageDiscount}%`
            }
        }
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
                ajaxLoader();
                Methods.__minicartIsOpen();
                Methods.__minicartNotEmpy();
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
                if(validateProduct === -1){
                    Methods.__addToItem(item);
                }else{
                    finishAjaxLoader();
                }
            })
    },
    __addToItem(item){
        addToCart(item)
            .done((response) => {
                finishAjaxLoader();
                console.log('Item adicionado!');
                Methods.__addNewItemMinicart();
                Methods.priceAmountMinicart();
                Methods.amountItemsMinicart();
                finishAjaxLoader();
            });
    },

    __addNewItemMinicart(){
        getOrderForm()
            .then((result) => {
                const items = result.items.slice(-1)[0];
                const indexNewItem = (result.items.length) -1; 
                Methods.__createItems(items, indexNewItem);
            })
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
        const itemIndex = document.querySelectorAll('.rr-minicart-product__remove');
        getOrderForm()
            .then((result) => { 
                const index = result.items;
                for(let i = 0; i < index.length; i++){
                    itemIndex[i].setAttribute('data-index', i)
                }
        });
    },
    __changeQuantityItem(currentTarget){
        const currentIndex = currentTarget.parentNode.parentNode.nextSibling.dataset.index;
        const currentOperator = currentTarget.dataset.qty;
        const currentValue = currentTarget.parentNode.firstElementChild.nextElementSibling;
        getOrderForm()
            .then((result) => {
                const currentQuantity = result.items[currentIndex].quantity;
                let newQuantity = currentQuantity;
                if(currentOperator == '+'){
                    newQuantity += 1
                    if(currentTarget.parentNode.firstElementChild.classList.contains('is--disabled')){
                        currentTarget.parentNode.firstElementChild.classList.remove('is--disabled')
                    }
                }
                else{
                    newQuantity -= 1
                    if(newQuantity == 1){
                        currentTarget.classList.add('is--disabled')
                    }
                }
                const updateQty = {
                    index: currentIndex,
                    quantity : newQuantity
                }
                return updateItem(updateQty)
                    .done((orderForm) => {
                        Methods.priceAmountMinicart();
                        finishAjaxLoader();
                        if(!$minicart.products.childNodes.length == 0){
                            if(!newQuantity == 0){
                                const changeValueQuantity = orderForm.items[currentIndex].quantity;
                                currentValue.setAttribute('value', `${changeValueQuantity}`)
                            }
                        }else{
                            Methods.amountItemsMinicart();
                            Methods.__minicartEmpy();
                            closeOverlay($minicart.shelf)
                        }
                    });
            })
    },
}

export default {
    init: Methods.init,
} 





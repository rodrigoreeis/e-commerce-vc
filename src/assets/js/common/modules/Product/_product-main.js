//  import cacheSelector from "./_cache-selector";

const Methods = {
  init() {
    Methods.getProductInfo();
  },
  // getProductInfo() {
  //   const _productId = skuJson_0.productId;
  //   fetch(`/api/catalog_system/pub/products/search/?fq=productId:${_productId}`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //     }).catch((error) => {
  //       console.log('bar', error.message);
  //     });
  // },
}; 
export default {
  init: Methods.init,
};

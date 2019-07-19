export const productSearch = () => {
	const { productId } = skuJson_0;
	return fetch(`/api/catalog_system/pub/products/search/?fq=productId:${productId}`).then((response) => response.json());
};
export const getOrderForm = () => {
    return vtexjs.checkout.getOrderForm()
};

export const updateOrderForm = (string, object) => {
    return vtexjs.checkout.sendAttachment(string, object)
};

export const addToCart = (item) => {
    return vtexjs.checkout.addToCart([item])
}
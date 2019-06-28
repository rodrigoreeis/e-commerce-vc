import cacheSelector from "../_global-selector";

const {$globals, $loader} = cacheSelector;

export const openOverlay = () => {
    $globals.overlay.classList.add('is--active');
    $globals.body.classList.add('is--lock')
}
export const closeOverlay = (element) => {
    $globals.overlay.classList.remove('is--active');
    $globals.body.classList.remove('is--lock')
    element.classList.remove('is--active')
}

export const ajaxLoader = () => {
    $loader.shelf.classList.remove('is--remove')
}
export const finishAjaxLoader = () => {
    $loader.shelf.classList.add('is--remove')
}
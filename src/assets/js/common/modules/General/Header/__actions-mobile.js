import cacheSelector from "../_global-selector";

const {$header,$globals} = cacheSelector;

const Methods = {
    init(){
        if(window.innerWidth < 768) {
            // Methods.activeHeader();
        }
    },
    activeHeader(){
        $header.shelf.classList.add('is--active')
    }
}

export default{
    init: Methods.init
}
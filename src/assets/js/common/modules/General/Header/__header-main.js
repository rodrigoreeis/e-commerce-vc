import cacheSelector from "../_global-selector";
import {openOverlay, closeOverlay} from "../methods";

const {$header,$globals} = cacheSelector;

const Methods = {
    init(){
        Methods.openMenu();
        Methods.closeMenu();
        Methods.debouceEventScroll();
    },
    openMenu(){
        $header.openMenu.addEventListener('click', () => {
            openOverlay();
            $header.menu.classList.add('is--active');
        })
    },
    closeMenu(){
        $globals.overlay.addEventListener('click', () => {
            closeOverlay($header.menu)
        })
    },
   
    debouceEventScroll(){
        let debounce_timer;
        window.onscroll = () => {
            if(debounce_timer) {
                window.clearTimeout(debounce_timer);
            }
            debounce_timer = window.setTimeout(() => {
                Methods.__actionScrollHeader();
            }, 100);
        };
    },
    /**
    * @access private
    */
    __actionScrollHeader(){
        if($header.el.nextElementSibling.getBoundingClientRect().top < 0){
            $header.el.classList.add('is--active')
        }else{
            $header.el.classList.remove('is--active')
        }
    },

}

export default{
    init: Methods.init
}
import cacheSelector from "../_global-selector";
import selector from "./__cache-selector";

const {$header,$globals} = cacheSelector;
const {subCategory:El} = selector;

const Methods = {
    init(){
        Methods.openMenu();
        Methods.closeMenu();
        Methods.openSubCategory();
    },
    openMenu(){
        $header.openMenu.addEventListener('click', () => {
            $header.menu.classList.add('is--active');
            $globals.overlay.classList.add('is--active')
        })
    },
    closeMenu(){
        $globals.overlay.addEventListener('click', () => {
            Methods.__removeAllSubCategoryOpen();
            $globals.overlay.classList.remove('is--active');
            $header.menu.classList.remove('is--active');
        })
    },
    openSubCategory(){
        [...El].map((elements) => {
            elements.addEventListener('click', ({currentTarget}) => {
                if(!currentTarget.classList.contains('is--active')){
                    currentTarget.classList.add('is--active');
                    Methods.__removeAllSubCategoryOpen();
                    document.querySelector(`.rr-sub-category__list[data-category='${currentTarget.dataset.category}']`).classList.toggle('is--active');
                }else{
                    currentTarget.classList.remove('is--active')
                    Methods.__removeAllSubCategoryOpen();
                }
            })
        })
    },
    /**
     * @access private
     */
    __removeAllSubCategoryOpen(){
        const categoryList = document.querySelectorAll('.rr-sub-category__list');
            [...categoryList].map((el) => {
                el.classList.remove('is--active')
            });
            
    },
}

export default{
    init: Methods.init
}
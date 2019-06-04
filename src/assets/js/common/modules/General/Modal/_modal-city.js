import GlobalSelector from "../_global-selector";
import { getOrderForm, updateOrderForm} from "../_VTEXHelpers";

const {$modalCity} = GlobalSelector;
const {$globals} = GlobalSelector;
const Methods = {
    init() {
        if(!localStorage.cidade){ 
            Methods.modalPopUpCity();
        }
    },
    modalPopUpCity() {
        $globals.body.classList.add('is--lock');
        $modalCity.modal.classList.add('is--active');
        $modalCity.formModalCity.addEventListener('submit', (ev) => {
            ev.preventDefault();
            localStorage.cidade = $modalCity.formModalCitySelect.value;
            Methods.__chekoutUpdateCity();
            $modalCity.modal.classList.remove('is--active');
            $globals.body.classList.remove('is--lock');
        })
    },
    __chekoutUpdateCity(){
        getOrderForm()
            .then((result) => {
                const marketingData = {utmiCampaign:localStorage.cidade}
                return updateOrderForm('marketingData', marketingData);
            }).done((result) => {
                console.log(result, 'estado alterado')
            })
    },
    //GEOLOCATION CODE API get your latitude and longitude end consume google api 
    // __geolocationState(){
    //     $modalCity.geolocation.addEventListener('click', () => {
    //         const sucess = (position) => {
    //             const location  = {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude
    //             }    
    //             console.log(location);
    //             fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyApUU68FMDkcxsXE-f-kKAGv2NWzMOjBvQ`)
    //                 .then((response) => response.json())
    //                 .then((response) => {
    //                   console.log(response);
    //                 }).catch((error) => {
    //                   console.log('bar', error.message);
    //                 });
    //         }
    //         const error = () => {
    //             console.log('impossivel achar sua localizacao')
    //         }
    //         if(!navigator.geolocation) {
    //             $modalCity.geolocation.style.display = "none";
    //         }else {
    //             console.log('Locating…');
    //             navigator.geolocation.getCurrentPosition(sucess, error);
    //         }
    //     })
    // },
}

export default {
    init: Methods.init,
} 

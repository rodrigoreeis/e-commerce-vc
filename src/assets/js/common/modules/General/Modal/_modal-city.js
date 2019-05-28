import GlobalSelector from "../_global-selector";

const {$modalCity} = GlobalSelector;

const Methods = {
    init() {
        if(!localStorage.cidade){
            Methods.modalPopUpCity();
        }
        // Methods.__geolocationState();
    },
    modalPopUpCity() {
        $modalCity.formModalCity.addEventListener('submit', (ev) => {
            ev.preventDefault();
            console.log(ev);
            localStorage.cidade = $modalCity.formModalCitySelect.value;
            Methods._chekoutUpdateCity();
            $modalCity.closeModal.classList.add('is--remove');
        })
    },
    _chekoutUpdateCity(){
        vtexjs.checkout.getOrderForm()
            .then((result) => {
                const marketingData = {utmiCampaign:localStorage.cidade}
                return vtexjs.checkout.sendAttachment('marketingData', marketingData);
            }).done((response) => {
                console.log(response);
                console.log("Estado selecionado!");
            })
    },

    __geolocationState(){
        $modalCity.geolocation.addEventListener('click', () => {
            const sucess = (position) => {
                const location  = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }    
                console.log(location);
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyApUU68FMDkcxsXE-f-kKAGv2NWzMOjBvQ`)
                    .then((response) => response.json())
                    .then((response) => {
                      console.log(response);
                    }).catch((error) => {
                      console.log('bar', error.message);
                    });
            }
            const error = () => {
                console.log('impossivel achar sua localizacao')
            }
            if(!navigator.geolocation) {
                $modalCity.geolocation.style.display = "none";
            }else {
                console.log('Locating…');
                navigator.geolocation.getCurrentPosition(sucess, error);
            }
        })
    },
   
 
   
}
export default {
  init: Methods.init,
}

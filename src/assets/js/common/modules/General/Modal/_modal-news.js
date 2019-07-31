import GlobalSelector from '../_global-selector';
import {openOverlay, closeOverlay}from '../utils/methods';

const {$modalNews, $header, $globals} = GlobalSelector;

const Methods = {
	init(){
		if (!localStorage.novidades){
			Methods.openModalNews();
		}    
		Methods.closeModal();
		Methods.__BtnsModalNews();
		Methods.sendEmailMasterData();
	},
	openModalNews(){
		$header.news.classList.add('is--active');
		$modalNews.shelf.classList.add('is--active');
		openOverlay();
		$header.news.firstElementChild.firstElementChild.addEventListener('click', (ev) =>{
			ev.preventDefault();
			$modalNews.shelf.classList.add('is--active');
			openOverlay();
			console.log('clicado', ev.currentTarget);
		});
	},
	closeModal(){
		$globals.overlay.addEventListener('click', () => {
			Methods.__BtnsModalNews();
			closeOverlay($modalNews.shelf);
		});
	},
	__BtnsModalNews(){
		const btnClose = document.querySelectorAll('.js--close');
		[...btnClose].map((el) => {
			el.addEventListener('click', () => {
				closeOverlay($modalNews.shelf);
			});
		});
	},
	sendEmailMasterData(){
		$modalNews.newsletter.addEventListener('submit', (ev) => {
			ev.preventDefault();
			$modalNews.btn.textContent = 'enviando...';
			$modalNews.btn.classList.add('is--loading');
			const _userEmail = {
				Email: `${$modalNews.newsletter.firstElementChild.value}`
			};
			const _localHeaders = new Headers();
			_localHeaders.append('Accept', 'application/vnd.vtex.ds.v10+json');
			_localHeaders.append('Content-Type', 'application/json');
			_localHeaders.append('REST-Range', 'resources=0-150');
			const _urlToSearch = 'http://api.vtex.com/vult/dataentities/NV/documents';
			const _vtexHeaderConfig = {
				method: 'PUT',
				mode: 'cors',
				headers: _localHeaders,
				body: JSON.stringify(_userEmail)
			};
			fetch(_urlToSearch, _vtexHeaderConfig)
				.then(response => response.json())
				.then(() => {
					localStorage.novidades = true;
					$header.news.classList.remove('is--active');
					$modalNews.btn.textContent = 'Enviado!';
					setTimeout(() => {
						closeOverlay($modalNews.shelf);
					}, 1000);
				}).catch(() => {
					alert('Ocorreu um erro! tente novamente');
					$modalNews.btn.classList.remove('is--loading');
				});
		});
	}
};

export default {
	init: Methods.init,
}; 

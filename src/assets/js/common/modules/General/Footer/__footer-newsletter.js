const Methods = {
	init(){
		Methods.submitNewsletter();
	},  

	submitNewsletter(){
		const submit = document.querySelector('.js--newsletter--form');
		submit.addEventListener('submit', (ev) => {
			ev.preventDefault();    
			const _userEmail = {
				Email: `${submit.firstChild.value}`
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
				.then((data) => {
					console.log(data);
				});
		});
	},
}; 
export default {
	init: Methods.init
};
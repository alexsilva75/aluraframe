
import {NegociacaoController} from './controllers/NegociacaoController.js';
import {} from './polyfill/fetch.js';

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.aciciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);

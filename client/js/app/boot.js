
import {NegociacaoController} from '../app-es6/controllers/NegociacaoController.js';
import {} from '../app-es6/polyfill/fetch.js';

let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.aciciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);

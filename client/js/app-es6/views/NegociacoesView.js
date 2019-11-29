import {View} from './View.js';
import {DateHelper} from '../helpers/DateHelper.js';
import { currentInstance } from '../controllers/NegociacaoController.js';
export class NegociacoesView extends View{


    constructor(elemento){

        super(elemento);
        elemento.addEventListener('click', function(event){

            if(event.target.nodeName == 'th'){
                currentInstance().ordena(event.target.textContent.toLowerCase());
            }
        });

    }


    template(model){
        //var volumeTotal = 0; 
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
        
                <tbody>
                    ${model.negociacoes.map((n) =>{
                        //volumeTotal += n.volume;
                        return `
                                <tr>
                                    <td>
                                        ${DateHelper.dataParaTexto(n.data)}
                                    </td>
                                    <td>
                                        ${n.quantidade}
                                    </td>
                                    <td>
                                        ${n.valor}
                                    </td>
                                    <td>
                                        ${n.volume}
                                    </td>
                                </tr>
                        `
                    }).join('')}
                </tbody>
        
                <tfoot>
                   
                    <td colspan='3'>Total</td>
                    <td>${model.volumeTotal}</td>
                   
                </tfoot>
            </table>
        `

        
    }//template


}//NegociacoesView


/*


*/ 
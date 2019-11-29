import {View} from './View.js';
import {DateHelper} from '../helpers/DateHelper.js';
export class NegociacoesView extends View{


    constructor(elemento){

        super(elemento);

    }


    template(model){
        //var volumeTotal = 0; 
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="negociacaoController.ordena('data')">DATA</th>
                        <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                        <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                        <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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
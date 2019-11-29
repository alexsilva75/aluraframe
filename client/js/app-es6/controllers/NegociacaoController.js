import {HttpService} from '../services/HttpService.js';
import {NegociacaoService} from '../services/NegociacaoService.js';
import {Bind} from '../helpers/Bind.js';
import {DateHelper} from '../helpers/DateHelper.js';
import {Negociacao} from '../models/Negociacao.js';
import {ListaNegociacoes} from '../models/ListaNegociacoes.js';
import {Mensagem} from '../models/Mensagem.js';
import {MensagemView} from '../views/MensagemView.js';
import {NegociacoesView} from '../views/NegociacoesView.js';

export class NegociacaoController{

    constructor(){
        var $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputData = $('#data');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
                new NegociacoesView($("#negociacoesView")),'adiciona',
                'esvazia','ordena','inverteOrdem');
                     
        this._mensagem = new Bind(new Mensagem(), 
                new MensagemView($("#mensagemView")),'texto');
        this._httpService = new HttpService();
        this._service = new NegociacaoService(this._httpService);
        this._ordemAtual = '';
        
        this._init();
       
    }

    _init(){
        this._service
            .lista()
            .then(negociacoes =>{
                negociacoes.forEach(negociacao =>{
                    this._listaNegociacoes.adiciona(negociacao);
                });

                
            }).catch(erro=>{
                console.log(erro);

                this._mensagem.texto = 'Não foi possível obter as negociações.'
            });


        setInterval(() =>{
            this.importaNegociacoes();
        },3000);
    }//_init

    adiciona(event){

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then( mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch( erro =>{
                this._mensagem.texto = erro;
            });

        
                  

    }//fim adiciona

    apaga(){

        this._service
            .apaga()
            .then( message =>{
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = message;
            }).catch(erro =>{
                this._mensagem.texto = erro;
            });
 

        this._limpaFormulario();  
    }

    _criaNegociacao(){
        return new Negociacao(DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value));
    }

    _limpaFormulario(){
        
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    importaNegociacoes(){
  
        this._service
            .importa(this._listaNegociacoes)
            .then(message => this._mensagem.texto = message)
            .catch(error => this._mensagem.texto = error);
       
       
       /*obterNegociacoes()
       .then(
            negociacoes => {
            return negociacoes.filter( negociacao => 
            !this._listaNegociacoes.negociacoes
            .some(negociacaoExistente => 
                JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao) ))})
       .then(negociacoes => {
           console.log(negociacoes);
         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
         this._mensagem.texto = 'Negociações do período importadas com sucesso';
       })
       .catch(error => this._mensagem.texto = error);*/

    }//fim importaNegociacoes

    

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
            console.log('Invertendo....');
        }else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }

        this._ordemAtual = coluna;
    }
}//fim classe


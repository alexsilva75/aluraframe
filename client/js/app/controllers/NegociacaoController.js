
class NegociacaoController{

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
        this._negociacaoService = new NegociacaoService(this._httpService);
        this._ordemAtual = '';


        ConnectionFactory
            .getConnection()
            .then(connection =>{
                new NegociacaoDao(connection)
                    .listaTodos()
                    .then(negociacoes =>{
                        negociacoes.forEach(negociacao =>{
                            this._listaNegociacoes.adiciona(negociacao);
                        });

                        
                    }).catch(erro=>{
                        console.log(erro);

                        this._mensagem.texto = 'Não foi possível obter as negociações.'
                    });
            });
    }


    adiciona(event){

        event.preventDefault();
          ConnectionFactory
          .getConnection()
          .then(connection => {
              let negociacao = this._criaNegociacao();

              new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(()=>{
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso!';
                        this._limpaFormulario();
                    })
          }).catch(erro =>{
            this._mensagem.texto = erro;

          });//fim catch
                  

    }//fim adiciona

    apaga(){
        ConnectionFactory
        .getConnection()
        .then(connection => {
            new NegociacaoDao(connection)
                .apagaTodos().then( message =>{
                    this._mensagem.texto = message;
                }).catch(erro =>{
                    this._mensagem.texto = erro;
                });
        });

        this._listaNegociacoes.esvazia();

        

      //  this._mensagem.texto = 'A lista foi apagada com sucesso!';
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
  
       this._negociacaoService
       .obterNegociacoes()
       .then(negociacoes => {negociacoes.filter(negociacao => 
            this._listaNegociacoes.negociacoes.indexOf(negociacao) == -1)})
       .then(negociacoes => {
         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
         this._mensagem.texto = 'Negociações do período importadas com sucesso';
       })
       .catch(error => this._mensagem.texto = error);

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
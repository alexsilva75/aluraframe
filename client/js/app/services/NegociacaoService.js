class NegociacaoService{

        /**
                 * 0: requisicao ainda nao iniciada
                 * 1: conexao com o servidor estabelecida
                 * 2: requisicao recebida
                 * 3: processando requisicao
                 * 4: requisicao concluida e a resposta esta pronta
                 */

    constructor(httpService){
        this._http = httpService;
    }

    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject)=>{
                this._http.get('http://localhost:3000/negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto =>                                              
                        new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                })
                .catch(error => {
                    console.log(error);    
                    reject("Não foi possível obter as negociacoes da semana.")
                });                       
                   
        });

    
    }//obterNegociacoesDaSemana()
    

    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');
    
            xhr.onreadystatechange = () =>{
            
    
                 if(xhr.readyState == 4){
                     if(xhr.status ==200){
                        console.log("Buscando negociacoes");
                        let negociacoes = JSON.parse(xhr.responseText).map(objeto =>                                              
                             new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)
                        );
                        //this._mensagem.texto = 'As negociacoes foram importadas com sucesso!';
                        resolve(negociacoes);
                       
                     }else{
                        console.log(xhr.responseText);
                        //this._mensagem.texto = 'Não foi possível obter as negociacoes da semana';
                        reject('Não foi possível obter as negociacoes da semana retrasada');
                     }//fim else
                 }//fim if externo
            }// xhr.onreadystatechange = () =>{
    
    
            xhr.send();
        });
    }


    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');
    
            xhr.onreadystatechange = () =>{
            
    
                 if(xhr.readyState == 4){
                     if(xhr.status ==200){
                        console.log("Buscando negociacoes");
                        let negociacoes = JSON.parse(xhr.responseText).map(objeto =>                                              
                             new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)
                        );
                        //this._mensagem.texto = 'As negociacoes foram importadas com sucesso!';
                        resolve(negociacoes);
                       
                     }else{
                        console.log(xhr.responseText);
                        //this._mensagem.texto = 'Não foi possível obter as negociacoes da semana';
                        reject('Não foi possível obter as negociacoes da semana anterior');
                     }//fim else
                 }//fim if externo
            }// xhr.onreadystatechange = () =>{
    
    
            xhr.send();
        });
    }



    
    obterNegociacoes() {


        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    } 


    cadastra(negociacao){
        return ConnectionFactory
                .getConnection()
                .then(connection =>               
                    new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(()=>'Negociação adicionada com sucesso!')
                    .catch(()=> {throw new Error('Não foi possível adicionar a negociacao.')})
          );//fim then
    }
}//fim class
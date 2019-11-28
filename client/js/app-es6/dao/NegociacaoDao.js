class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';

    }//fim constructor


    adiciona(negociacao){
        return new Promise((resolve, reject)=>{

            let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .add(negociacao);

            request.onsuccess = e =>{
                console.log('Gravou');
                resolve();
            };

            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação.')
            };

        });//new Promise
    }//adiciona


    listaTodos(){
        return new Promise((resolve, reject) =>{

            let cursor = this._connection.
                transaction([this._store],'readwrite').
                objectStore(this._store).
                openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;

                if(atual){
                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            };//onsuccess

            cursor.onerror = e =>{
                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações.');
            };//onerror

        });//new Promise

    }//listaTodos


    apagaTodos(){
        return new Promise((resolve, reject) =>{
            let request = this._connection.
                transaction([this._store],'readwrite').
                objectStore(this._store).
                clear();

                request.onsuccess = e =>{
                    resolve('Negociações removidas com sucesso!');
                };

                request.onerror = e =>{
                    console.log(e);
                    reject('Não foi possível apagar as negociações.');
                };
        });
    }

}//NegociacaoDao
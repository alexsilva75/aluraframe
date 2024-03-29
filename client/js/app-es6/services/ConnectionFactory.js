    const stores = ['negociacoes'];
    const version = 3;
    const dbName = 'aluraframe';
    var connection = null;
    var close = null;

    export class ConnectionFactory{


        constructor(){
            throw new Error("Esta classe nao pode ser instanciada.");
        }


        static getConnection(){
            return new Promise((resolve, reject) => {
                var openRequest = window.indexedDB.open(dbName, version);

                var connection;

                openRequest.onupgradeneeded = e => {
                    
                ConnectionFactory._createStores(e.target.result); 
                
                };
        
                openRequest.onsuccess = e =>{

                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error('Você não pode fechar a conexão diretamente.');
                        }
                    
                    }
                    resolve(connection);

                };
        
        
                openRequest.onerror =  e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
        
            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, {autoIncrement: true});
            });

        }

        static closeConnection(){
            if(connection){
                close();
                connection = null;
            }
        }
    }

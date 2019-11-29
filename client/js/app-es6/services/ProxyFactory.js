export class ProxyFactory{

    static create(objeto, props, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop]) ){
                    return function(){
                        console.log(`Interceptando ${prop}`);
                        
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        //self._negociacoesView.update(target);
                        acao(target);
                        return retorno;
                    }//fim function
                }//fim if

                return Reflect.get(target, prop, receiver);
            }//fim get
            ,
            set(target,prop,value,receiver){
                let retorno = Reflect.set(target,prop,value,receiver);
                if(props.includes(prop)){
                   // target[prop] = value;
                    acao(target);
                }
                
                return retorno; //Reflect.set(target,prop,value,receiver);
                
            }//fim set
        });
    }//fim create
    
    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}
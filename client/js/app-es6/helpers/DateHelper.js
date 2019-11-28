class DateHelper{

    constructor(){
        throw new Error('DateHelper nao pode ser instanciada');
    }


    static textoParaData(texto){
       if( !/^\d{4}-\d{2}-\d{2}$/.test(texto))        
            throw new Error('deve estar no formato yyyy-MM-dd');


      return  new Date(...texto.split('-').map((item, indice) => {
                if(indice == 1){
                    return --item;
                }
                return item;
            })
        );
    }// fim textoParaData


    static dataParaTexto(data){
       return `${data.getDate()}/${(data.getMonth()+1)}/${data.getFullYear()}`;
    }
}
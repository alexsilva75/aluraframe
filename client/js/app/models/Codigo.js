class Codigo{

    constructor(texto){
        this._formatoCodigo = new RegExp(/\D{3}-\D{2}-\d{2}/);

        if(!this._formatoCodigo.test(texto)){
            throw new Error('O formato do codigo deve ser XXX-XX-00');
        }//fim if

        this._textoCodigo = texto;
        Object.freeze(this);
    }

    get textoCodigo(){
        return this._textoCodigo.toString(); 
    }


}
export class View{


    constructor(elemento){

        this._elemento = elemento;


    }

    template(model){
        throw new Error("Metodo nao implementado.");


    }

    update(model){

        this._elemento.innerHTML = this.template(model);

    }

}
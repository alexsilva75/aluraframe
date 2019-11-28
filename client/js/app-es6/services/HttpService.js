class HttpService{


    _handleErrors(res){
        if(res.ok){
            return res;
        }else{
            throw new Error(res.statusText);
        }
    }//_handleErrors



    get(url){
        
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());

        /*return new Promise((resolve, reject) =>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
    
            xhr.onreadystatechange = () =>{
            
    
                 if(xhr.readyState == 4){
                     if(xhr.status ==200){
                        console.log("Buscando negociacoes");
                        let negociacoes = JSON.parse(xhr.responseText);
                    
                        resolve(negociacoes);
                       
                     }else{
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                     }//fim else
                 }//fim if externo
            }//fim xhr.onreadystatechange = () =>{
    
    
            xhr.send();
        });*/
    }//fim get

    post(url,dado){

        return fetch(url, {
            headers : {"Content-Type": "application/json" },
            method : 'post',
            body : JSON.stringify(dado)

        })
        .then(res => this._handleErrors())
        .then(res => res.json());

        /*return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }//fim else
                }//fim if
            }//
            xhr.send(JSON.stringify(dado));
        });*/
    }//post

}//fim class
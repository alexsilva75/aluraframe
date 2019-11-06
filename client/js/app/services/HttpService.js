class HttpService{

    get(url){
        return new Promise((resolve, reject) =>{
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
        });
    }//fim get

    post(url,dado){
        return new Promise((resolve, reject) => {
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
        });
    }

}//fim class
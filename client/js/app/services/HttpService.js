"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: "_handleErrors",
        value: function _handleErrors(res) {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        } //_handleErrors


    }, {
        key: "get",
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handleErrors(res);
            }).then(function (res) {
                return res.json();
            });

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
        } //fim get

    }, {
        key: "post",
        value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
                headers: { "Content-Type": "application/json" },
                method: 'post',
                body: JSON.stringify(dado)

            }).then(function (res) {
                return _this2._handleErrors();
            }).then(function (res) {
                return res.json();
            });

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
        } //post

    }]);

    return HttpService;
}(); //fim class
//# sourceMappingURL=HttpService.js.map
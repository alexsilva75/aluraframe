'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {

    /**
             * 0: requisicao ainda nao iniciada
             * 1: conexao com o servidor estabelecida
             * 2: requisicao recebida
             * 3: processando requisicao
             * 4: requisicao concluida e a resposta esta pronta
             */

    function NegociacaoService(httpService) {
        _classCallCheck(this, NegociacaoService);

        this._http = httpService;
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this._http.get('http://localhost:3000/negociacoes/semana').then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(error);
                    reject("Não foi possível obter as negociacoes da semana.");
                });
            });
        } //obterNegociacoesDaSemana()


    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');

                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log("Buscando negociacoes");
                            var negociacoes = JSON.parse(xhr.responseText).map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                            //this._mensagem.texto = 'As negociacoes foram importadas com sucesso!';
                            resolve(negociacoes);
                        } else {
                            console.log(xhr.responseText);
                            //this._mensagem.texto = 'Não foi possível obter as negociacoes da semana';
                            reject('Não foi possível obter as negociacoes da semana retrasada');
                        } //fim else
                    } //fim if externo
                }; // xhr.onreadystatechange = () =>{


                xhr.send();
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');

                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            console.log("Buscando negociacoes");
                            var negociacoes = JSON.parse(xhr.responseText).map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                            //this._mensagem.texto = 'As negociacoes foram importadas com sucesso!';
                            resolve(negociacoes);
                        } else {
                            console.log(xhr.responseText);
                            //this._mensagem.texto = 'Não foi possível obter as negociacoes da semana';
                            reject('Não foi possível obter as negociacoes da semana anterior');
                        } //fim else
                    } //fim if externo
                }; // xhr.onreadystatechange = () =>{


                xhr.send();
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []);

                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection).adiciona(negociacao).then(function () {
                    return 'Negociação adicionada com sucesso!';
                }).catch(function () {
                    throw new Error('Não foi possível adicionar a negociacao.');
                });
            }); //fim then
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection).listaTodos().catch(function (erro) {
                    throw new Error('Não foi possível obter as negociações:' + erro);
                });
            }); //fim then
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection).apagaTodos().catch(function (erro) {
                    throw new Error('Não foi possível obter as negociações:' + erro);
                });
            }); //fim then
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {

                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.negociacoes.some(function (negociacaoExistente) {
                        return negociacaoExistente.equals(negociacao);
                    });
                });
            })
            //JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao) ))})
            .then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return listaAtual.adiciona(negociacao);
                });
                return 'Negociações do período importadas com sucesso';
            }).catch(function (error) {
                return error;
            });
            ;
        } //importa


    }]);

    return NegociacaoService;
}(); //fim class
//# sourceMappingURL=NegociacaoService.js.map
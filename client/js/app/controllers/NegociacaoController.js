'use strict';

System.register(['../services/HttpService.js', '../services/NegociacaoService.js', '../helpers/Bind.js', '../helpers/DateHelper.js', '../models/Negociacao.js', '../models/ListaNegociacoes.js', '../views/MensagemView.js', '../views/NegociacoesView.js'], function (_export, _context) {
    "use strict";

    var HttpService, NegociacaoService, Bind, DateHelper, Negociacao, ListaNegociacoes, MensagemView, NegociacoesView, _createClass, NegociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesHttpServiceJs) {
            HttpService = _servicesHttpServiceJs.HttpService;
        }, function (_servicesNegociacaoServiceJs) {
            NegociacaoService = _servicesNegociacaoServiceJs.NegociacaoService;
        }, function (_helpersBindJs) {
            Bind = _helpersBindJs.Bind;
        }, function (_helpersDateHelperJs) {
            DateHelper = _helpersDateHelperJs.DateHelper;
        }, function (_modelsNegociacaoJs) {
            Negociacao = _modelsNegociacaoJs.Negociacao;
        }, function (_modelsListaNegociacoesJs) {
            ListaNegociacoes = _modelsListaNegociacoesJs.ListaNegociacoes;
        }, function (_viewsMensagemViewJs) {
            MensagemView = _viewsMensagemViewJs.MensagemView;
        }, function (_viewsNegociacoesViewJs) {
            NegociacoesView = _viewsNegociacoesViewJs.NegociacoesView;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoController', NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);
                    this._inputQuantidade = $('#quantidade');
                    this._inputData = $('#data');
                    this._inputValor = $('#valor');

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
                    this._httpService = new HttpService();
                    this._service = new NegociacaoService(this._httpService);
                    this._ordemAtual = '';

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            console.log(erro);

                            _this._mensagem.texto = 'Não foi possível obter as negociações.';
                        });

                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            _this2._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this3 = this;

                        this._service.apaga().then(function (message) {
                            _this3._listaNegociacoes.esvazia();
                            _this3._mensagem.texto = message;
                        }).catch(function (erro) {
                            _this3._mensagem.texto = erro;
                        });

                        this._limpaFormulario();
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0.0;

                        this._inputData.focus();
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this4 = this;

                        this._service.importa(this._listaNegociacoes).then(function (message) {
                            return _this4._mensagem.texto = message;
                        }).catch(function (error) {
                            return _this4._mensagem.texto = error;
                        });

                        /*obterNegociacoes()
                        .then(
                             negociacoes => {
                             return negociacoes.filter( negociacao => 
                             !this._listaNegociacoes.negociacoes
                             .some(negociacaoExistente => 
                                 JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao) ))})
                        .then(negociacoes => {
                            console.log(negociacoes);
                          negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                          this._mensagem.texto = 'Negociações do período importadas com sucesso';
                        })
                        .catch(error => this._mensagem.texto = error);*/
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                            console.log('Invertendo....');
                        } else {
                            this._listaNegociacoes.ordena(function (a, b) {
                                return a[coluna] - b[coluna];
                            });
                        }

                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }());

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map
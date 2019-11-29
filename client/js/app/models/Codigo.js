'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Codigo;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            Codigo = function () {
                function Codigo(texto) {
                    _classCallCheck(this, Codigo);

                    this._formatoCodigo = new RegExp(/\D{3}-\D{2}-\d{2}/);

                    if (!this._formatoCodigo.test(texto)) {
                        throw new Error('O formato do codigo deve ser XXX-XX-00');
                    } //fim if

                    this._textoCodigo = texto;
                    Object.freeze(this);
                }

                _createClass(Codigo, [{
                    key: 'textoCodigo',
                    get: function get() {
                        return this._textoCodigo.toString();
                    }
                }]);

                return Codigo;
            }();
        }
    };
});
//# sourceMappingURL=Codigo.js.map
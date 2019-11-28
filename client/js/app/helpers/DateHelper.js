'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('DateHelper nao pode ser instanciada');
    }

    _createClass(DateHelper, null, [{
        key: 'textoParaData',
        value: function textoParaData(texto) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('deve estar no formato yyyy-MM-dd');

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                if (indice == 1) {
                    return --item;
                }
                return item;
            })))))();
        } // fim textoParaData


    }, {
        key: 'dataParaTexto',
        value: function dataParaTexto(data) {
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map
/**
 * Module template
 * @return {Object} Public methods
 */
var TMPL = (function () {
  "use strict";

  /**
   * Command result output template
   * @param  {String} cmd Executed command
   * @param  {String} out Command result
   * @return {String}     Result HTML
   */
  var result = function (cmd, out) {
    return '<div class="result js-result">' +
             '<div class="result__cmd">' +
               '<div class="result__cmd__promt">' +
                 '<span class="result__cmd__promt__text">&gt;</span>' +
               '</div>' +
               '<div class="result__cmd__command">' +
                 '<span class="result__cmd__command__text">' + cmd + '</span>' +
               '</div>' +
             '</div>' +
             '<div class="result__out">' + out + '</div>' +
           '</div>';
  };

  /**
   * Usage statistics
   * @param  {Object} data Whole page usage stats and by tabs
   * @return {String}      Result HTML
   */
  var statDetails = function (data) {
    var output = 'Общее время работы со страницей: ' + data.all +
      '</div><div class="result__out">Детализация времени просмотра табов:';

    data.tabs.forEach(function (value, index) {
      output += '</div><div class="result__out result__out_indent">' + index + ' "' + value.name + '": ' + value.time;
    });

    return output;
  };

  return {
    result: result,
    statDetails: statDetails
  }
}());

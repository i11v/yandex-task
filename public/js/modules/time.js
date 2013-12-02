/**
 * Module time
 * @return {Object} Public methods
 */
var TIME = (function () {
  "use strict";

  /**
   * Declension numbers
   * @type {Array}
   */
  var stops = [0, 1, 2, 5];

  /**
   * Declension
   * @param  {Number} num   Declension number
   * @param  {Array}  rules Word forms
   * @return {String}       Correct result
   */
  var declension = function (num, rules) {
    var form = ""
      , mod = 0;

    if (num) {
      form = rules[0];

      if ((num % 100 < 10) || (num % 100 > 20)) {
        mod = num % 10;

        rules.forEach(function (rule, i) {
          mod >= stops[i] && (form = rule);
        });
      }

      return [num, form].join(" ");
    } else {
      return "";
    }
  };

  /**
   * Format time
   * @param  {Number} time Time in ms
   * @return {String}      Time in human language
   */
  var format = function (time) {
    var hours = declension(Math.round(time / 3600000), ["часов", "час", "часа", "часов"])
      , minutes = declension(Math.round(time / 60000), ["минут", "минута", "минуты", "минут"])
      , seconds = declension(Math.round(time / 1000 % 60), ["секунд", "секунда", "секунды", "секунд"]);

    return [hours, minutes, seconds].join(" ").trim();
  };

  return {
    format: format
  }
}());

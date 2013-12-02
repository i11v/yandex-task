;(function ($) {
  $.fn.focusEnd = function () {
    var input = this[0]
      , pos = input.value.length;

    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(pos, pos);
    } else if (input.createTextRange) {
      var range = input.createTextRange();

      range.collapse(true);
      range.moveStart("character", pos);
      range.moveEnd("character", pos);
      range.select();
    }

    return this;
  };
}(jQuery));

/**
 * Module cmd
 * @param  {Object} window   Window
 * @param  {Object} document DOM
 * @param  {Object} $        jQuery
 */
var CMD = (function (window, document, $, STRG, TABS) {
  "use strict";

  var currentCmdPos = -1
    , currentCmd = "";

  /**
   * Input handler
   * @param {Object} e Pressed key event object
   */
  var inputHandler = function (e) {
    switch (e.keyCode) {
      case 13:
        cmdHandler($(this));
        break;
      case 38:
        cmdHistoryBack($(this));
        break;
      case 40:
        cmdHistoryForward($(this));
        break;
    }
  };

  /**
   * Browse commands history back
   * @param {Object} $el Input element jQuery object
   */
  var cmdHistoryBack = function ($el) {
    currentCmdPos === -1 && (currentCmd = $el.val());
    currentCmdPos < (STRG.commands.len() - 1) && $el.val(STRG.commands.get(++currentCmdPos));
    window.setTimeout(function () { $el.focusEnd(); }, 0);
  };

  /**
   * Browse commands history forward
   * @param {Object} $el Input element jQuery object
   */
  var cmdHistoryForward = function ($el) {
    if (currentCmdPos !== -1) {
      $el.val(STRG.commands.get(--currentCmdPos))
      window.setTimeout(function () { $el.focusEnd(); }, 0);
    } else {
      $el.val(currentCmd);
    }
  };

  /**
   * Commands input handler
   * @param {Object} $el Input element jQuery object
   */
  var cmdHandler = function ($el) {
    var input = $el.val()
      , command = cmdParse(input);

    STRG.commands.add(input);

    if (typeof command.name !== "undefined" && command.name in TABS) {
      TABS[command.name].apply(null, command.args);
      currentCmdPos = -1;
      currentCmd = "";
    }

    // Clear command input
    $el.val("");
  };

  /**
   * Parse commands and execute
   * @param  {String} input Raw command line input
   * @return {Object}       Parsed command
   */
  var cmdParse = function (input) {
    var match = /(\w+)\((.*)\)/.exec(input) || [];

    if (match.length) {
      return {
        name: match[1],
        args: match[2].split(/\s*,\s*/)
      }
    } else {
      return {};
    }
  };

  $(document).on("keydown", ".js-cmd", inputHandler);
}(window, document, jQuery, STRG, TABS));

/**
 * Module storage
 * @param  {Object} window Window
 * @param  {Object} TIME   Time module
 * @return {Object}        Public methods
 */
var STRG = (function (window, TIME) {
  "use strict";

  /**
   * Save active tab index to window.localStorage
   * @param {String} index Active tab index
   * @param {String} title Active tab title
   */
  var saveActiveTab = function (index, title) {
    window.localStorage.setItem("activeTab", index);
    stat.addTab(title);
  };

  /**
   * Get active tab index from window.localStorage
   * @return {String} Active tab index
   */
  var getActiveTab = function () {
    return window.localStorage.getItem("activeTab");
  };

  var commands = (function () {
    var instance, history;

    /**
     * Initialize commans history
     */
    var init = function () {
      history = [];
      instance = true;
    };

    /**
     * Add command to history
     * @param cmd
     */
    var add = function (cmd) {
      !instance && init();

      history.unshift(cmd);
      (history.length > 10) && (history.length = 10);
    };

    /**
     * Returns last command or any other one by index
     * @param  {Number} index Command history position
     * @return {String}       Command by index (default 0)
     */
    var get = function (index) {
      !instance && init();

      return history[index || 0];
    };

    /**
     * Returns commands array length
     * @return {Number} Array length
     */
    var len = function () {
      !instance && init();

      return history.length;
    };

    return {
      add: add,
      get: get,
      len: len
    }
  }());

  var stat = (function () {
    var sessionStart = new Date()
      , tabsHistory = [];

    /**
     * Whole session time
     * @param  {Object} now Calling moment time
     * @return {String}     Session time in human language
     */
    var wholeSession = function (now) {
      return TIME.format(now - sessionStart);
    };

    /**
     * Session details
     * @param  {Object} now Calling moment time
     * @return {Array}      Tabs sessions
     */
    var byTabs = function (now) {
      var len = tabsHistory.length - 1
        , finish;

      return tabsHistory.map(function (session, i) {
        finish = i !== len ? tabsHistory[i + 1].start : now;

        return {
          name: session.name,
          time: TIME.format(finish - session.start)
        };
      });
    };

    /**
     * Add tab session information
     * @param {String} title Tab title
     */
    var tabSession = function (title) {
      tabsHistory.push({ name: title, start: new Date() });
    };

    return {
      all: wholeSession,
      byTabs: byTabs,
      addTab: tabSession
    };
  }());

  return {
    saveActiveTab: saveActiveTab,
    getActiveTab: getActiveTab,
    commands: commands,
    stat: stat
  }
}(window, TIME));

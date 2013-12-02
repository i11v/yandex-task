/**
 * Module tabs
 * @param  {Object} window   Window
 * @param  {Object} document DOM
 * @param  {Object} $        jQuery
 * @return {Object}          Public methods
 */
var TABS = (function (window, document, $, STRG) {
  "use strict";

  var tabsCount = $(".js-tab-title").length;

  /**
   * Get tab title by index
   * @param  {Number} index Tab index
   * @return {String}       Tab title
   */
  var getTabTitle = function (index) {
    return $(".js-tab-title:nth-child(" + index + ") .bar__tab__text").text()
  };

  /**
   * Show commands result in console output
   * @param {String} commmand Inputted command
   * @param {String} result   Command result
   */
  var log = function (commmand, result) {
    $(".js-output").append(TMPL.result(commmand, result));
    $(".js-result").last()[0].scrollIntoView();
  };

  /**
   * Select tab by index
   * @param {String} tabIndex Tab index
   */
  var selectTab = function (tabIndex) {
    var index = parseInt(tabIndex) + 1
      , tabTitle = getTabTitle(index)
      , switchClass = function (selector, classname, idx) {
        $("." + classname).removeClass(classname);
        $(selector + ":nth-child(" + idx + ")").addClass(classname);
      };

    if (index <= tabsCount) {
      switchClass(".js-tab-title", "bar__tab_active", index);
      switchClass(".js-tab-content", "content__tab_active", index);

      STRG.commands.get() && log(STRG.commands.get(), "Выбран таб №" + tabIndex + " «" + tabTitle + "»");
      STRG.saveActiveTab(tabIndex, tabTitle);
    } else {
      log(STRG.commands.get(), "Не удалось выбрать таб №" + tabIndex + ". Доступны табы с 0 по " + (tabsCount - 1));
    }
  };

  /**
   * Swap two tabs
   * @param {String} tabIndex1 First tab
   * @param {String} tabIndex2 Second tab
   */
  var swapTabs = function (tabIndex1, tabIndex2) {
    var index1 = tabIndex1 < tabIndex2 ? parseInt(tabIndex1) + 1 : parseInt(tabIndex2) + 1
      , index2 = tabIndex1 > tabIndex2 ? parseInt(tabIndex1) + 1 : parseInt(tabIndex2) + 1
      , swap = function (selector) {
        $(selector + ":nth-child(" + index2 + ")").insertAfter(selector + ":nth-child(" + index1 + ")");
        $(selector + ":nth-child(" + index1 + ")").insertAfter(selector + ":nth-child(" + index2 + ")");
      };

    if (index1 !== index2 && index1 > 0 && index2 <= tabsCount) {
      swap(".js-tab-title");
      swap(".js-tab-content");

      log(STRG.commands.get(), "Поменяли табы №" + tabIndex1 + " «" + getTabTitle(index2) + "» и №" + tabIndex2 + " «" + getTabTitle(index1) + "»");
    } else {
      log(STRG.commands.get(), "Не удалось поменять табы №" + tabIndex1 + " и №" + tabIndex2 + ". Доступны табы с 0 по " + (tabsCount - 1));
    }
  };

  /**
   * Show usage statistics
   */
  var showStat = function () {
    var now = new Date();

    log(STRG.commands.get(), TMPL.statDetails({
      all: STRG.stat.all(now),
      tabs: STRG.stat.byTabs(now)
    }));
  };

  // Select active tab from previos session
  selectTab(STRG.getActiveTab() || 0);

  return {
    selectTab: selectTab,
    swapTabs: swapTabs,
    showStat: showStat
  }
}(window, document, jQuery, STRG));

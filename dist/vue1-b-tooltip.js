'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Vue1BTooltip = factory());
})(undefined, function () {
  /**
   * Plugin
   */
  var Vue1BTooltip = function Vue1BTooltip() {};
  Vue1BTooltip.install = function (Vue, options) {
    var updateTitle = function updateTitle(el, title) {
      var $ele = $(el);

      Vue.nextTick(function () {
        // update title
        $ele.attr('title', title).tooltip('fixTitle');

        // update inner title
        var $tooltipEle = $ele.data('bs.tooltip').$tip;
        if ($tooltipEle) {
          $tooltipEle.find('.tooltip-inner').text(title);
          // reset position
          if ($tooltipEle.hasClass('in')) {
            $ele.data('bs.tooltip').options.animation = false;
            $ele.tooltip('show');
            $ele.data('bs.tooltip').options.animation = true;
          }
        }
      });
    };

    // directive
    Vue.directive("b-tooltip", {
      params: ['title'],
      update: function update(val) {
        var $ele = $(this.el);
        // update title when set before
        var isSetBefore = $ele.data('bs.tooltip');
        if (isSetBefore) {
          updateTitle(this.el, val);
          return;
        }

        // init config
        var config = {};

        // validate
        var htmlRE = /^html$/i;
        var placementRE = /^(auto|top|bottom|left|right)$/i;
        var triggerRE = /^(click|hover|focus)$/i;

        // parse config
        window.gg = this.modifiers;
        var modifiers = Object.keys(this.modifiers);
        modifiers.forEach(function (mod) {
          if (htmlRE.test(mod)) {
            config.html = true;
          } else if (placementRE.test(mod)) {
            config.placement = mod;
          } else if (triggerRE.test(mod)) {
            if (!config.trigger) {
              config.trigger = mod;
            } else {
              config.trigger += ' ' + mod;
            }
          } else if (mod === 'manual') {
            // manual cannot be combined with any other trigger
            config.trigger = mod;
          }
        });

        // parse title
        var title = this.params.title || val;
        if (typeof title === 'string' || typeof title === 'number') {
          config.title = title;
        } else if (typeof title === 'function') {
          config.title = title;
        } else if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object' && title !== null) {
          config = _extends({}, config, title);
        }

        // run tooltip
        $ele.tooltip(config);
      },
      unbind: function unbind() {
        var $ele = $(this.el);
        var isSetBefore = $ele.data('bs.tooltip');
        if (isSetBefore) {
          $ele.tooltip('destroy');
        }
      },


      paramWatchers: {
        title: function title(val) {
          updateTitle(this.el, val);
        }
      }
    });
  };

  return Vue1BTooltip;
});
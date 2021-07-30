(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue1BTooltip = factory());
}(this, function() {
  /**
   * Plugin
   */
  const Vue1BTooltip = function(){}
  Vue1BTooltip.install = function(Vue, options) {
    const updateTitle = (el, title) => {
      const $ele = $(el);

      Vue.nextTick(() => {
        // update title
        $ele.attr('title', title)
          .tooltip('fixTitle');

        // update inner title
        const $tooltipEle = $ele
          .data('bs.tooltip')
          .$tip;
        if($tooltipEle) {
          $tooltipEle
            .find('.tooltip-inner')
            .text(title);
          // reset position
          if($tooltipEle.hasClass('in')) {
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
      update(val) {
        const $ele = $(this.el);
        // update title when set before
        const isSetBefore = $ele.data('bs.tooltip');
        if(isSetBefore) {
          updateTitle(this.el, val);
          return;
        }

        // init config
        let config = {};

        // validate
        const htmlRE = /^html$/i;
        const placementRE = /^(auto|top|bottom|left|right)$/i;
        const triggerRE = /^(click|hover|focus)$/i;

        // parse config
        window.gg = this.modifiers;
        const modifiers = Object.keys(this.modifiers);
        modifiers.forEach(mod => {
          if(htmlRE.test(mod)) {
            config.html = true;
          } else if(placementRE.test(mod)) {
            config.placement = mod;
          } else if(triggerRE.test(mod)) {
            if(!config.trigger){
              config.trigger = mod;
            } else {
              config.trigger += ` ${mod}`;
            }
          } else if(mod === 'manual'){ // manual cannot be combined with any other trigger
            config.trigger = mod;
          }
        });

        // parse title
        const title = this.params.title || val;
        if(typeof title === 'string' || typeof title === 'number') {
          config.title = title;
        } else if(typeof title === 'function') {
          config.title = title;
        } else if(typeof title === 'object' && title !== null) {
          config = {
            ...config,
            ...title
          };
        }

        // run tooltip
        $ele.tooltip(config);
      },

      unbind() {
        const $ele = $(this.el);
        const isSetBefore = $ele.data('bs.tooltip');
        if(isSetBefore) {
          $ele.tooltip('destroy');
        }
      },

      paramWatchers: {
        title: function(val) {
          updateTitle(this.el, val);
        }
      }
    });
  }

  return Vue1BTooltip;
}));
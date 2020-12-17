(() => {
  // Vue use
  Vue.use(Vue1BTooltip);

  // Vue init
  new Vue({
    el: 'body',
    template: '',
    data () {
      return {
        tipData: { title: 'Tooltip <em>Message</em>' },
        date: new Date(),
        timer: null,
      };
    },
    ready() {
      this.timer = setInterval(() => {
        this.date = new Date();
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      tipMethod() {
        return '<strong>' + new Date() + '</strong>'
      }
    }
  });
})();

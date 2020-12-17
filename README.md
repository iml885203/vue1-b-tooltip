# vue1-b-tooltip
> Bootstrap tooltip for vue1 directive

### Demo

[Demo page](https://iml885203.github.io/vue1-b-tooltip)

### Installation

#### npm
```
npm i vue1-b-tooltip --save
```
#### yarn
```
yarn add vue1-b-tooltip
```

### Getting Started
```javascript
import Vue from 'vue';
import Vue1BTooltip from 'vue1-b-tooltip';

Vue.use(Vue1BTooltip);
```

or include the script directly

```html
<script src="path/to/vue.js"></script>
<script src="path/to/vue1-b-tooltip.js"></script>
<script>
  Vue.use(Vue1BTooltip); // good to go.
</script>
```

### Basic Example
```html
<span v-b-tooltip.hover title="Tooltip content">Hover Me</span>
```

### Documentation
Read BootstrapVue [documentation](https://bootstrap-vue.org/docs/directives/tooltip).

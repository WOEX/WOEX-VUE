<template>
  <div class="woex-switcher" :style="wrapperStyle" @click="switchEvent">
    <div class="switcher-bg" :style="bgStyle" ref="switcher"></div>
      <div class="switcher-circle"
           :style="circleStyle"
           ref="circle"></div>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate';
  import UiUtils from '../utils/ui';

  export default {
    props: {
      width: {
        type: [String, Number],
        default: 100
      },
      height: {
        type: [String, Number],
        default: 60
      },
      bgColor: {
        type: String,
        default: '#b0b0b0'
      },
      selectedColor: {
        type: String,
        default: '#47b09d'
      },
      selected: {
        type: Boolean,
        default: true
      },
      animated: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      wrapperStyle(){
        const { width, height, bgColor, selectedColor, selected } = this;
        return {
          'width': width + 'px',
          'height': height + 'px',
          'background-color': selected ? selectedColor : bgColor,
          'border-radius': parseFloat(height) / 2 + 'px'
        }
      },
      bgStyle() {
        const { width, height, selectedColor, selected } = this;
        return {
          'width': (parseFloat(width) - 4) + 'px',
          'height': (parseFloat(height) - 4) + 'px',
          'top': 2 + 'px',
          'right': 2 + 'px',
          'border-radius': (parseFloat(height) - 4) / 2 + 'px',
          'background-color': selected ? selectedColor : '#fff'
        }
      },
      circleStyle() {
        const {width, height, selectedColor, selected } = this;
        return {
          'width': (parseFloat(height) - 8) + 'px',
          'height': (parseFloat(height) - 8) + 'px',
          'top': 4 + 'px',
          'right': selected ? (4 + 'px') : ((parseFloat(width) - parseFloat(height) + 8 - 4) + 'px'),
          'border-radius': (parseFloat(height) - 8) / 2 + 'px',
          'background-color': selected ? '#fff' : selectedColor
        }
      }
    },
    watch: {
      selected: function(newValue) {
        const { width, height, animated } = this;

        if (this.$refs['circle']) {
          const right = newValue ? UiUtils.realPx(4) + 'px' : UiUtils.realPx(width - 4 - height + 8) + 'px';
          const left = newValue ? UiUtils.realPx(width - 4 - height + 8) + 'px' : UiUtils.realPx(4) + 'px';
          if (animated) {
            Velocity(this.$refs['circle'], {right: right, left:left}, {duration: 300});
            if (!newValue) {
              Velocity(this.$refs['switcher'], {scaleX: 0.1, scaleY : 0.1}, {duration: 0, complete: () => {
                Velocity(this.$refs['switcher'], {scaleX: 1, scaleY : 1}, {duration: 300});
              }});
            }

          }else {
            Velocity(this.$refs['circle'], {right: right, left:left}, {duration: 0});
          }
        }
      }
    },
    methods: {
      switchEvent(e) {
        this.$emit('switch');
      }
    }
  }
</script>

<style scoped>
  .woex-switcher{

  }
  .switcher-bg {
    position: absolute;
  }
  .switcher-circle {
    position: absolute

  }

  /*@keyframes leftMove {*/
  /*0%  {right: 4px}*/
  /*100% {right: calc}*/
  /*}*/


</style>

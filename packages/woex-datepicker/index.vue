<template>
  <div class="woex-datepicker"
       ref="woex-datepicker"
       v-if="show"
       :style="overlayStyle"
       :hack="shouldShow">
      <div class="fill"
           @touchstart.prevent="fillTouchEvent"
           @touchmove.prevent="fillTouchEvent"
           @touchend.prevent="fillTouchEvent"></div>
      <div class="container">
        <div class="btn-section">
          <div class="btn-text left" @click="cancelEvent">{{cancelText}}</div>
          <div class="btn-text right" @click="confirmEvent">{{confirmText}}</div>
        </div>
        <div class="picker">
          <div class="picker-section" v-for="(items, index) in selectOptions"
               :key="index"
               @touchstart.prevent="touchStartEvent"
               @touchmove.prevent="touchMoveEvent"
               @touchend.prevent="touchEndEvent"
               v-bind:section="index">
            <div class="option-cell" v-for="(item, i) in items"
                 :style="{'transform':'rotate3d(1, 0, 0, '+(i*(-30) + (index == 0 ? moveDeg0 : (index == 1 ?  moveDeg1 : moveDeg2)) - 180)+'deg) translate3d(0, 0, 150px)'}"
                 :key="index + '-' + i"
                 v-bind:section="index">
              <text v-bind:section="index" class="option-text" :text="item">{{item}}</text>
            </div>
          </div>
          <div class="section-line section-line-top"></div>
          <div class="section-line section-line-bottom"></div>
          <slot></slot>
        </div>
      </div>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate';
  import {dateOptionsBuilder} from './util';

  export default {
      props: {
        show: {
          type: Boolean,
          default: true
        },
        hasAnimation: {
          type: Boolean,
          default: true
        },
        duration: {
          type: [Number, String],
          default: 300
        },
        timingFunction: {
          type: Array,
          default: () => (['ease-in', 'ease-out'])
        },
        opacity: {
          type: [Number, String],
          default: 0.5
        },
        canAutoClose: {
          type: Boolean,
          default: true
        },
        type: {
          type: String,
          default: 'normal'
        },
        cancelText: {
          type: String,
          default: '取消'
        },
        confirmText: {
          type: String,
          default: '完成'
        }
      },
      data: function () {
        return {
          selectOptions: [],
          selectOpts0: 0,
          selectOpts1: 0,
          selectOpts2: 0,
          moveDeg0: 0,
          moveDeg1: 0,
          moveDeg2: 0,
          startY: 0,
          startDeg:0,
          recordTime: 0,
          recordY: 0,
          recordSpeed: 0,
          currentSec: 0,
          recordStart: false,
          speedA: 5,
          inertiaTimer: []
        }
      },
      computed: {
        overlayStyle() {
          return {
            opacity: this.hasAnimation ? 0 : 1,
            backgroundColor: `rgba(0, 0, 0,${this.opacity})`
          }
        },
        shouldShow() {
          const {hasAnimation, show} = this;

          if (show) {
            hasAnimation && setTimeout(() => {
              this.$nextTick(() => {
                this.appearOverlay();
              });
            }, 50);
          }

          return show;
        },
        pickerOptions() {//所有可选项
          const {type} = this;
          return dateOptionsBuilder(type);
        }
      },
      watch:{
        selectOpts0: function (oldVal, newVal) {

          this.reorderDates(0, newVal);
        },
        selectOpts1: function (oldVal, newVal) {

          this.reorderDates(1, newVal);
        },
        selectOpts2: function (oldVal, newVal) {
          this.reorderDates(2, newVal);
        }
      },
      beforeMount: function () {

        const { pickerOptions, selectOpts0, selectOpts1, selectOpts2 } = this;
        const result = [];
        const selectOpts = [selectOpts0, selectOpts1, selectOpts2];
        for (let i =0; i < pickerOptions.length; i++) {
          const targetArr = [];
          const length = pickerOptions[i].length;
          let start = 0,end = 0;
          if (selectOpts[i] - 6 > 0) {
            start = selectOpts[i] - 6;
          }else {
            for (let index = selectOpts[i] - 6; index < 0; index++) {
              targetArr.push(pickerOptions[i][length + index]);
            }
            start = 0;
          }

          if (selectOpts[i] + 6 < length) {
            end = selectOpts[i] + 6;
          }else {
            end = pickerOptions[i].length;
          }

          targetArr.push(...pickerOptions[i].slice(start, end));

          if (selectOpts[i] + 6 > length) {
            for (let index = 0; index < selectOpts[i] + 6 - length; index++) {
              targetArr.push(pickerOptions[i][index]);
            }
          }
          result.push(targetArr);
        }



        this.selectOptions = result;
      },
      methods: {
        appearOverlay(bool, duration = this.duration) {
          const { hasAnimation, timingFunction, canAutoClose } = this;
          const needEmit = !bool && canAutoClose;
          const overlayEl = this.$refs['woex-datepicker'];
          if (hasAnimation && overlayEl) {
            Velocity(overlayEl, {opacity: 1}, {duration: this.duration})
          }
        },
        cancelEvent(){
          this.$emit('woexCancel');
        },
        confirmEvent(){
          const { type ,moveDeg0 , moveDeg1, moveDeg2, pickerOptions} = this;
          if ('normal' === type) {
            const absDeg0 = Math.abs(moveDeg0) + 2;
            const absDeg1 = Math.abs(moveDeg1) + 2;
            const absDeg2 = Math.abs(moveDeg2) + 2;
            let index0 = (Math.floor(absDeg0 / 30)) % pickerOptions[0].length;
            let index1 = (Math.floor(absDeg1 / 30)) % pickerOptions[1].length;
            let index2 = (Math.floor(absDeg2 / 30)) % pickerOptions[2].length;

            index0 = ( moveDeg0 >= 0 || 0 === index0 ) ? index0 : pickerOptions[0].length - index0;
            index1 = ( moveDeg1 >= 0 || 0 === index1 ) ? index1 : pickerOptions[1].length - index1;
            index2 = ( moveDeg2 >= 0 || 0 === index2 )? index2 : pickerOptions[2].length - index2;

            const date = pickerOptions[0][index0] + '-' + (index1 + 1 > 10 ? index1 +1 : '0' + (index1 + 1 )) + '-' + (index2 +1 > 10 ? index2 + 1 : '0' + (index2 + 1));

            this.$emit('woexConfirm', date);

          }

        },
        touchStartEvent(event) {
          this.currentSec = parseInt(event.target.getAttribute('section'));
          if (this.inertiaTimer[this.currentSec]) {
            clearInterval(this.inertiaTimer[this.currentSec]);
            this.inertiaTimer[this.currentSec] = null;
          }

          this.startY = event.targetTouches[0].pageY;
          this.recordTime = new Date().getTime();
          this.recordY = this.startY;
          this.recordSpeed = 0;
          this.recordStart = false;
          switch (this.currentSec) {
            case 1:
              this.startDeg = this.moveDeg1;
              break;
            case 2:
              this.startDeg = this.moveDeg2;
              break;
            default:
              this.startDeg = this.moveDeg0;
              break;
          }

        },
        touchMoveEvent(event) {
          const move = (this.startY - event.targetTouches[0].pageY) * 1.5;

          const currentTime = new Date().getTime();
          const duration = currentTime - this.recordTime;
          if (currentTime - this.recordTime > 200) {
            this.recordStart = true;
            this.recordTime = currentTime;
            const distance = event.targetTouches[0].pageY - this.recordY;
            this.recordY = event.targetTouches[0].pageY;
            this.recordSpeed = distance / duration;
          }

          switch (this.currentSec) {
            case 1:
              this.moveDeg1 = this.startDeg + (move / 60) * 30;
              this.selectOpts1 = Math.floor(this.moveDeg1 / 30);
              break;
            case 2:
              this.moveDeg2 = this.startDeg + (move / 60) * 30;
              this.selectOpts2 = Math.floor(this.moveDeg2 / 30);
              break;
            default:
              this.moveDeg0 = this.startDeg + (move / 60) * 30;
              this.selectOpts0 = Math.floor(this.moveDeg0 / 30);
              break;
          }
        },
        touchEndEvent(event) {

          const {recordSpeed, currentSec, startY, speedA, recordStart} = this;

          let direction = 1;
          let startSpeed = 0;
          if (recordStart) {
            direction = recordSpeed < 0 ? 1 : -1;
            startSpeed = Math.abs(recordSpeed);
          }else {
            direction = startY - event.changedTouches[0].pageY > 0 ? 1 : -1;
            startSpeed = Math.abs(startY - event.changedTouches[0].pageY ) / 200;
          }

          this.inertiaTimer[currentSec] = setInterval(() => {
            if (startSpeed < 0) {
              this.autoAdjustPosition(currentSec);
              clearInterval(this.inertiaTimer[currentSec]);
              this.inertiaTimer[currentSec] = null;
            }else {
              startSpeed -= speedA / 1000;
            }

            const move = startSpeed * 1000 / 100 * direction;

            switch (currentSec) {
              case 1:
                this.moveDeg1 = this.moveDeg1 + (move / 60) * 30;
                this.selectOpts1 = Math.floor(this.moveDeg1 / 30);
                break;
              case 2:

                this.moveDeg2 = this.moveDeg2 + (move / 60) * 30;
                this.selectOpts2 = Math.floor(this.moveDeg2 / 30);
                break;
              default:
                this.moveDeg0 = this.moveDeg0 + (move / 60) * 30;
                this.selectOpts0 = Math.floor(this.moveDeg0 / 30);
                break;
            }
          }, 10);

        },
        reorderDates(section, newDate) {
          const {selectOptions, pickerOptions} = this;
          const selectionLength = selectOptions[section].length;
          const selectedOpt = newDate % selectionLength + selectionLength;

          for (let i = 0;  i < 6; i++) {
            let target = (newDate + i) % pickerOptions[section].length;
            target = target >= 0 ? target : target + pickerOptions[section].length;
            selectOptions[section][(selectedOpt + 6 + i) % 12] = pickerOptions[section][target];
          }

          for (let i = 1; i <= 6; i++) {
            let target = (newDate - i + pickerOptions[section].length) % pickerOptions[section].length;
            target = target >= 0 ? target : target + pickerOptions[section].length;
            selectOptions[section][(selectedOpt + 6 - i) % 12] = pickerOptions[section][target];
          }
        },
        fillTouchEvent() {

        },
        autoAdjustPosition(sec, animated = true) {
          let moveDeg = 0, positive = 1;
          if (0 === sec ) {
            moveDeg = this.moveDeg0;
          }else if (1 === sec) {
            moveDeg = this.moveDeg1;
          }else {
            moveDeg = this.moveDeg2;
          }

          positive = moveDeg > 0 ? 1 : -1;

          let absDeg = Math.abs(moveDeg);
          let offset = absDeg - Math.floor(absDeg / 30) * 30;

          if (offset <= 1)
            return ;

          if (animated) {
            let distance = 0;
              const offsetTimer =  setInterval(() => {
                  distance++;

                if (offset > 15) {
                  if (distance > 30 - offset) {
                    clearInterval(offsetTimer);
                  }
                    moveDeg += positive;
                }else {
                  if (distance > offset) {
                    clearInterval(offsetTimer);
                  }
                    moveDeg -= positive;
                }

                if (0 === sec ) {
                  this.moveDeg0 = moveDeg;
                }else if (1 === sec) {
                  this.moveDeg1 = moveDeg;
                }else {
                  this.moveDeg2 = moveDeg;
                }
              }, 30);
          }else  {
            if (offset > 15) {
              moveDeg += (30 - offset) * positive;
            }else {
              moveDeg -= offset * positive;
            }
            if (0 === sec ) {
              this.moveDeg0 = moveDeg;
            }else if (1 === sec) {
              this.moveDeg1 = moveDeg;
            }else {
              this.moveDeg2 = moveDeg;
            }
          }
        },
        caculateIndex(deg) {
          let positive = deg >= 0 ? 1 : -1;
          let absDeg = Math.abs(deg);
          let offset = absDeg - Math.floor(absDeg / 30) * 30;
          let index = Math.floor(absDeg / 30);


          if (15 < offset) {
            if (1 === positive) {
              index++;
            }else {
              index--;
            }
          }

          return index * positive;
        }
      }
  }

</script>

<style scoped>
  .woex-datepicker {
    width: 750px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }
  .fill {
    flex: 1;
    width: 750px;
    background: transparent;
  }
  .container {
    width: 750px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .picker {
    width: 750px;
    height: 350px;
    display: flex;
    flex-direction: row;
    background: #fff;
    padding: 0 34px;
  }
  .picker-section {
    flex: 1;
    transform-style: preserve-3d;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 25px 0;
  }
  .option-cell {
    height: 60px;
    width: 100%;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    position: absolute;

  }
  .option-text {
    color: #999;
    text-align: center;
    font-size: 36px;
  }
  .btn-section{
    width:750px;
    height:80px;
    background: #fff;
    border-bottom: 0.5px solid #e5e5e5;
  }
  .btn-text {
    color: #036BD6;
    font-size: 30px;
    width: 200px;
    position: absolute;
    height: 80px;
    line-height: 80px;
    top: 0;
  }
  .left {
    left: 0;
    padding-left: 34px;
  }
  .right {
    right: 0;
    padding-right: 34px;
    text-align: right;
  }
  .section-line {
    width: 750px;
    height: 0.5px;
    background: #e5e5e5;
    position: absolute;
    left: 0;
  }
  .section-line-top {
    top: 140px;
  }
  .section-line-bottom {
    top: 210px;
  }
</style>

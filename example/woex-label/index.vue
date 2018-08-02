<template>
  <div class="woex-demo ">
    <scroller class="scroller">
      <title title="woex-label"></title>
      <category title="类型样式"></category>
      <div class="label-list">
        <woex-label class="label-item" :contentList="headArray" ></woex-label>
        <woex-label class="label-item" :contentList="normalArray1" style="text-indent: 2em;"></woex-label>
        <woex-label class="label-item" :contentList="normalArray2" style="text-indent: 2em;"></woex-label>
        <woex-label class="label-item" :contentList="normalArray3" style="text-indent: 2em;"></woex-label>
        <woex-label class="label-item" :contentList="normalArray4" style="text-indent: 2em;"></woex-label>
        <woex-label class="label-item" :contentList="footerArray" style="text-align:right"></woex-label>
      </div>

    </scroller>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import {WoexLabel} from '../../index';


  export  default {
    components: { Title, Category, WoexLabel },
    data: {
      headArray: [
        {
          type: 'icon',
          src: require('../_mods/tuanzi.png'),
          style: {
            height: 40,
            width: 40
          }
        },
        {
          value: '划知识点',
          type: 'text',
          style: {
            'color': '#FF4C33',
            'font-size': '38px',
            'line-height': '50px',
          }
        },
        {
          value: '送东阳马生序',
          type: 'text',
          style: {
            'text-align': 'center',
            'font-size': '38px',
            'font-weight': 'bold',
            'height': '80px',
            'line-height': '80px',
            'display': 'block'
          }
        }
      ],
      normalArray1: [
        {
          value: '余幼时即嗜学。家贫，无从致书以观，每假借于藏书之家，手自笔录，计日以还。天大寒，砚冰坚，手指不可屈伸，弗之怠。录毕，走送之，不敢稍逾约。以是人多以书假余，余因得遍观群书。既加冠，益慕圣贤之道，又患无砚师、名人与游，尝趋百里外，从乡之先达执经叩问。先达德隆望尊，门人弟子填其室，未尝稍降辞色。余立侍左右，援疑质理，俯身倾耳以请；或遇其叱咄，色愈恭，礼愈至，不敢出一言以复；俟其欣悦，则又请焉。故余虽愚，卒获有所闻。',
          type: 'text'
        }],
      normalArray2: [

        {
          value: '当余之从师也，负箧曳屣，行深山巨谷中，穷冬烈风，大雪深数尺，足肤皲裂而不知。至舍，四支僵劲不能动，媵人持汤沃灌，以衾拥覆，久而乃和。寓逆旅，主人日再食，无鲜肥滋味之享。同舍生皆被绮绣，戴朱缨宝饰之帽，腰白玉之环，左佩刀，右备容臭，烨然若神人；余则缊袍敝衣处其间，略无慕艳意。以中有足乐者，不知口体之奉不若人也。盖余之勤且艰若此。',
          type: 'text'
        }],
      normalArray3: [

        {
          value: '今虽耄老，未有所成，犹幸预君子之列，而承天子之宠光，缀公卿之后，日侍坐备顾问，四海亦谬称其氏名，况才之过于余者乎？',
          type: 'text'
        }],
      normalArray4: [
        {
          value: '今诸生学于太学，县官日有廪稍之供，父母岁有裘葛之遗，无冻馁之患矣；坐大厦之下而诵《诗》《书》，无奔走之劳矣；有司业、博士为之师，未有问而不告，求而不得者也；凡所宜有之书，皆集于此，不必若余之手录，假诸人而后见也。其业有不精，德有不成者，非天质之卑，则心不若余之专耳，岂他人之过哉！\n' +
          '东阳马生君则，在太学已二年，流辈甚称其贤。余朝京师，生以乡人子谒余，撰长书以为贽，辞甚畅达，与之论辩，言和而色夷。自谓少时用心于学甚劳，是可谓善学者矣！其将归见其亲也，余故道为学之难以告之。谓余勉乡人以学者，余之志也；诋我夸际遇之盛而骄乡人者，岂知余者哉！' +
          '',
          type: 'text'
        }],
      footerArray: [
        {
          value: '点击查看',
          type: 'text'
        },
        {
          value: '宋濂',
          type: 'link',
          href: 'https://baike.baidu.com/item/%E5%AE%8B%E6%BF%82/679074',
          style: {
            'color': '#036BD6'
          }
        },
        {
          value: '生平',
          type: 'text'
        }
      ]
    }

  }
</script>

<style scoped>
  .woex-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #f5f5f5;
  }
  .scroller {
    flex: 1;
  }
  .label-list{
    padding: 0 17px;
    margin-bottom: 34px;
  }
  .label-item{
    margin-top: 24px;
    margin-bottom:16px;
  }
</style>

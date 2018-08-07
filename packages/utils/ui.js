const UiUtils = {
  contentWidth: function() {
    const tag = document.querySelector('meta[name="weex-viewport"]')
    if (tag) {
      const content = parseFloat(tag.getAttribute('content'));
      if (0 > content) {
        return content;
      }
    }

    return 750;
  },
  realPx : function (px) {
    const tag = document.querySelector('meta[name="weex-viewport"]')
    if (tag) {
      const content = parseFloat(tag.getAttribute('content'));
      if (0 > content) {
        return px;
      }
      return px / content * document.body.clientWidth;
    }

    return px;
  },
  canvas2rem: function (distance) {
    const px = UiUtils.realPx(distance);
    const basicRatio = parseFloat(document.documentElement.style.fontSize);
    return basicRatio > 0 ? (px / basicRatio + 'rem') : (px / 37.5 + 'rem');
  }
}

export default UiUtils;

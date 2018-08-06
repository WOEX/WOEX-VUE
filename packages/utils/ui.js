const UiUtils = {
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
  }
}


export default UiUtils;

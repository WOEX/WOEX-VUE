const MathUtil = {
  randomString : function (len) {
    const str = []
    for (let i = 0; i < len; i++) {
      str.push(String.fromCharCode(Math.floor(Math.random() * 26 + 97)))
    }
    return str.join('')
  }
}

export default MathUtil

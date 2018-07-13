// 输入格式校验正则
export const TEXT_REG_RULE = {
  PHONE: /^(1)\d{9}$/, // 手机号正则
  CHINESE: /^[\u4e00-\u9fa5]$/, // 汉字正则
  EMAIL: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,}/, // 邮箱正则
  INTEGER: /^[0-9]+$/ // 数字
}

// 输入格式拼装
export const INPUT_FORMATTER = {
  VERCODE: VerCodeFormatter
}

// 6位验证码格式封装
const VerCodeFormatter = function (val, origin) {
  // 输入删除字符串
  // if (val.length === 0) {
  //
  // }
  origin = origin.replace(/ /g, '')
  origin.replace(/\d{3}/g, '$1 ')
  return origin
}

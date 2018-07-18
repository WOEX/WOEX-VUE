// 过滤非数字
const integerFilter = function (val) {
  return val.replace(/[^0-9]/ig,'')
}

// 数字格式封装
const integerFormatter = function (val) {
  return val.replace(/[^0-9]/ig,'')
}

// 6位验证码格式封装
const verCodeFormatter = function (val) {
  val = val.replace(/ /g, '')
  val.replace(/\d{3}/g, '$1 ')
  return val
}

// 过滤非手机号
const phoneFilter = function (val) {
  return val.replace(/[^0-9]/ig,'').substr(0, 11)
}

// 手机号格式封装
const phoneFormatter = function (val) {
  let value = phoneFilter(val)
  const valueLen = value.length
  if (valueLen > 3 && valueLen < 8) {
    value = value.replace(/^(...)/g, '$1 ')
  }
  else if (valueLen >= 8) {
    value = value.replace(/^(...)(....)/g, '$1 $2 ')
  }
  return value
}

// 身份证格式封装
const idCardFilter = function (val) {
  return val.replace(/[^0-9xX]/g, '').substr(0, 18)
}

// 身份证格式封装
const idCardFormatter = function (val) {
  let value = idCardFilter(val)
  const valueLen = value.length
  if (valueLen > 6 && valueLen < 14) {
    value = value.replace(/^(......)/g, '$1 ')
  }
  else if (valueLen > 8) {
    value = value.replace(/^(......)(........)/g, '$1 $2 ')
  }
  return value
}

// 输入格式拼装
export const INPUT_FORMATTER = {
  vercode: verCodeFormatter,
  phone: phoneFormatter,
  integer: integerFormatter,
  idCard: idCardFormatter
}

// 过滤封装
export const INPUT_FILTER = {
  integer: integerFilter,
  phone: phoneFilter,
  idCard: idCardFilter
}


export const dateOptionsBuilder = function(type, startDate, endDate)
{
  const options = [];
  // 普通日期选择框
  if ('normal' === type)
  {
      if (undefined === startDate)
      {
        startDate = new Date();
      }

      console.log(startDate);

    if (undefined === endDate) {
      endDate = new Date()
      endDate.setFullYear(startDate.getFullYear() + 100, startDate.getMonth(), startDate.getDay())
    }
    else if (endDate.getTime() < startDate.getTime()){
      throw new Error( 'the endDate should never be ahead of the startDate' );
    }

    const endYear = endDate.getFullYear();
    const yearOptions = [];
    const monthOptions = [];
    const dayOptions = [];
    for (let i = startDate.getFullYear(); i <= endYear; i++)
    {
      yearOptions.push(i)
    }

    options[0] = yearOptions;

    for (let i = 1; i <= 12; i++) {
      monthOptions.push(i + '月')
    }

    options[1] = monthOptions;

    for (let i = 1; i <= 31; i++) {
      dayOptions.push(i + '日')
    }

    options[2] = dayOptions;

  }

  return options;
}

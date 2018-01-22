
const mapRangeToListInMonth = (start, end) => {
    const list = []
    while (start.date() < end.date()) {
        list.push(start.format(dateFormat))
        start.add(1, 'days')
    }
    list.push(end.format(dateFormat))
    return list
}

const mapRangeToListInYear = (start, end) => {
    let list = []
    if (start.month() === end.month()) {
        return mapRangeToListInMonth(start, end)
    }
    while (start.month() < end.month()) {
        let endOfMonth = start.clone().endOf('month')
        list = list.concat(mapRangeToListInMonth(start.clone(), endOfMonth))
        start.add(1, 'months').subtract(start.date() - 1, 'd')
    }
    return list.concat(mapRangeToListInMonth(start, end))
}

// 利用分治的思想将时期范围转换为具体的日期数组  接受moment类型的参数 by Guojunyan
const mapDateRangeToDayList = (start, end) =>{
    let list = []
    if (start.year() === end.year()) {
        return mapRangeToListInYear(start, end)
    }
    while (start.year() < end.year()) {
        let endOfYear = start.clone().endOf('year')
        list = list.concat(mapRangeToListInYear(start.clone(), endOfYear))
        start.add(1, 'years').subtract(start.month(), 'months').subtract(start.date() - 1, 'd')
    }
    return list.concat(mapRangeToListInYear(start, end))
}

export default mapDateRangeToDayList
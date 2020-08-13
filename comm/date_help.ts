
/**
 * 格式化时间
 * @param mTime
 * @return
 */


//获取现在时间戳 || 传入时间戳  <=>  得到年月日 时分秒（默认当前时间）//2020-06-18 23:10:10  //2020-06-18
export function getCurrentYMD(time:any) {
    const date = time?new Date(time * 1000):new Date();//获取当前的时间戳 ||传入时间戳的  得到日期 时分秒
    //当前时间戳
    const currentTime = date.getTime() / 1000
    //年
    const Y = date.getFullYear();
    //月
    const M = stringand0(date.getMonth() + 1);
    //日
    const D = stringand0(date.getDate());
    //时
    const hh = stringand0(date.getHours()) ;
    //分
    const mm = stringand0(date.getMinutes() );
    //秒
    const ss = stringand0(date.getSeconds());

    
    return {
        currentDate:`${Y}-${M}-${D}`,//2020-06-18
        currentDateHHMMSS:`${Y}-${M}-${D} ${hh}:${mm}:${ss}`,//2020-06-18 23:10:10
        currentTime//时间戳
    }
}


/**
 * 标准时间 <=> 时间戳 elementui 日期
 */
export function getutcTime(arr:any) {
    const arr0 = Date.parse(arr[0])/1000
    const arr1 = Date.parse(arr[1])/1000
    console.log(789456,arr0,arr1)
    const {currentDate:startDate} = getCurrentYMD(arr0);//转化为日期
    const {currentDate:endtDate} = getCurrentYMD(arr1);//转化为日期
    const {time:starttimestamp2} =getConversionTime(startDate + ' 00:00:00')//转化为时间戳
    const {time:endtimestamp2} =getConversionTime(endtDate + ' 23:59:59')//转化为时间戳
    return {
        starttimestamp2,
        endtimestamp2
    };
}





/**
 * 日期 <=> 时间戳 
 */
export function getConversionTime(str:any):any {
    const date = new Date(str*1000);

    const time = date.getTime() / 1000;

    const Y = date.getFullYear();
    //月
    const M = stringand0(date.getMonth() + 1);
    //日
    const D = stringand0(date.getDate());
    //时
    const hh = stringand0(date.getHours());
    //分
    const mm = stringand0(date.getMinutes() );
    //秒
    const ss = stringand0(date.getSeconds());

    return {
        time,
        currentDate:`${Y}/${M}/${D}`,//2020/06/18
    };
}


//获取某月的开始时间00:00:00  => 结束时间戳 23:59:59
export function computeTimeEnd(year:number, month:number) {

    const startTime = new Date(year, month - 1, 1).getTime()/1000;//2020.10.01 00:00:00的时间戳
    const{currentDate,currentDateHHMMSS} = getConversionTime(startTime)

    
    const endTime =  (new Date(year, month, 0).getTime()+86399*1000)/1000//2020.10.31 23:59:59的时间戳
    const endTimeSomeFormat = getConversionTime(endTime)

    return {
        startTime,//这个月的开始时间戳
        startCurrentDate:currentDate,
        startCurrentDateHHMMSS:currentDateHHMMSS,

        
        endTime,//这个月的结束时间戳
        endCurrentDate:endTimeSomeFormat.currentDate,
        endCurrentDateHHMMSS:endTimeSomeFormat.currentDateHHMMSS

    }
}


/**
 * 获取多少天以前的时间戳
 */
export function getDayTime(day:number) {
    var date = new Date(new Date());
    date.setDate(date.getDate() - day);
    // data.setData(date.getDate()-day)
    return date.getTime() / 1000;
}



//小于10带0
export function stringand0(str:number) {
    return str < 10 ? '0' + str : str
}



//获取几天前的时间戳
export function daysAgo(num:number) {
    var timeStamp =new Date().setHours(0, 0, 0, 0) / 1000;
    // 一天是86400秒   故 7 天前的时间戳为
    // var DayAgo = timeStamp - 86400 * num;
    return timeStamp - 86400 * num;
}

//今日以及今日过后的时间戳
export function daysAfter(num:number) {
    var timeStamp = new Date().setHours(0, 0, 0, 0) / 1000;
    // 一天是86400秒   故 7 天前的时间戳为
    var DayAfter = timeStamp + 86400 * num;
    var obj = {timeStamp:0,DayAfter:0};
    obj.timeStamp = timeStamp;
    obj.DayAfter = DayAfter;
    return obj;
}

//获取今天 || 2020-07-05的开始和结束 =>时间戳
export function StartAndEndTime(str?:string){
    const d:Date = str?new Date(Date.parse(str.replace(/-/g, "/"))):new Date();
    const Year =d.getFullYear();
    const Month = d.getMonth();
    const Day = d.getDate();
    const StartTime = (new Date(Year, Month,Day, 0, 0, 0)).getTime();//毫秒
    const EndTime = (new Date(Year, Month, Day, 23, 59, 59)).getTime();//毫秒
    return {
        StartTime,//今天或者某天凌晨的时间戳
        EndTime,//今天或者某天结束的时间戳
    };
}






function decNum(a:any) {/*获取小数位数*/
    if (a == null || a == undefined || a == "") {
        a = 0
    }
    var r = 0;
    a = a.toString();
    if (a.indexOf(".") !== -1) r = a.split(".")[1].length;
    return r;
}

function int(a:any) {/*去除小数点并转成数值*/
    if (a == null || a == undefined || a == "") {
        a = 0
    }
    return parseInt(a.toString().replace(".", ""));
}
//twoDecimals这个是是否保留两位小数
export function calcNumber(a:number, b:number, type:string,twoDecimals?:boolean) {//加减乘除
    if (isNaN(a)) {
        a = 0
    }
    if ( isNaN(b)) {
        b = 0
    }
    let r:any,
        da = decNum(a),
        db = decNum(b),
        dsum = da + db,
        dmin = Math.min(da, db),
        dmax = Math.max(da, db);
    dsum += dmax - dmin;
    dsum = Math.pow(10, dsum);
    dmax = Math.pow(10, dmax);
    a = int(a);
    b = int(b);
    if (da > db) {
        b *= Math.pow(10, da - db);
    } else {
        a *= Math.pow(10, db - da);
    }
    switch (type) {
        case "add":
            r = (a + b) / dmax;
            break;
        case "subtract":
            r = (a - b) / dmax;
            break;
        case "multiply":
            r = (a * b) / dsum;
            break;
        case "divide":
            r = a / b;
            break;
    }
    //选择了保留两位小数
    if(twoDecimals)r = r.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//保留两个小数
    return parseFloat(r);
}
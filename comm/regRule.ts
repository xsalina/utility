// 正则表达式表

//是否为正整数
export function integerNumber(str:string){
    return /(^[1-9]\d*$)/.test(str)? true: false
} 
import { createHash } from "crypto"
// exceed是否不能超过100
export function onInputValueDecimals(value:any,that:any,type:string,exceed?:boolean){//百分比 保留两位小数点和不能超过100
    if (value != '' && value.substr(0, 1) == '.') {
            value = "";
        }
        value = value.replace(/^0*(0\.|[1-9])/, '$1')//解决 粘贴不生效
        value = value.replace(/[^\d.]/g, "")  //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')//只能输入两个小数
        if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            if (value.substr(0, 1) == '0' && value.length == 2) {
                value = value.substr(1, value.length);
            }
        }
        if(exceed && value > 100){////百分比不能超过100 
            value = 100
        }
        
       
        that.formData[type] = value;
        return value
        // this[num] = value
  }

  /**
 * 导出文件
 */
export function exportCsv(data:any, head:any, name:any) {

    let csvRows:any[] = [];
    for (let i = 0; i < head.length; i++) {
        csvRows.push(head[i].join(','))
    }
    let csvString = csvRows.join('\n');

    //BOM的方式解决EXCEL乱码问题
    let BOM = '\uFEFF';
    csvString = BOM + csvString;

    let a = document.createElement('a');
    a.href = 'data:attachment/csv,' + encodeURI(csvString);
    a.target = '_blank';
    a.download = `${name}.csv`;
    document.body.appendChild(a); // Firefox 中必须这么写，不然不会起效果
    a.click();
    document.body.removeChild(a);
}

//手机号做处理成135****3644
export function handlePhone(phone:string):string{
    return phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')

}

/**
 *  md5 转换
 */
export function md5ToLower(s:string):string{
    return createHash("md5").update(s).digest('hex').toLowerCase();
}
 
/**
 * TODO: 封装基类，checker与业务解耦，参考yup，或者直接使用yup
 */

const isLeapYear = function(year: number): boolean {
  if (isNaN(year)) {// 非数字
    return false;
  } else {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
  }
}


class Price{
  constructor({blurChecker, realChecker}){
    this.blurChecker = blurChecker
    this.realChecker = realChecker
  }

  /**
   * 格式化金额
   * @param str 传入的字符串
   * @param decimalNum 小数点保留几位
   */
  formator(str, decimalNum = 2, hasDelimiter = true){
    let price = String(str)
                    .replace(/^0([\d]+)/, '$1')     // 开头不允许传入连续的0
                    .replace(/^\./g, '0.')           // 首个字符为.的时候，将其替换成0.的形式
                    .replace(/[^\d\.]/g, '')         // 剔除非数字与.的字符
    let arr=price.split('.').slice(0, 2); // 不能超过一个小数点
    if(hasDelimiter){
      arr[0] = arr[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
    }
    // 处理小数点后面的位数
    if(arr[1]){
      arr[1] = arr[1].slice(0, decimalNum)
    }
    return arr.join('.'); 
  }
  /**
   * 去除金额中的逗号
   * @param value 
   */
  clearFormation(value) {
    return parseFloat(value.replace(/,/g, ''))
  }

  blurChecker(){
    return true
  }

  realChecker(){
    return true
  }

}

// class Phone1{
//   constructor(){

//   }

//   formator(str){
//     // 不支持删除
//     let phone = String(str)
//     .replace(/\s/g, '')  // 删除所有空格
//     .replace(/^([\d]{3})/, '$1 ')
//     .replace(/^([\d]{3}\s)([\d]{4})/, '$1$2 ')
//     return phone;
//   }
//   /**
//    * @param value 
//    */
//   clearFormation(value) {
//     return value.replace(/\s+/g, '')
//   }

//   /** */
//   checker(value){
//     let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
//     let phone = String(value)
//                   .replace(/\s/g, '')  // 删除所有空格
//     return reg.test(phone)
//   }

// }

class Phone{
  _strArr: Array<any>  // 用于保存上一次格式化后的手机号码的字符数组，比如158 10，对应数组为["1","5","8"," ", "1", "0"]
  // delimiterPositions: Array<any>
  constructor(initialString = '', config: any = {}){ 
    this._strArr = initialString? this.formator(initialString) : []
    // this.delimiterPositions = config.delimiterPositions || [3, 8]
  }

  // 耦合性太强
  formator(str, pos = -1){
    // 格式化之前输入的值的长度
    let strLen = str.length
    // 上一次格式化之后的输入值的数组 
    let _strArrLen = this._strArr.length
    // _strArrLen > strLen 上一次的值比当前格式化之前的输入值的长度长，说明是删除操作。
    // pos < strLen 表示当前光标在字符中间部分
    if(pos < strLen && _strArrLen > strLen){
      console.log('str', str, 'pos', pos ,'strLen', strLen, '_strArrLen', _strArrLen);
      if(pos === 3){
        // 删除第一个空格的时候，需要删除第3个数字
        str = str.substring(0, 2) + str.substring(3)
        // 临界值，当是删除字符的时候，如果只有9位，那么最后一个空格的删除，会影响到光标距离最后字符的位数，因此不需要-1
        if(strLen !== 9){
          pos = pos - 1
        }
      }else if(pos === 8){
        // 删除第二个空格的时候，需要删除第8个数字
        str = str.substring(0, 7) + str.substring(8)
        if(strLen !== 9){
          pos = pos - 1
        }
      }
    }else if(_strArrLen < strLen){ // 增加字符的输入操作
      // 在空格符号前增加字符的时候，需要往后多移动一位光标
      if(pos === 4 ){
        pos = pos + 1
      }else if(pos === 9){
        pos = pos + 1
      }
    }

    /* 格式化金额 3-4-4 */
    let tempStr = String(str)
                    .replace(/[\D]/g, '')  // 删除非数字
    let tempArr = tempStr.split("")
    // 从空格处删除
    let tempArrLen = tempArr.length
    // 3-4-4,在指定位置插入空格
    if(tempArrLen >= 8){
      tempArr.splice(3, 0, " ")
      tempArr.splice(8, 0, " ")
    }else if(tempArrLen >= 4){
      tempArr.splice(3, 0, " ")
    }
    this._strArr = tempArr
    const result = tempArr.join("")

    return [result, pos]
  }
  /**
   * @param value 
   */
  clearFormation(value) {
    return value.replace(/\s+/g, '')
  }

  /** */
  blurChecker(value){
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
    let phone = String(value)
                  .replace(/\s/g, '')  // 删除所有空格
    return reg.test(phone)? '' : '请输入正确的手机号'
  }

  realChecker(value){
    let phone = String(value)
    .replace(/\s/g, '')  // 删除所有空格
    console.log('phone', phone)
    let len = phone.length
    let errMsg = ''
    // 由于手机号码字段会更新，所以前端无法判断，因此只做简单的判断就行
    if(len >= 1 && len !== 11){
      errMsg = phone[0] === '1' ? '' :  '请输入正确的手机号'
    }else if(len === 11){
      errMsg = this.blurChecker(phone)
      console.log('len >= 11', errMsg)
    }
    return errMsg
  }
}


class IdCard{
  constructor(){

  }

  formator(str){
    let newStr = String(str)
    .replace(/([^\dXx])/g, '')         
    return newStr;
  }

  clearFormation(value) {
    return value
  }

	blurChecker(idCardNum: string): string {
    let errMsg = '请输入正确的身份证号'
		let prov = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"

		};
		if (!prov[parseInt(idCardNum.substr(0, 2))]) { // 省份检验
			return errMsg;
    }
		let regExp;
		let idChars = idCardNum.split("");
		switch (idCardNum.length) {
			case 15:// 15位身份证号检测
				if (isLeapYear(parseInt(idCardNum.substr(6, 2)) + 1900)) {// 闰年
					regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
				} else {// 平年
					regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
				}
				return regExp.test(idCardNum)? '' : errMsg;
			case 18:// 18位身份号码检测
				if (isLeapYear(parseInt(idCardNum.substr(6, 4)))) {// 闰年
					regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				} else {// 平年
					regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				}
				if (regExp.test(idCardNum)) {// 基本校验
					let modulus, checkCodeList = '10X98765432';
					let sum, code;
					sum = (parseInt(idChars[0]) + parseInt(idChars[10])) * 7 + (parseInt(idChars[1]) + parseInt(idChars[11])) * 9 + (parseInt(idChars[2]) + parseInt(idChars[12])) * 10 + (parseInt(idChars[3]) + parseInt(idChars[13])) * 5 + (parseInt(idChars[4]) + parseInt(idChars[14])) * 8 + (parseInt(idChars[5]) + parseInt(idChars[15])) * 4 + (parseInt(idChars[6]) + parseInt(idChars[16])) * 2 +
						parseInt(idChars[7]) +
						parseInt(idChars[8]) * 6 +
						parseInt(idChars[9]) * 3; // 计算校验位
					modulus = sum % 11;
					code = checkCodeList.substr(modulus, 1);// 找到校验位
					return code == idChars[17]? '' : errMsg;
				} else {
					return errMsg;
				}
			default:
				return errMsg;
		}
	}

	realChecker(value: string): string {
    let idCardNum = String(value)
    .replace(/\s/g, '')  // 删除所有空格
    let errMsg = '请输入正确的身份证号'
		let prov = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"

    };
    let len = idCardNum.length
    let regExp;
		let idChars = idCardNum.split("");
    if(len === 1 ){
      return idCardNum !== '0'? '' : errMsg
    }else if(len >= 2 && len < 18){
      return prov[parseInt(idCardNum.substr(0, 2))] ? '' : errMsg
    }else if(len === 15){
			// 15位身份证号检测
      if (isLeapYear(parseInt(idCardNum.substr(6, 2)) + 1900)) {// 闰年
        regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
      } else {// 平年
        regExp = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
      }
      return regExp.test(idCardNum)? '' : errMsg;
    }else if(len === 18){
      if (isLeapYear(parseInt(idCardNum.substr(6, 4)))) {// 闰年
        regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
      } else {// 平年
        regExp = /^[1-9][0-9]{5}[1-9][0-9]{3}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
      }
      if (regExp.test(idCardNum)) {// 基本校验
        let modulus, checkCodeList = '10X98765432';
        let sum, code;
        sum = (parseInt(idChars[0]) + parseInt(idChars[10])) * 7 + (parseInt(idChars[1]) + parseInt(idChars[11])) * 9 + (parseInt(idChars[2]) + parseInt(idChars[12])) * 10 + (parseInt(idChars[3]) + parseInt(idChars[13])) * 5 + (parseInt(idChars[4]) + parseInt(idChars[14])) * 8 + (parseInt(idChars[5]) + parseInt(idChars[15])) * 4 + (parseInt(idChars[6]) + parseInt(idChars[16])) * 2 +
          parseInt(idChars[7]) +
          parseInt(idChars[8]) * 6 +
          parseInt(idChars[9]) * 3; // 计算校验位
        modulus = sum % 11;
        code = checkCodeList.substr(modulus, 1);// 找到校验位
        return code == idChars[17]? '' : errMsg;
      } else {
        return errMsg;
      }
    }else{
      return ''
    }
	}

}

class Email{
  constructor(){

  }

  formator(str){
    let newStr = String(str.trim())
    .replace(/\s/g, '')         
    return newStr;
  }

  clearFormation(value) {
    return value
  }

  checker(value){
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let email = String(value)
    .replace(/\s/g, '')  // 删除所有空格
    return reg.test(email)? '' : '请输入正确的电子邮箱'
  }

  realChecker(value){
    let first = value.indexOf('@')
    let email = String(value)
    .replace(/\s/g, '')  // 删除所有空格
    let errMsg = ''
    if(first >= 0){
      let second = email.indexOf('@', first + 1)
      if(second > 0){
        errMsg = '请输入正确的电子邮箱'
      }
    }
    return errMsg
  }

}








const priceHandler = Price
const phoneHandler = Phone
const idCardHandler = IdCard
const emailHandler = Email
export {
  priceHandler,
  phoneHandler,
  idCardHandler,
  emailHandler
}


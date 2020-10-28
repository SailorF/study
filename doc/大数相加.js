let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}

add(a,b)

function add1(num1, num2) {
  num1 = String(num1);
  num2 = String(num2);
  let result = '';
  let f = 0;
  let t = 0;  // 进位
  const maxLength = Math.max(num1.length, num2.length);
  const fixNum1 = num1.padStart(maxLength, 0);
  const fixNum2 = num2.padStart(maxLength, 0);
  for (let i = maxLength - 1; i > 0; i--) {
      f = Number(fixNum1[i]) + Number(fixNum2[i]) + t;
      t = Math.floor(t/10);
      result = f%10 + result;
  }
  if (t == 1) {
      result = '1' + result;
  }
  return result;
}

// function mutlti(num1, num2) {
//   num1 = String(num1);
//   num2 = String(num2);
//   const num = getNumList(num2);
//   console.log(num)
//   const getZero = function(num) {
//     num = String(num);
//     let zerostr = '';
//     if (num[num.length - 1] == 0) {
//       while (num.length > 0) {
//         if (num[num.length - 1] == 0) {
//           zerostr += '0'
//           num = num.substr(0, num.length - 1)
//         } else {
//           break;
//         }
//       }
//     }
//     return [num, zerostr];
//   }
//   let result = 0;
//   console.log(num);
//   for (let i = 0; i< num.length; i++) {
//     const [int, zero] = getZero(num[i]);
//     let sum = int * num1;
//     sum = sum && (sum + zero)
//     result = add(String(result), String(sum));
//   }
//   return result;
// }

// function getNumList(num) {
//   num = String(num);
//   const xiaoshu = num.split('.')[1];
//   let result = [];
//   let i = 1;
//   if (xiaoshu && xiaoshu.length) {
//     i = Math.pow(10, -xiaoshu.length)
//   }
//   while (num.length > 0) {
//       if (!Number.isNaN(num[num.length - 1] * i)) {
//         result.unshift(num[num.length - 1] * i);
//       }
//       num = num.substr(0, num.length - 1);
//       i = i * 10;
//   }
//   return result;
// }

// // console.log(mutlti('123456789', '987654321'))
// console.log(mutlti('9333852702227987', '85731737104263'))

// 输入:
// "9333852702227987"
// "85731737104263"
// 输出
// "800207406037324625947956710864"
// 预期结果
// "800207406037324579815815608581"
var str = `
/*
* @funid 44010
* @descript
*/
message CMb1_SecurityManagerRequest {
    int32 busitype = 1;
    boolean status = 2;
    long money = 3;
};
/*
* @funid 44011
* @descript
*/
message CMb1_SecurityManagerResponse {
    string key = 1;
};
`;
var reg = /@funid (?<funid>\d+)[\s|\S]+?message (?<name>(\w+))[\s|\S]+?{(?<messageContent>[\s|\S]+?)}/g;
const messageContentReg = "";

var getCode = reg.exec(str);
do {
  console.log(`${getCode.groups.funid} ${getCode.groups.name}`);
} while ((getCode = reg.exec(str)) !== null);

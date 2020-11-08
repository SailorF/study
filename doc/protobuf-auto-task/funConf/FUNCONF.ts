const FUNAPI = require("./FUNAPI.ts");
const cmbl_gospstrategymanagerparammanager = require("../proto/CMbl_GospStrategyManagerParamManager.js");
const cmbl_gospstrategymanagerparamyquery = require("../proto/CMbl_GospStrategyManagerParamyQuery.js");
const cmbl_gospstrategyimagesmanager = require("../proto/CMbl_GospStrategyImagesManager.js");
const cmbl_gospdockernodemanager = require("../proto/CMbl_GospDockerNodeManager.js");
const cmbl_gospstrategymanager = require("../proto/CMbl_GospStrategyManager.js");

function cls(s) {
  return s;
}
module.exports = {
  [FUNAPI.CMBL_GOSPSTRATEGYMANAGERPARAMMANAGER]: cls(
    cmbl_gospstrategymanagerparammanager
  ),
  [FUNAPI.CMBL_GOSPSTRATEGYMANAGERPARAMYQUERY]: cls(
    cmbl_gospstrategymanagerparamyquery
  ),
  [FUNAPI.CMBL_GOSPSTRATEGYIMAGESMANAGER]: cls(cmbl_gospstrategyimagesmanager),
  [FUNAPI.CMBL_GOSPDOCKERNODEMANAGER]: cls(cmbl_gospdockernodemanager),
  [FUNAPI.CMBL_GOSPSTRATEGYMANAGER]: cls(cmbl_gospstrategymanager),
};

// const SimpleStorage = artifacts.require("SimpleStorage");
const SsfariFactory = artifacts.require("SsfariFactory");
// const Test = artifacts.require("Test");
// const Cash = artifacts.require("Cash");
// const EscrowFactory = artifacts.require("EscrowFactory");
// const PurchaseRecord = artifacts.require("PurchaseRecord");
module.exports = function (deployer) {
  deployer.deploy(SsfariFactory);
  // deployer.deploy(Test);
  // deployer.deploy(Cash);
  // deployer.deploy(PurchaseRecord);
  // deployer.deploy(EscrowFactory);
};

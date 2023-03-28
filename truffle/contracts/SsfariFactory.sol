// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SsfariFactory {
  struct Item {
    uint item_No;
    string item_name;
    string oneline_description;
    uint32 item_price;
    string category;
    string thumbnail_picture;
    string detail_picture;
    string delivery_period;
    string detail_description;
    address seller_address;
    string seller_name;
  }

  // 아이템 event
  event NewItem(uint item_No, string item_name, string oneline_description, 
                        uint32 item_price, string category,
                        string thumbnail_picture, string detail_picture, 
                        string delivery_period, string detail_description, address seller_address, string seller_name);

  // 아이템 variable
  uint public itemPk;
  Item[] public items;

  // 아이템 map
  mapping(uint => Item) itemNoToItem;
  mapping(address => Item) sellerToItem;
  // mapping(address => Item) paidaddrToItem;
  // 구매계약 variable
  uint public PurchasePk;
  PurchaseContract[] public purchasecontracts;
  // 구매계약 map
  mapping(uint => PurchaseContract) purchaseNoToPurchaseContract;
  mapping(address => PurchaseContract) paidToPurchaseContract;
  // 지불 variable
  uint public paid_Pk;
  PaidContract[] public paidcontracts;
  // 지불 map

  
  // 함수 : 아이템 등록 
  function registerItem(string memory item_name, string memory oneline_description, 
                        uint32 item_price, string memory category,
                        string memory thumbnail_picture, string memory detail_picture, 
                        string memory delivery_period, string memory detail_description, 
                        address seller_address, string memory seller_name) public returns (uint){
    itemPk = items.length;
    Item memory item = Item(itemPk, item_name, oneline_description, 
                        item_price, category, thumbnail_picture,detail_picture, 
                        delivery_period ,detail_description, 
                        seller_address, seller_name);
    items.push(item);
    emit NewItem(itemPk, item_name, oneline_description, 
                  item_price, category,
                  thumbnail_picture, detail_picture, 
                  delivery_period, detail_description, seller_address, seller_name);
    itemNoToItem[itemPk]= item;
    sellerToItem[seller_address] = item;
    return itemPk;
  }
  // 함수 : 방금 만든 아이템 번호 조회
  function viewItemNo() public view returns (uint) {
    return itemPk;
  }
  // 함수 : 아이템 전체 조회
  function viewItems() public view returns (Item[] memory) {
    return items;
  }
    // 함수 : 아이템번호로 조회
  function viewItemByItemNo(uint _item_No) public view returns (Item memory) {
    return itemNoToItem[_item_No];
  }
  // 아이템 판매자주소로 조회
  function viewSellerToItem(address _seller_address) public view returns (Item memory) {
    return sellerToItem[_seller_address];
  }
  // 함수 : 아이템 수정(아이템번호 필요)
  // function editItem(uint item_No, string memory item_name, string memory oneline_description, 
  //                   uint32 item_price, string memory category,
  //                   string memory thumbnail_picture, string memory detail_picture, 
  //                   string memory delivery_period, uint32 sales_unit, 
  //                   string memory item_origin, string memory detail_description, address seller_address) public view returns (Item memory) {
  //   Item memory selectItem = items[item_No];
  //   selectItem.item_name = item_name;
  //   selectItem.oneline_description = oneline_description;
  //   selectItem.item_price = item_price;
  //   selectItem.category = category;
  //   selectItem.thumbnail_picture = thumbnail_picture;
  //   selectItem.detail_picture = detail_picture;
  //   selectItem.delivery_period = delivery_period;
  //   selectItem.sales_unit = sales_unit;
  //   selectItem.item_origin = item_origin;
  //   selectItem.detail_description = detail_description;

  //   items[item_No] = selectItem;
  //   sellerToItem[seller_address] = selectItem;
  //   return selectItem;
  // }

  // 함수 : 아이템 삭제 (전체 items의 length는 줄어들지 않음.)
  function deleteItem(uint _item_No) public {
    delete items[_item_No];
  }

  // 함수 : 구매자 대표 전용 > 아이템 구매(계약 생성)
  function purchaseItem(uint _item_No, address _purchase_address, string memory _purchase_name, string memory _shipping_address, uint32 _total_people, uint32 _paid_people, bool _completed, uint _password, address _seller_address) payable public returns (uint){
    PurchasePk = purchasecontracts.length;
    uint32 puchaseContractPrice = items[_item_No].item_price;
    uint _total_price = puchaseContractPrice * _total_people;
    PurchaseContract memory purchaseContract = PurchaseContract(PurchasePk, _item_No, _purchase_address, _purchase_name, _shipping_address, _total_people,  _paid_people, _total_price, _completed, _password, _seller_address);
    purchasecontracts.push(purchaseContract);
    
    // Item memory item = items[_item_No];
    purchaseNoToPurchaseContract[PurchasePk] = purchaseContract;
    return PurchasePk;
  }

  // 함수 : 방금만든 계약 번호 조회
  function viewPurchaseNo() public view returns (uint) {
    return PurchasePk;
  }
  // 구조체 : 구매계약 / 추후 거래내역
  struct PurchaseContract {
    uint purchase_No;
    uint item_No;
    address purchase_address;
    string purchase_name;
    string shipping_address;
    uint32 total_people;
    uint32 paid_people;
    uint total_price;
    bool completed;
    uint password;
    address seller_address;
  }

  struct PaidContract {
    uint paid_No;
    uint item_No;
    uint purchase_No;
    address paid_address;
  }

  // 함수 : 전체 구매계약조회
  function viewPurchaseContract() public view returns (PurchaseContract[] memory) {
    return purchasecontracts;
  }
  // 함수 : 구매번호로 구매계약조회
  function viewPurchaseContractByPurchaseNod(uint purchase_No) public view returns (PurchaseContract memory) {
    return purchaseNoToPurchaseContract[purchase_No];
  }
  // 함수 : 계약 지불 (대표자 제외 다수) from으로 정해진 금액 송금 해야함.
  function paidContract(uint _item_No, uint _purchase_No, address _paid_address) payable external returns (uint) {
    require(purchasecontracts[_purchase_No].completed == false);
    paid_Pk = paidcontracts.length;
    PaidContract memory paidcontract = PaidContract(paid_Pk, _item_No, _purchase_No, _paid_address);
    paidcontracts.push(paidcontract);
    purchasecontracts[_purchase_No].paid_people++;

    purchaseNoToPurchaseContract[_purchase_No].paid_people++;
    return paid_Pk;
  }
  // 함수 : 방금 낸 지불 No
  function viewPaidNo() public view returns (uint) {
    return paid_Pk;
  }
  // 함수 : 계약 취소 ( 구매자들 )
  function paidcancel(uint _paid_No, uint _purchase_No, uint, address _my_address) payable public returns (bool) {
    uint32 amount = items[paidcontracts[_paid_No].item_No].item_price;
    payable(_my_address).transfer(amount);
    delete paidcontracts[_paid_No];
    purchasecontracts[_purchase_No].paid_people--;
    purchaseNoToPurchaseContract[_purchase_No].paid_people--;

    return true;
  }
  // 함수 : 계약 확정 (대표자가 확정) => (셀러에게 돈보냄) 
  function confirmContract(uint _purchase_No) payable public returns (bool) {
    require(purchasecontracts[_purchase_No].paid_people >= purchasecontracts[_purchase_No].total_people);
    purchasecontracts[_purchase_No].completed = true;
    purchaseNoToPurchaseContract[_purchase_No].completed = true;
    address selleradd = items[purchasecontracts[_purchase_No].item_No].seller_address;
    uint sellerprice = purchasecontracts[_purchase_No].total_price;    
    payable(selleradd).transfer(sellerprice * 5 * 1e10);
    return true;
  }
  // 함수 : 보내는 주소 확인 함수
  function confirmContractAddress(uint _purchase_No) public view returns (address){
    address selleradd = items[purchasecontracts[_purchase_No].item_No].seller_address;
    return selleradd;
  }
  // 함수 : 전체 지불 리스트 조회
  function viewPaidContract() public view returns (PaidContract[] memory) {
    return paidcontracts;
  }
  mapping (address => bool) transferedlist;
  // 함수 : 충전 (발표용이므로 front 에서 막아줘야 할 듯)
  function transferMoney(address showmethemoneyAdd) payable public {
    transferedlist[showmethemoneyAdd] = true;
    payable(showmethemoneyAdd).transfer(5 * 1e16);
  }
}

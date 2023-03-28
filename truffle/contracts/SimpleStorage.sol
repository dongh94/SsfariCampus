// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  mapping(address=>uint) myApple;  // 주소별로 사과를 저장할 수 있도록 mapping으로 선언

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) payable public {
    value = newValue;
    myApple[msg.sender]++;      // 초기화 값이 0 인데 이거를 1로 만들어줌
  }
  // function buyApple() payable public{
  //   // msg.sender : contract를 요청한 사람의 주소를 담고 있는 내장 객체
  //   myApple[msg.sender]++;      // 초기화 값이 0 인데 이거를 1로 만들어줌
  // }

  function getMyApple() public view returns(uint){
    return myApple[msg.sender];
  }

  function sellApple(uint _applePrice) payable external{
    uint totalPrice = (myApple[msg.sender] * _applePrice);
                      // 내가 갖고 있는 사과 * 가격
    myApple[msg.sender] = 0;    // 사과 0으로 초기화
    payable(msg.sender).transfer(totalPrice);    // 환볼 느낌
  }

  function sellOneApple(uint _applePrice) payable external {
    myApple[msg.sender]--;
    payable(msg.sender).transfer(_applePrice);
  }

  //////////////////////ssfari campus////////////////////////

  struct Item {
    uint32 price;
    string title;
    string lineInfo;
    string categori;
    string thumbnail;
    string detail;
    string expressDue;
    string info;
  }

  event NewItem(string title, string lineInfo, uint32 price, 
                string categori, string thumbnail, string detail, 
                string expressDue, string info);

  Item[] public items;
  mapping(address => Item) ownerToItem;

  function registItem(string memory title, string memory lineInfo, uint32 price, 
                      string memory categori, string memory thumbnail, string memory detail, 
                      string memory expressDue, string memory info) public {
    items.push(Item(price, lineInfo, title, categori, thumbnail, detail, expressDue, info));
    ownerToItem[msg.sender] = Item(price, lineInfo, title, categori, thumbnail, detail, expressDue, info);
    emit NewItem(title, lineInfo, price, categori, thumbnail, detail, expressDue, info);
  }

  function readItem(address _address) public view returns(Item memory) {
    return ownerToItem[_address];
  }
}

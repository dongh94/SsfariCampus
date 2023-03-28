import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ contract, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getRequestAccounts = async () => {
    if (window.ethereum.isMetaMask) {
      const _account = await window.ethereum.request({
        // 연결이 안되어 있다면 메타마스크 내의 계정들과 연결 요청
        // 연결이 되었다면 메타마스크가 갖고 있는 계정들 중 사용하고 있는 계정 가져오기
        method: "eth_requestAccounts",
      });
      return _account;
    }
  };
  // 체인아이디 자동설정 함수
  const addNetwork1 = async (_chainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: _chainId }],
      });
      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: _chainId,
                chainName: "goerli",
                rpcUrls: [
                  "https://goerli.infura.io/v3/7885ac55f47f453488027010d12acadb",
                ],
                nativeCurrency: {
                  name: "Ethereum",
                  symbol: "ETH", // 통화 단위
                  decimals: 18, // 소수점 자리수
                },
              },
            ],
          });
          return true;
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(
        Web3.givenProvider ||
          "https://goerli.infura.io/v3/7885ac55f47f453488027010d12acadb"
      );
      const accounts = await getRequestAccounts();
      const account = accounts[0]; // for state set
      // 잔액 조회하는 법.
      const balance = await web3.eth.getBalance(accounts[0]);

      //네트워크 연동함수와 같이 사용함.
      addNetwork1(web3.utils.toHex(0x05));

      const networkID = 5;
      const { abi } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          account,
          balance,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/" + contract + ".json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init, contract]);

  // useEffect(() => {
  //   const events = ["chainChanged", "accountsChanged"];
  //   const handleChange = () => {
  //     init(state.artifact);
  //   };

  //   events.forEach((e) => window.ethereum.on(e, handleChange));
  //   return () => {
  //     events.forEach((e) => window.ethereum.removeListener(e, handleChange));
  //   };
  // }, [init, state.artifact]);

  return (
    <div>
      <EthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </EthContext.Provider>
    </div>
  );
}

export default EthProvider;

import _ from "lodash";
import Web3 from "web3";
import ABI from "./NFT.json";
import Address from "./Address.json";

import { WALLET_PRIVATE_KEY, WEB3_PROVIDER_URL } from "../config";

const network_id = "11155111";

const web3 = new Web3(window?.ethereum);

export const getcurrentNetworkId = async () => {
  return network_id;
};

export const getContractAddress = (networkID) => {
  return Address;
};

const getContract = async () => {
  const networkId = await web3?.eth?.accounts?._ethereumCall?.getNetworkId();
  sessionStorage.setItem("currentyNetwork", networkId);
  const ADDRESS = getContractAddress(networkId);
  const contract = ADDRESS && new web3.eth.Contract(ABI, ADDRESS);
  return contract;
};

export const _transction = async (service, ...props) => {
  const callService = _.get(await getContract(), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      value: 0,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _paid_transction = async (cost, service, ...props) => {
  const callService = _.get(await getContract(), ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      value: cost,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _account = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const _fetch = async (service, ...props) => {
  const callService = _.get(await getContract(), ["methods", service]);
  let data;
  if (props) {
    data = await callService(...props).call();
  } else {
    data = await callService().call();
  }

  return data;
};

export const _fetch_signed = async (service, ...props) => {
  const ADDRESS = getContractAddress(network_id);
  const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
  const signer = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
  web3.eth.accounts.wallet.add(signer);
  const contract = new web3.eth.Contract(ABI, ADDRESS);

  const callService = _.get(contract, ["methods", service]);
  const accounts = await web3.eth.getAccounts();
  let data;
  if (props) {
    data = await callService(...props).call({ from: accounts[0] });
  } else {
    data = await callService().call({ from: accounts[0] });
  }

  return data;
};

export const _transction_signed = async (service, ...props) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
  const signer = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
  const ADDRESS = getContractAddress(network_id);
  web3.eth.accounts.wallet.add(signer);
  const contract = new web3.eth.Contract(ABI, ADDRESS);
  const callService = _.get(contract, ["methods", service]);

  const tx = callService(...props);

  const responseData = await tx
    .send({
      from: signer.address,
      // gas: await tx.estimateGas(),
      gas: "4700000",
      value: 0,
    })
    // .then((data) => data)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
      return txhash;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

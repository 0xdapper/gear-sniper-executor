import { ethers } from "ethers";
import { abi as GLBAbi } from "./GLB.abi.json";
import { abi as GearSniperAbi } from "./GearSniper.abi.json";

const CIDER = "0xcb91f4521fc43d4b51586e69f7145606b926b8d4";
const SNIPER = "";
const SNIPER_PK = "";

const sleep = (ms: number) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth.llamarpc.com"
  );
  const ciderContract = new ethers.Contract(CIDER, GLBAbi, provider);
  const fairTradingStart = (
    await ciderContract.callStatic.fairTradingStart()
  ).toNumber();
  console.log({ fairTradingStart });
  const sleepDuration = fairTradingStart * 1000 - 12 - new Date().getTime();
  console.log("sleeping for", sleepDuration);
  await sleep(sleepDuration);

  const signer = new ethers.Wallet(SNIPER_PK, provider);
  const sniperContract = new ethers.Contract(SNIPER, GearSniperAbi, signer);
  const tx = await sniperContract.snipe();
  console.log(tx);
  await tx.wait();
};

main();

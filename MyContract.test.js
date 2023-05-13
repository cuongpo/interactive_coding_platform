const assert = require('assert');
const Web3 = require('web3');

// Create a Web3 instance
const web3 = new Web3('https://mantle-testnet.rpc.thirdweb.com'); // Update the URL if needed

// Import the contract ABI and bytecode
const contractABI = require('./Mycontract.json').abi;
const contractBytecode = require('./Mycontract.json').bytecode.object;

// Set up a test suite
describe('MyContract', () => {
  let contractInstance;

  before(async () => {
    // Deploy the contract before running the tests
    const accounts = await web3.eth.getAccounts();
    const deployment = new web3.eth.Contract(contractABI);
    const deploymentTx = deployment.deploy({
      data: '0x' + contractBytecode
    });
    const deployedContract = await deploymentTx.send({
      from: accounts[0],
      gas: 2000000, // Adjust gas value if needed
    });
    contractInstance = deployedContract.options.address;
  });

  // Write your tests
  it('should return a valid contract address', () => {
    assert.ok(web3.utils.isAddress(contractInstance), 'Invalid contract address');
  });

  // Add more tests here...
  it('should deploy the contract', async () => {
    const token = await Token.deployed();
    assert.ok(token.address);
  });

  it('should have the correct initial supply', async () => {
    const token = await Token.deployed();
    const totalSupply = await token.totalSupply();
    assert.equal(totalSupply, 1000);
  });

  it('should transfer tokens correctly', async () => {
    const token = await Token.deployed();
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 200;

    const initialSenderBalance = await token.balanceOf(sender);
    const initialReceiverBalance = await token.balanceOf(receiver);

    await token.transfer(receiver, amount, { from: sender });

    const finalSenderBalance = await token.balanceOf(sender);
    const finalReceiverBalance = await token.balanceOf(receiver);

    assert.equal(finalSenderBalance.toNumber(), initialSenderBalance.toNumber() - amount);
    assert.equal(finalReceiverBalance.toNumber(), initialReceiverBalance.toNumber() + amount);
  });
});

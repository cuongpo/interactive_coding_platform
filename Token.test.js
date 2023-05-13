const Token = artifacts.require('Token');

contract('Token', (accounts) => {
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

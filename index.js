//contract spec
address = '0xd25f52e4eee1d02ec358bb3ab0230c91c85ceafc';
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"}],"name":"selfDestruct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"RATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]');

window.addEventListener("load", function() {
	//Check for metamask
	if (typeof web3 !== "undefined") {
		//use metamask provider
		window.web3 = new Web3(web3.currentProvider);
		web3.version.getNetwork((arr, netId) => {
			if (netId !== "3") {
				alert("You need to be on the Ropsten testnet.");
			}
		});
		window.contract = web3.eth.contract(abi);
		window.contractInstance = contract.at('0xfF41CaB7D2Db3F574F891C78233d2167981433CD');
		window.transferEvent = contractInstance.Transfer();
		transferEvent.watch((err) => {
			if (!err) {
				contractInstance.balanceOf(currentAccount, (err, balance) => {
					if (!err) {
						document.getElementById("bal").innerHTML = "You have: " + balance.toString() + " BTX";
					}
				});
			}
		});
	} else {
		alert("Web3 client not detected! Install metamask or log in to it!");
	}

	//app logic
	web3.eth.getAccounts(function(error, accounts) {
		if (!error) {
			web3.eth.getBalance(accounts[0], function(error, balance) {
			if (!error) {
				contractInstance.balanceOf(accounts[0], (err, balance) => {
					if (!err) {
						window.currentAccount = accounts[0];
						document.getElementById("acct").innerHTML = "Your account: " + accounts[0].toString();
						document.getElementById("bal").innerHTML = "You have: " + balance.toString() + " BTX";
						console.log("Your account: " + accounts[0] + " has a balance of: " + balance + " BTX");
					} else {
						console.log(err);
					}
				});
			} else {
				console.error(error);
			}
		});
	} else {
		console.error(error);
	}
	});
});

function send() {
	let target = document.getElementById("target").value;
	let amount = document.getElementById("amnt").value;
	document.getElementById("bal").innerHTML = "You have: Pending...";
	console.log("Sending " + amount + " coins to " + target);
	sendTokens(target, amount);
}

function sendTokens(targetAddress, amount) {
	if (typeof contractInstance !== "undefined") {
		contractInstance.transfer(targetAddress, amount, (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
}

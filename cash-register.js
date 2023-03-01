function checkCashRegister(price, cash, cid) {
  const currencyValues = [    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100],
  ];

  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }

  let changeDue = cash - price;
  let output = { status: "", change: [] };

  if (totalCID < changeDue) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  } else if (totalCID === changeDue) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  } else {
    output.status = "OPEN";
    for (let i = cid.length - 1; i >= 0; i--) {
      let currentValue = 0;
      while (changeDue >= currencyValues[i][1] && cid[i][1] >= currencyValues[i][1]) {
        currentValue += currencyValues[i][1];
        changeDue -= currencyValues[i][1];
        cid[i][1] -= currencyValues[i][1];
        changeDue = Math.round(changeDue * 100) / 100;
      }
      if (currentValue > 0) {
        output.change.push([currencyValues[i][0], currentValue]);
      }
    }
    if (changeDue > 0) {
      output.status = "INSUFFICIENT_FUNDS";
      output.change = [];
      return output;
    }
    return output;
  }
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
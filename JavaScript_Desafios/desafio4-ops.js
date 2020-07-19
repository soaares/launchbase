

const user = {
    name: "Raphael",
    transactions: [],
    balance: 0
  };

function createTransaction(transaction) {
    user.transactions.push(transaction);

    if(transaction.type == 'credit') {
        user.balance = user.balance + transaction.value;
    } else {
        user.balance = user.balance - transaction.value;
    }

}

function getHigherTransactionByType(transactionType) {
    let higherTransaction = 0;
    let objectTransaction = '';
    
    for(let i = 0; i < user.transactions.length; i++) {
        if(transactionType == user.transactions[i].type) {
             if(user.transactions[i].value > higherTransaction) {
                 higherTransaction = user.transactions[i].value;
                 objectTransaction = user.transactions[i];
            }
        }
    }

    return objectTransaction;

}

function getAverageTransactionValue() {
    let average = 0;

    for(let i = 0; i < user.transactions.length; i++) {
        average = user.transactions[i].value + average; 
    }
    
    average = average / user.transactions.length;

    return average;

}

function getTransactionsCount() {
    let creditCount = 0;
    let debitCount = 0;

    for(let i = 0; i < user.transactions.length; i++) {
        if(user.transactions[i].type == 'credit') {
            creditCount = creditCount + 1;
        } else {
            debitCount = debitCount + 1;
        }
    }

    return({credit: creditCount, debit: debitCount});

}

createTransaction({type: 'credit', value: 80});
createTransaction({type: 'debit', value: 40});
createTransaction({type: 'debit', value: 140});
createTransaction({type: 'credit', value: 70});


let findHigherTransaction = getHigherTransactionByType('debit');
let averageValue = getAverageTransactionValue();
let countTransactions = getTransactionsCount();

console.log(findHigherTransaction);
console.log(averageValue);
console.log(countTransactions);
console.log(user.balance);

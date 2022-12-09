class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions){
      balance += transaction.value;
    }
    return balance;

  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    
    if (this.isAllowed()){
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }

    return false;
  }

}

class Deposit extends Transaction {


  get value() {
    return this.amount;
  }

  isAllowed(){
    if (this.amount < 0){
      return false;
    }
    return true;
  }

}

class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }

  isAllowed(){
    if (this.account.balance < this.amount){
      return false;
    }
    return true;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
console.assert(t1.commit(), "Withdrawal failed!");
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
console.assert(t1.commit(), "Withdrawal failed!");
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

t4 = new Withdrawal(5000, myAccount);
console.assert(t4.commit(), "Withdrawal failed!");
console.log('Transaction 4:', t4);

t5 = new Withdrawal(20, myAccount);
console.assert(t5.commit(), "Withdrawal failed!");
console.log('Transaction 5:', t5);

console.log('Balance:', myAccount.balance);
console.log(myAccount.transactions);

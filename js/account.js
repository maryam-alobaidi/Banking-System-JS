
class Account{
    #numAccount;
    #balance;

    constructor(numAccount,balance){
        this.#numAccount=numAccount;
        this.#balance=balance;
    }


    //numAccunt
    get numAccount(){return this.#numAccount;};
    set numAccount(value){this.#numAccount=value;};

     //balance
    get balance(){return this.#balance;};
    set balance(value){this.#balance=value;};

deposit(amount){
  this.#balance+=amount;
  return this.#balance;
}

withDraw(amount){
    if(amount>this.#balance){
        console.error('nsufficient funds');
        return;
    }
           this.#balance -= amount;
            return this.#balance;
}




}
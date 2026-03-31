class Client{
    #firstname;
    #lastname;
    #dni;
    #accountList;

    

    constructor(firstname,lastname,dni){
    this.#firstname=firstname;
    this.#lastname=lastname;
    this.#dni=dni;
    this.#accountList=[];

    }

//  (Name)
    get firstname() {
        return this.#firstname;
    }
    set firstname(value) {
        this.#firstname = value;
    }

    //  (Lastname)
    get lastname() {
        return this.#lastname;
    }
    set lastname(value) {
        this.#lastname = value;
    }

    // (DNI)
    get dni() {
        return this.#dni;
    }
    set dni(value) {
        this.#dni = value;
    }

    // (Account List)
    get accountList() {
        return this.#accountList;
    } 


    addAccount(newAccount){
        this.#accountList.push(newAccount);
    }


    removeAccount(accountToDelete){

    return this.#accountList=this.#accountList.filter(a=>a.numAccount!==accountToDelete);

}

  
}
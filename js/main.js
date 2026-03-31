"use strict";

let clients=[];
let currentClientDni='';

function createClient(){
    const firstname=document.getElementById('firstname').value;
    const lastname=document.getElementById('lastname').value;
    const dni=document.getElementById('dni').value;

    const result=document.getElementById('result-display');

   

    let newClient=new Client(firstname,lastname,dni);
    clients.push(newClient);
    renderClients();
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('dni').value = "";


}

function deleteClient(dni){

    if(confirm('Are sure you want to delete this client?')){
        clients=clients.filter(c=>c.dni!==dni);
             renderClients();
    }  
}


function renderClients() {
    const result = document.getElementById('result-display');
    result.innerHTML = "";

    clients.forEach((c) => {
        let accountsHTML = "";
        
        if (c.accountList && c.accountList.length > 0) {
            c.accountList.forEach(acc => {
                accountsHTML += `
                <div class="alert alert-info py-2 px-3 mb-2 shadow-sm">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span><i class="bi bi-credit-card-2-front"></i> Acc: <strong>${acc.numAccount}</strong></span>
                        <span class="badge bg-primary fs-6">${acc.balance} €</span>
                    </div>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-success flex-grow-1" onclick="openTransactionModal('${c.dni}', '${acc.numAccount}', 'deposit')">
                            <i class="bi bi-arrow-down-circle"></i> Deposit
                        </button>
                        <button class="btn btn-sm btn-warning flex-grow-1" onclick="openTransactionModal('${c.dni}', '${acc.numAccount}', 'withdraw')">
                            <i class="bi bi-arrow-up-circle"></i> Withdraw
                        </button>

                             <button class="btn btn-outline-danger btn-sm" onclick="deleteAccount('${c.dni}', '${acc.numAccount}')">
                    <i class="bi bi-trash3"></i>
                </button>
                    </div>
                </div>`;
            });
        } else {
            accountsHTML = `<p class="text-muted small italic p-2">No accounts yet.</p>`;
        }

        result.innerHTML += `
        <div class="card mb-3 border-0 shadow-sm overflow-hidden">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-primary"><i class="bi bi-person-badge"></i> ${c.firstname} ${c.lastname}</h5>
                <span class="badge bg-secondary">DNI: ${c.dni}</span>
            </div>
            <div class="card-body bg-light">
                ${accountsHTML} 
            </div>
            <div class="card-footer bg-white d-flex gap-2">
                <button class="btn btn-outline-success btn-sm flex-grow-1" onclick="openAccountModal('${c.dni}')" data-bs-toggle="modal" data-bs-target="#accountModal">
                    <i class="bi bi-plus-lg"></i> New Account
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteClient('${c.dni}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>`;
    });
}

function deleteAccount(clientDni,numAccount){
   const client=clients.find(c=>c.dni===clientDni);
   if (!client) {
        alert("No client found.");
        return;
      }

  if (confirm(`Are you sure you want to delete account: ${numAccount}?`)) {

   if(client.removeAccount(numAccount)){
   alert("Account deleted successfully.");

   renderClients();
   }
  }

}


function openAccountModal(dni){
currentClientDni=dni;
   
    document.getElementById('inNumAccount').value='';
    document.getElementById('inBalance').value='';

}

document.getElementById('btnCreate').addEventListener('click',()=>{
    const numAccount=document.getElementById('inNumAccount').value;
    const blance=Number(document.getElementById('inBalance').value);

if(!numAccount || isNaN(blance)){
    alert('Please enter a valid account number and balance.');
    return;
}

    let newAccount=new Account(numAccount,blance);

    const client=clients.find(c=>c.dni===currentClientDni);

    if(!client){
        console.log('Error to create account for this client..');
        return;
    }

    
    client.addAccount(newAccount);

    alert('Successfully');

    const modal=document.getElementById('accountModal');
    const modalInstence=bootstrap.Modal.getInstance(modal);
if(modalInstence){
    modalInstence.hide();
}

renderClients();
})

let currentTrans={dni:'',numAccount:'',type:''};

function openTransactionModal(dni,numAccount,type){
    currentTrans={dni,numAccount,type};

   const title= document.getElementById('transTitle');
   const header=document.getElementById('transHeader');

   if(type==='deposit'){
    title.textContent='Deposit transaction';
    header.className='modal-header bg-success text-white';
   }else{
     title.textContent='Withdraw transaction';
     header.className='modal-header bg-warning text-dark';
   }

   document.getElementById('transAmount').value="";

   new bootstrap.Modal(document.getElementById('transactionModal')).show();

}

function executeTransaction() {
    const amount = parseFloat(document.getElementById('transAmount').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    const client = clients.find(c => c.dni === currentTrans.dni);

    if (client) {
     

       const currentAccount = client.accountList.find(acc =>String(acc.numAccount).trim() === String(currentTrans.numAccount).trim()) 
         if (currentAccount) {
            if (currentTrans.type === 'deposit') {
                currentAccount.deposit(amount);
                alert(`Successfully deposited ${amount}€`);
                renderClients();
            } 
            else if (currentTrans.type === 'withdraw') {
                if (amount > currentAccount.balance) {
                    alert("Insufficient funds!");
                    return;
                }
                currentAccount.withDraw(amount);
                alert(`Successfully withdrew ${amount}€`);
                renderClients();
            }

          
            const modal = bootstrap.Modal.getInstance(document.getElementById('transactionModal'));
            document.body.focus(); 
            document.activeElement.blur();
            modal.hide();
        } else {
            alert("Account not found.");
        }
    }
}
let userIncome = document.getElementById("income2");
let incomeDescription = document.getElementById("incomeDesc");
let userExpense = document.getElementById("expense");
let expenseDescription = document.getElementById("expenseDesc");

const incomeBTN = document.getElementById("incomeBTN");
const expenseBTN = document.getElementById("expenseBTN");
const totalBTN = document.getElementById("totalBTN");
const clearBTN = document.getElementById("clearBTN");

const ulIncomeList = document.getElementById("ULincome");
const ulExpenseList = document.getElementById("ULexpenses");
const incomeH1 = document.querySelector(".incomeH1");
const expensesH1 = document.querySelector(".expensesH1");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modalPara");
const modalInsert = document.querySelector(".modalinsert");
const newHeadContainer = document.querySelector(".newheadcontainer");

const accountMy = {
  name: "jesse",
  expenses: [],
  income: [],
  addExpenseItem: function(description, amount) {
    this.expenses.push({
      description: description,
      amount: amount
    });
    // make list for expenses
    newHeadContainer.style.display = "flex";
    document.querySelector("#totalContainer").style.display = "flex";

    const liExp = document.createElement("li");
    liExp.className = "li-item-expenses";

    liExp.appendChild(document.createTextNode(`${description} : $${amount}`));
    const link = document.createElement("a");
    link.className = "delete secondary-content-expenses";
    link.innerHTML = `<i class="far fa-times-circle"></i>`;
    // Below for loop adds id to each item added to target to delete after. Reference Score Calculator Code
    let i = 0;
    for (i = 0; i <= this.expenses.length - 1; i++) {
      link.setAttribute("id", "newListItem-" + i);
    }
    liExp.appendChild(link);
    ulExpenseList.appendChild(liExp);
  },
  addIncomeItem: function(description, amount) {
    this.income.push({
      description: description,
      amount: amount
    });
    // make list for income

    newHeadContainer.style.display = "flex";
    document.querySelector("#totalContainer").style.display = "flex";

    const li = document.createElement("li");
    li.className = "li-item";

    li.appendChild(document.createTextNode(`${description} : $${amount}`));
    const link = document.createElement("a");
    link.classList = "delete secondary-content";
    link.innerHTML = `<i class="far fa-times-circle"></i>`;
    let i = 0;
    for (i = 0; i <= this.income.length - 1; i++) {
      link.setAttribute("id", "newIncome-" + i);
    }
    li.appendChild(link);
    ulIncomeList.appendChild(li);
    // remove item LEFT OFF HERE. Slightly lost
    // link.onclick = function(e){
    //   console.log(e.target)
    //   let removeItem = parseInt(link.id.split("-")[1]);
    //   console.log(removeItem)
    //   this.parentElement.remove();
    //   accountMy.income.splice(removeItem, 1)
    //   for(i=0; i <= accountMy.income.length -1; i++){
    //     link.setAttribute("id", "newIncome-" + i)
    //   }

    // //  ^this almost works. It needs to be in a loop i think to update the number added at the end

    // }
  },
  getAccountSummary: function() {
    let totalExpenses = 0;
    let totalIncome = 0;
    this.expenses.forEach(function(expense) {
      totalExpenses = totalExpenses + expense.amount;
    });
    this.income.forEach(function(inc) {
      totalIncome = totalIncome + inc.amount;
    });
    let totalMoney = totalIncome - totalExpenses;
    // create content for modal
    const modalinsert = document.querySelector(".modalinsert");
    const modalContent = document.createElement("p");
    modalContent.className = "modalSummary";
    if (totalMoney >= 0) {
      modalContent.innerHTML = `You have a balance of <strong>$${totalMoney}</strong>. Expenses were <strong>$${totalExpenses}</strong> and income was <strong>$${totalIncome}</strong>`;
    } else if (totalMoney < 0) {
      modalContent.innerHTML = `You owe <strong>$${totalMoney}</strong>. Your expenses were <strong>$${totalExpenses}</strong> and income was only <strong>$${totalIncome}</strong>`;
    }
    modalinsert.appendChild(modalContent);
    console.log(totalMoney);
  }
};

function getIncomeValues() {
  this.description = incomeDescription.value;
  this.amount = parseFloat(userIncome.value);
  if (userIncome.value === "") {
    console.log("no");
    const div = document.createElement("div");
    div.className = `alertMSG`;
    div.appendChild(document.createTextNode("Please enter income"));
    const container = document.querySelector(".income-container");
    container.insertAdjacentElement("afterbegin", div);
    // Below disabled button for 3 sec and inserts alert
    incomeBTN.setAttribute("disabled", true);
    setTimeout(function() {
      document.querySelector(".alertMSG").remove();
      incomeBTN.removeAttribute("disabled");
    }, 3000);
    return false;
  }
  accountMy.addIncomeItem(this.description, this.amount);
  incomeDescription.value = "";
  userIncome.value = "";
}

function getExpenseValues() {
  this.description = expenseDescription.value;
  this.amount = parseFloat(userExpense.value);
  if (userExpense.value === "") {
    console.log("no");
    const div = document.createElement("div");
    div.className = `alertMSG`;
    div.appendChild(document.createTextNode("Please enter expense"));
    const container = document.querySelector(".expense-container");
    container.insertAdjacentElement("afterbegin", div);
    // Below disabled button for 3 sec and inserts alert
    expenseBTN.setAttribute("disabled", true);
    setTimeout(function() {
      document.querySelector(".alertMSG").remove();
      expenseBTN.removeAttribute("disabled");
    }, 3000);
    return false;
  }
  accountMy.addExpenseItem(this.description, this.amount);
  expenseDescription.value = "";
  userExpense.value = "";
}

function getTotal() {
  console.log(accountMy.getAccountSummary());
}

function removeTaskIncome(e) {
  let index = e.target.parentElement.id;
  let indexU = index.slice(-1);
  console.log(indexU);
  if (e.target.parentElement.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  let removeItem = parseInt(index.split("-")[1]);
  console.log(removeItem);
  // for(index=0; index < accountMy.income.length; index++){
  if (removeItem === indexU) {
    // accountMy.income.splice(indexU, 1);
  }
  delete accountMy.income[indexU];
  // accountMy.income.splice(removeItem, 1)
  console.log(accountMy.income);
}
// }

function removeTaskExpenses(e) {
  let index = e.target.parentElement.id;
  let indexU = index.slice(-1);
  console.log(indexU);
  if (e.target.parentElement.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  let removeItem = parseInt(index.split("-")[1]);
  console.log(removeItem);
  if (removeItem === indexU);
  delete accountMy.expenses[indexU];
  console.log(accountMy.expenses);
}

// modals
function showTotalModal() {
  modal.style.display = "block";
  accountMy.getAccountSummary();
}

function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
    document.querySelector(".modalSummary").remove();
  }
}

function modalClose(e) {
  if (e.target === closeModal) {
    modal.style.display = "none";
    document.querySelector(".modalSummary").remove();
  }
}

// event listeners

incomeBTN.addEventListener("click", getIncomeValues);
expenseBTN.addEventListener("click", getExpenseValues);
totalBTN.addEventListener("click", showTotalModal);
ulIncomeList.addEventListener("click", removeTaskIncome);
ulExpenseList.addEventListener("click", removeTaskExpenses);
totalBTN.addEventListener("click", showTotalModal);
window.addEventListener("click", clearModal);
closeModal.addEventListener("click", modalClose);

// calculate total should be displayed in modal?

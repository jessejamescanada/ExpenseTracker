let userIncome = document.getElementById("income2");
let incomeDescription = document.getElementById("incomeDesc");
let userExpense = document.getElementById("expense");
let expenseDescription = document.getElementById("expenseDesc");

const incomeBTN = document.getElementById("incomeBTN");
const expenseBTN = document.getElementById("expenseBTN");
const totalBTN = document.getElementById("totalBTN");

const ulIncomeList = document.getElementById("ULincome");
const ulExpenseList = document.getElementById("ULexpenses");

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
    const liExp = document.createElement("li");
    liExp.className = "li-item-expenses";

    liExp.appendChild(document.createTextNode(`${description} : ${amount}`));
    const link = document.createElement("a");
    link.className = "delete secondary-content-expenses";
    link.innerHTML = `<i class="fa fa-remove"></i>`;
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
    const li = document.createElement("li");
    li.className = "li-item";

    li.appendChild(document.createTextNode(`${description} : ${amount}`));
    const link = document.createElement("a");
    link.classList = "delete secondary-content";
    link.innerHTML = `<i class="fa fa-remove"></i>`;
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
    return `${this.name} has a balance of $${totalMoney}. Expenses were ${totalExpenses} and Income was ${totalIncome}`;
  }
};

function getIncomeValues() {
  this.description = incomeDescription.value;
  this.amount = parseFloat(userIncome.value);
  accountMy.addIncomeItem(this.description, this.amount);
  incomeDescription.value = "";
  userIncome.value = "";
}

function getExpenseValues() {
  this.description = expenseDescription.value;
  this.amount = parseFloat(userExpense.value);
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

// event listeners
incomeBTN.addEventListener("click", getIncomeValues);
expenseBTN.addEventListener("click", getExpenseValues);
totalBTN.addEventListener("click", getTotal);
ulIncomeList.addEventListener("click", removeTaskIncome);
ulExpenseList.addEventListener("click", removeTaskExpenses);

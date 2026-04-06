const input = document.getElementById('inputId');
const descInput = document.getElementById('descInput');
const button = document.getElementById('inputButton');
const resetButton = document.getElementById('resetButton');
const typeSelect = document.getElementById('typeSelect');
const listContainer = document.getElementById('listContainer');

let arr = JSON.parse(localStorage.getItem("transactions")) || [];
let editIndex = null;
let currentFilter = "all";

function saveToLocal() {
    localStorage.setItem("transactions", JSON.stringify(arr));
}

function onSubmit() {
    const amount = input.value;
    const type = typeSelect.value;
    const description = descInput.value;

    if (amount === "" || type === "" || description === "") {
        alert("Please enter all fields");
        return;
    }

    if (amount <= 0) {
        alert("Please enter valid amount");
        return;
    }

    const entry = {
        description,
        amount: Number(amount),
        type
    };

    if (editIndex !== null) {
        arr[editIndex] = entry;
        editIndex = null;
        button.innerText = "Submit";
    } else {
        arr.push(entry);
    }

    saveToLocal();

    input.value = "";
    descInput.value = "";
    typeSelect.value = "";

    renderList();
}

function deleteItem(index) {
    arr = arr.filter((item, i) => i !== index);
    saveToLocal();
    renderList();
}

function editItem(index) {
    const item = arr[index];
    input.value = item.amount;
    descInput.value = item.description;
    typeSelect.value = item.type;
    editIndex = index;
    button.innerText = "Update";
}

function setFilter(value) {
    currentFilter = value;
    renderList();
}

function renderList() {
    let filteredArr = arr;

    if (currentFilter !== "all") {
        filteredArr = arr.filter(item => item.type === currentFilter);
    }

    const result = filteredArr.map((item) => {
        const index = arr.indexOf(item);

        return `
        <div class="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
            <div>
                <h1 class="font-semibold text-gray-800">${item.description}</h1>
                <p class="text-sm text-gray-500">${item.amount} - ${item.type}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="editItem(${index})"
                    class="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-sm">Edit</button>
                <button onclick="deleteItem(${index})"
                    class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
            </div>
        </div>
        `;
    }).join("");

    listContainer.innerHTML = result;

    updateSummary();
}

function updateSummary() {
    const income = totalAmount("income");
    const expense = totalAmount("expense");
    const balance = income - expense;

    document.getElementById("income").innerText = `Total Income: ${income}`;
    document.getElementById("expense").innerText = `Total Expense: ${expense}`;
    document.getElementById("balance").innerText = `Balance: ${balance}`;
}

function totalAmount(type) {
    return arr.reduce((total, item) => {
        return item.type === type ? total + item.amount : total;
    }, 0);
}

resetButton.addEventListener("click", () => {
    input.value = "";
    descInput.value = "";
    typeSelect.value = "";
    editIndex = null;
    button.innerText = "Submit";
});

button.addEventListener("click", onSubmit);

renderList();
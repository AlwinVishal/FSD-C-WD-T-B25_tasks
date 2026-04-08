let arr = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

const saveToLocal = () => {
    localStorage.setItem("transactions", JSON.stringify(arr));
}

const description = document.getElementById("descInput");
const input = document.getElementById("inputId");
const typeSelect = document.getElementById("typeSelect");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("listContainer");
const resetBtn = document.getElementById("resetBtn");

const filters = document.querySelectorAll('input[name="filter"]');

filters.forEach(item => {
    item.addEventListener("change", renderList);
});

function onSubmit() {

    const desc = description.value.trim();
    const rawAmount = input.value;
    const type = typeSelect.value;

    if (rawAmount === "" || desc === "" || type === "") {
        alert("Please enter all the fields");
        return;
    }

    const amount = Number(rawAmount);

    if (amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (editId != null) {
        arr.forEach(item => {
            if (item.id === editId) {
                item.desc = desc;
                item.amount = amount;
                item.type = type
            }
        });
        editId = null;
        addBtn.textContent = "Submit";
    }
    else {
        const entry = {
            id: Date.now(),
            desc,
            amount,
            type
        }
        arr.push(entry);
    }

    saveToLocal();

    description.value = "";
    input.value = "";
    typeSelect.value = "";

    renderList();
    updateSummary();
}

function renderList() {

    listContainer.style.opacity = "0";

    setTimeout(() => {

        listContainer.innerHTML = "";

        const selectedFilter = document.querySelector('input[name="filter"]:checked').value;

        let filteredArr = arr;

        if (selectedFilter !== "all") {
            filteredArr = arr.filter(item => item.type === selectedFilter);
        }

        if (filteredArr.length === 0) {
            listContainer.innerHTML = `
            <p class="text-center text-gray-400 mt-4">
                No transactions found
            </p>
        `;
            listContainer.style.opacity = "1";
            return;
        }

        filteredArr.forEach(item => {
            let bgColor = "";
            if (item.type === "income") {
                bgColor = "bg-green-500";
            } else {
                bgColor = "bg-red-500";
            }

            const div = document.createElement('div');
            div.className = `flex justify-between items-center ${bgColor} p-3 rounded-lg mb-2 shadow-sm text-white font-semibold transition hover:scale-105 hover:shadow-md`;

            const text = document.createElement("span");
            text.textContent = `${item.desc} - ₹${item.amount} (${item.type})`;

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editItem(item.id);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteItem(item.id);

            const btnContainer = document.createElement("div");
            btnContainer.className = "flex gap-2";

            editBtn.className = "bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-500";
            deleteBtn.className = "bg-red-800 text-white px-2 py-1 rounded hover:bg-red-900";

            btnContainer.append(editBtn, deleteBtn);
            div.append(text, btnContainer);

            listContainer.appendChild(div);
        });

        listContainer.style.opacity = "1";

    }, 200);
}

function editItem(id) {
    editId = id;
    arr.forEach(item => {
        if (item.id === id) {
            description.value = item.desc;
            input.value = item.amount;
            typeSelect.value = item.type;
            addBtn.textContent = "Update";
        }
    })
}

function deleteItem(id) {
    arr = arr.filter(item => item.id !== id);
    saveToLocal();
    renderList();
    updateSummary();
}

function updateSummary() {
    let income = 0;
    let expense = 0;

    arr.forEach(item => {
        if (item.type === "income") {
            income += item.amount;
        }
        else {
            expense += item.amount;
        }
    })

    const balance = income - expense;

    document.getElementById("totalIncome").textContent = `₹ ${income.toLocaleString()}`;
    document.getElementById("totalExpense").textContent = `₹ ${expense.toLocaleString()}`;
    document.getElementById("balance").textContent = `₹ ${balance.toLocaleString()}`;
}

function onReset() {
    input.value = "";
    description.value = "";
    typeSelect.value = "";
}

renderList();
updateSummary();
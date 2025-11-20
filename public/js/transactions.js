const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();
    updateTotal();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();


function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
    updateTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item, index) => {
            let type = "Entrada";
            if (item.type === "2") type = "Saída";

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}


// FUNÇÃO PARA EXCLUIR TRANSAÇÃO DE ENTRADA OU SAÍDA
function deleteTransaction(index) {
    if (confirm("Deseja realmente excluir esta transação?")) {

        data.transactions.splice(index, 1); 

        saveData(data);  
        getTransactions();
        updateTotal();

        alert("Transação excluída com sucesso.");
    }
}


// FUNÇÃO PARA RECALCULAR APÓS EXCLUSÃO
function updateTotal() {
    let total = 0;

    data.transactions.forEach(item => {
        if (item.type === "1") total += item.value;  
        else total -= item.value;                    
    });

    const totalDisplay = document.getElementById("total-display");
    if (totalDisplay) {
        totalDisplay.innerText = total.toFixed(2);
    }
}


// SALVAR NO LOCALSTORAGE
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
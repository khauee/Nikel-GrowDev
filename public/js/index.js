const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


// 1 - Verificar existencia de usuário já logado
// 2 - Caso exista um usuário logado, mandar para a página home
// 3 - Caso não, manter na página index
checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});


//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    // 1 - remove o recarregamento da página ao submeter um form
    e.preventDefault();

    // 2 - Capturar os dados informados pelo usuário no form
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    // 3 - Verificar se o que foi digitado atende a os critérios mínimos
    if(email.length < 5){
        alert("Preencha o campo com e-mail válido.");
        return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    // 4 - Armazena os dados da conta no localStorage
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    // 5 -  Fechar o modal
    myModal.hide();

    // 7 - Feedback para usuário
    alert("Conta criada com sucesso.");
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
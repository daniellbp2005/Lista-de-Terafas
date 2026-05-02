let contHTML = document.getElementById("contador");
let cont = 0;
const inputTarefa = document.getElementById("inputTarefa");
const btnEnviar = document.getElementById("btn");
let underList = document.getElementById("underList")
let aviso = document.getElementById("aviso")
var listaTerefas = [];

const tarefas = [
    { id: 7, tarefa: "Lavar a louça" }, { id: 10, tarefa: "ligar a máquina de lavar" }
]

document.addEventListener("DOMContentLoaded", () => {
    const verificar = localStorage.getItem("tarefas")
    if (verificar == null) {
        listaTerefas = tarefas;
    } else {
        listaTerefas = JSON.parse(verificar);
    }

    const verificarContador = localStorage.getItem("contador")
    if (verificarContador == null) {
        cont = 0;
        localStorage.setItem("contador", JSON.stringify(cont))
    } else {
        cont = JSON.parse(verificarContador);
        contHTML.innerText = cont
    }

    listaTerefas.forEach(element => {
        const li = document.createElement("li");
        const p = document.createElement("span");
        const  espaco = document.createElement("div")
        const rem = document.createElement("button");
        const con = document.createElement("button");

        p.innerText = element.tarefa;
        rem.innerText = "❌";
        con.innerText = "✅";

        underList.append(li);
        li.append(p);
        li.append(espaco)
        espaco.append(rem);
        espaco.append(con);

        rem.addEventListener("click", () => {
            li.remove();
            let id = element.id;
            listaTerefas = listaTerefas.filter(item => item.id !== id);
            let converter = JSON.stringify(listaTerefas);
            localStorage.setItem("tarefas", converter);
        })

        con.addEventListener("click", () => {
            cont += 1;
            contHTML.innerText = cont;
            localStorage.setItem("contador", JSON.stringify(cont));
            li.remove();
            let id = element.id;
            listaTerefas = listaTerefas.filter(item => item.id !== id);
            let converter = JSON.stringify(listaTerefas);
            localStorage.setItem("tarefas", converter);
        })
    });
})

btnEnviar.addEventListener("click", () => {
    if (inputTarefa.value.trim()) {
        let tarefa = inputTarefa.value;
        const li = document.createElement("li");
        const p = document.createElement("span");
        const rem = document.createElement("button");
        const con = document.createElement("button");
        const espaco = document.createElement("div");
        let array = { id: Date.now(), tarefa: tarefa };

        p.innerText = tarefa;
        rem.innerText = "❌";
        con.innerText = "✅";

        underList.append(li);
        li.append(p);
        li.append(espaco)
        espaco.append(rem);
        espaco.append(con);

        rem.addEventListener("click", () => {
            li.remove();
            listaTerefas = listaTerefas.filter(item => item.id !== array.id);
            let converter = JSON.stringify(listaTerefas);
            localStorage.setItem("tarefas", converter);
            aviso.style.color = "red";
            aviso.innerText = "Tarefa Removida"
        })

        con.addEventListener("click", () => {
            cont += 1;
            contHTML.innerText = cont;
            localStorage.setItem("contador", JSON.stringify(cont));
            li.remove();
            listaTerefas = listaTerefas.filter(item => item.id !== array.id);
            let converter = JSON.stringify(listaTerefas);
            localStorage.setItem("tarefas", converter);
            aviso.style.color = "green";
            aviso.innerText = "Tarefa Concluida"
        })

        listaTerefas.push(array);
        localStorage.setItem("tarefas", JSON.stringify(listaTerefas));

        inputTarefa.value = "";
        aviso.style.color = "green";
        aviso.innerText = "Tarefa Adicionada"
    } else {
        aviso.style.color = "red";
        aviso.innerText = "Digite a Terefa."
    }
})
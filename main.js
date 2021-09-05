let todoList = [];

const DOM = {
  item: document.getElementById("description"),
  ul: document.querySelector("ul"),
  section: document.querySelector("section"), 
  
  //ESCONDE O COMPONENTE SECTION
  hiddenSection(){
    if(!todoList.length){
      DOM.section.classList.add("hidden");
    }else{
      DOM.section.classList.remove("hidden");
    }
  },

  //MONTA A LISTA DE ELEMENTOS NA DOM
  buildList(){
    console.log(1, todoList.length)
    console.log(2, todoList)
    DOM.ul.innerHTML = "";
    todoList.length && todoList.map(item => {      
      const li = document.createElement("li");
      li.setAttribute("id", item.id),
      li.innerHTML = `
        <span class="${item.status ? "" : "done"}" onClick="DOM.toggleStatus(${item.id})">${item.description}</span>
        <button onclick="DOM.removeItem(${item.id})">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24" height="24"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M80.625,21.5c-2.81347,0 -5.68994,0.98682 -7.72656,3.02344c-2.03662,2.03662 -3.02344,4.91309 -3.02344,7.72656v5.375h-32.25v10.75h5.375v86c0,8.83935 7.28565,16.125 16.125,16.125h64.5c8.83935,0 16.125,-7.28565 16.125,-16.125v-86h5.375v-10.75h-32.25v-5.375c0,-2.81347 -0.98682,-5.68994 -3.02344,-7.72656c-2.03662,-2.03662 -4.91308,-3.02344 -7.72656,-3.02344zM80.625,32.25h21.5v5.375h-21.5zM53.75,48.375h75.25v86c0,2.98145 -2.39355,5.375 -5.375,5.375h-64.5c-2.98144,0 -5.375,-2.39355 -5.375,-5.375zM64.5,64.5v59.125h10.75v-59.125zM86,64.5v59.125h10.75v-59.125zM107.5,64.5v59.125h10.75v-59.125z"></path></g></g>
          </svg>
        </button>
      `,

      DOM.ul.appendChild(li)
    })
    
    DOM.hiddenSection();
  },

  //INVERTE O STATUS DA TAREFA
  toggleStatus(id){
    todoList.forEach(item => item.id === id && (
      item.status = !item.status
    ))
    DOM.buildList();
    DOM.sendDataToLocalStorage();
  },

  // ADICIONA TAREFA A LISTA
  addItem(){
    todoList.push({
      id: Math.floor(Math.random() * (1000000 - 0)) + 0,
      description: DOM.item.value,
      status: true
    });

    DOM.item.value = "",
    DOM.buildList();
    DOM.sendDataToLocalStorage();
  },

  //REMOVE TAREFA DA LISTA
  removeItem(id){
    const index = todoList.findIndex(item => item.id === id);
    todoList.splice(index, 1);

    DOM.buildList();
    DOM.sendDataToLocalStorage();
  },

  //LIMPA A LISTA DE TAREFAS
  removeAll(){
    todoList = [];

    DOM.buildList();
    DOM.sendDataToLocalStorage();
  },

  //ARMAZENAR DADOS NO LOCALSTORAGE
  sendDataToLocalStorage(){
    localStorage.setItem("todolist@data", JSON.stringify(todoList));
  },

  //RECEBER DADOS DO LOCALSTORAGE
  receiveDataFromLocalSotorage(){
    const list = localStorage.getItem("todolist@data") || [];
    todoList = list.length ? JSON.parse(list) : list;
    console.log(todoList)
  }
}

const App = {
  init(){
    DOM.receiveDataFromLocalSotorage();
    DOM.buildList();
  }
}

App.init();

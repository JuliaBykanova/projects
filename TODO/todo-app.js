(function() {
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return{
      form,
      input,
      button,
    };
  }

  function createTodoList(){
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-ctnter');
    item.textContent = name;


    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return{
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp (container, title = "Список дел", array, key){
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let massiv = [];

    if (localStorage.getItem(key) !== null) {
      massiv = JSON.parse(localStorage.getItem(key));
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener('input', function(e) {
      e.preventDefault();
      if (todoItemForm.input.value !== '') {
        todoItemForm.button.disabled = false;
      } else if (todoItemForm.input.value === ''){
        todoItemForm.button.disabled = true;
      }
    });

    if (array){
      let keys = Object.keys(array);
    for (let key of keys){
      let todoArrayItem = createTodoItem(array[key].name);

      todoArrayItem.doneButton.addEventListener('click', function() {
        todoArrayItem.item.classList.toggle('list-group-item-success');
      });
      todoArrayItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoArrayItem.item.remove();
        }
      });

      if (array[key].done){
        todoArrayItem.item.classList.add('list-group-item-success');
      }

      todoList.append(todoArrayItem.item);
    }
    }

    if (localStorage.getItem(key) !== null) {
      let massiv = JSON.parse(localStorage.getItem(key));
      for (let i = 0; i < massiv.length; i++) {
        let todoItem = createTodoItem(massiv[i].name);
        if (massiv[i].done){
          todoItem.item.classList.add('list-group-item-success');
        }
        todoList.append(todoItem.item);
      todoItem.doneButton.addEventListener('click', function(){
          todoItem.item.classList.toggle('list-group-item-success')
          if (todoItem.item.classList.contains('list-group-item-success')){
            console.log(todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13));
            for (let i = 0; i < massiv.length; i++){
              if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
                massiv[i].done = true;
              }
            }
          } else {
            for (let i = 0; i < massiv.length; i++){
              if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
                massiv[i].done = false;
              }
            }
          }
          localStorage.setItem(key, JSON.stringify(massiv));
      })
      todoItem.deleteButton.addEventListener('click', function(){
          if(confirm('Вы уверены?')){
              todoItem.item.remove();
              for (let i = 0; i < massiv.length; i++){
                if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
                  massiv.splice(i, 1);
                }
              }
              localStorage.setItem(key, JSON.stringify(massiv));
              /*localStorage.removeItem(key);*/
          }
      })
      }
    }

    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!todoItemForm.input.value){
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        if (todoItem.item.classList.contains('list-group-item-success')){
          console.log(todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13));
          for (let i = 0; i < massiv.length; i++){
            if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
              massiv[i].done = true;
            }
          }
        } else {
          for (let i = 0; i < massiv.length; i++){
            if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
              massiv[i].done = false;
            }
          }
        }
        localStorage.setItem(key, JSON.stringify(massiv));
      });
      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          for (let i = 0; i < massiv.length; i++){
            if ( massiv[i].name === todoItem.item.textContent.substring(0, todoItem.item.textContent.length - 13)){
              massiv.splice(i, 1);
            }
          }
          localStorage.setItem(key, JSON.stringify(massiv));
          /*localStorage.removeItem(key);*/
        }
      });

      if (todoItem.item.classList.contains('list-group-item-success')){
        massiv.push({ name: todoItemForm.input.value, done: true});
      } else {
        massiv.push({ name: todoItemForm.input.value, done: false});
      }
      localStorage.setItem(key, JSON.stringify(massiv));

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;

})();


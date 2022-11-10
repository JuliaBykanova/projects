(function () {

  const DELAY_TIME = 300;
  const VISIBLE_CSS = 'visible';
  const URI = 'http://localhost:3000/api/clients';


  const clientsState = {
    columnOfSort: 'id',
    stateOfSort: {
      id: true,
      fullname: false,
      createdAt: false,
      updatedAt: false,
    },
    clients: [],
  };


  const contactsTypes = ['Телефон', 'Facebook', 'VK', 'Email', 'Другое'];


  const modalWindowStructure = {
    type: 'new',

    headTitle: function () {
      let title = null;
      switch (this.type) {
        case 'delete':
          title = 'Удалить клиента';
          break;
        case 'new':
          title = 'Новый клиент';
          break;
        case 'change':
          title = 'Изменить данные';
          break;
      }
      return title;
    },

    buttonSubmit: function () {
      return (this.type === 'delete') ? 'Удалить' : 'Сохранить';
    },

    button: function () {
      return (this.type === 'change') ? 'Удалить клиента' : 'Отмена';
    },
  };

  //  Отрисовка таблицы
  // Header
  function createHeader() {
    const header = document.createElement('header');
    const logo = document.createElement('a');
    const logoImage = document.createElement('img');
    const form = document.createElement('form');
    const formInput = document.createElement('input');

    header.classList.add('header', 'header-container');
    logo.classList.add('header__logo');
    form.classList.add('header-search-form');
    formInput.classList.add('input', 'header-search-form__input');

    logoImage.setAttribute('src', './img/logo.svg');
    logoImage.setAttribute('alt', 'Логотип');
    form.setAttribute('action', '#');
    formInput.setAttribute('type', 'text');
    formInput.setAttribute('placeholder', 'Введите запрос');

    logo.append(logoImage);
    form.append(formInput);
    header.append(logo);
    header.append(form);

    return {
      header,
      form,
      input: formInput,
    };
  };

  // Main и шапкa таблицы
  function createTableHead() {
    const main = document.createElement('main');
    const title = document.createElement('h1');
    const tableBox = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headTr = document.createElement('tr');
    const headThId = document.createElement('th');
    const headThIdTitle = document.createElement('span');
    const headThIdImg = document.createElement('span');
    const headThFullname = document.createElement('th');
    const headThFullnameTitle = document.createElement('span');
    const headThFullnameImg = document.createElement('span');
    const headThFullnameDescr = document.createElement('span');
    const headThCreatedate = document.createElement('th');
    const headThCreatedateTitle = document.createElement('span');
    const headThCreatedateImg = document.createElement('span');
    const headThUpdatedate = document.createElement('th');
    const headThUpdatedateTitle = document.createElement('span');
    const headThUpdatedateImg = document.createElement('span');
    const headThContacts = document.createElement('th');
    const headThActions = document.createElement('th');

    main.classList.add('main', 'container');
    title.classList.add('main__title');
    tableBox.classList.add('main-table-box');
    table.classList.add('table', 'main-table');
    thead.classList.add('main-table-head');
    headTr.classList.add('main-table-head__row');
    headThId.classList.add('main-table-head__cell', 'main-table-head__cell-id', 'main-table-head__column-sort');
    headThIdTitle.classList.add('main-table-head__cell-title', 'main-table-head__cell-id-title');
    headThIdImg.classList.add('main-table-head__cell-icon');
    headThFullname.classList.add('main-table-head__cell', 'main-table-head__cell-fullname', 'main-table-head__column-sort');
    headThFullnameTitle.classList.add('main-table-head__cell-title', 'main-table-head__cell-fullname-title');
    headThFullnameImg.classList.add('main-table-head__cell-icon', 'rotate-180');
    headThFullnameDescr.classList.add('main-table-head__cell-descr');
    headThCreatedate.classList.add('main-table-head__cell', 'main-table-head__cell-createdate', 'main-table-head__column-sort');
    headThCreatedateTitle.classList.add('main-table-head__cell-title', 'main-table-head__cell-createdate-title');
    headThCreatedateImg.classList.add('main-table-head__cell-icon', 'rotate-180');
    headThUpdatedate.classList.add('main-table-head__cell', 'main-table-head__cell-updatedate', 'main-table-head__column-sort');
    headThUpdatedateTitle.classList.add('main-table-head__cell-title', 'main-table-head__cell-updatedate-title');
    headThUpdatedateImg.classList.add('main-table-head__cell-icon', 'rotate-180');
    headThContacts.classList.add('main-table-head__cell');
    headThActions.classList.add('main-table-head__cell', 'main-table-head__cell-actions');

    title.innerText = 'Клиенты';
    headThId.setAttribute('id', 'id');
    headThIdTitle.innerText = 'ID';
    headThFullname.setAttribute('id', 'fullname');
    headThFullnameTitle.innerText = 'Фамилия Имя Отчество';
    headThFullnameDescr.innerText = 'А-Я';
    headThCreatedate.setAttribute('id', 'createdAt');
    headThCreatedateTitle.innerText = 'Дата и время создания';
    headThUpdatedate.setAttribute('id', 'updatedAt');
    headThUpdatedateTitle.innerText = 'Последние изменения';
    headThContacts.setAttribute('id', 'contacts');
    headThContacts.innerText = 'Контакты';
    headThActions.setAttribute('id', 'actions');
    headThActions.innerText = 'Действия';

    headThId.append(headThIdTitle);
    headThId.append(headThIdImg);
    headThFullname.append(headThFullnameTitle);
    headThFullname.append(headThFullnameImg);
    headThFullname.append(headThFullnameDescr);
    headThCreatedate.append(headThCreatedateTitle);
    headThCreatedate.append(headThCreatedateImg);
    headThUpdatedate.append(headThUpdatedateTitle);
    headThUpdatedate.append(headThUpdatedateImg);

    headTr.append(headThId);
    headTr.append(headThFullname);
    headTr.append(headThCreatedate);
    headTr.append(headThCreatedate);
    headTr.append(headThUpdatedate);
    headTr.append(headThContacts);
    headTr.append(headThActions);

    thead.append(headTr);
    table.append(thead);
    tableBox.append(table);

    main.append(title);
    main.append(tableBox);

    return {
      main,
      tableBox,
      tr: headTr,
    };
  };

  // Kонтейнер тела таблицы и оверлей
  function createTableBody() {
    const tableBody = document.createElement('div');
    const overlay = document.createElement('div');
    const overlayRing = document.createElement('div');
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    tableBody.classList.add('main-table-body');
    overlay.classList.add('main-table-body__overlay', 'blocked');
    overlayRing.classList.add('table-body__overlay-ring');
    table.classList.add('table');

    overlay.append(overlayRing);
    table.append(tbody);
    tableBody.append(overlay);
    tableBody.append(table);

    return {
      tableBody,
      overlay,
    }
  }

  // Kнопкa добавления клинета
  function createAddClientButton() {
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('span');

    buttonWrapper.classList.add('main-add-client');
    button.classList.add('main-add-client__btn', 'btn');
    icon.classList.add('main-add-client__btn-icon');
    text.innerText = 'Добавить клиента';

    button.append(icon);
    button.append(text);
    buttonWrapper.append(button);

    return {
      wrapper: buttonWrapper,
      button,
    };
  };

  // Вставляем данные в таблицу
  function insertClientsData({ columnOfSort, stateOfSort, clients }) {
    const tbodyElement = document.querySelector('tbody');
    const { id: typeSortingById, fullname: typeSortingByFullname, createdAt: typeSortingByCreatedAt, updatedAt: typeSortingByUpdatedAt } = stateOfSort;

    let sortedClients = [];

    switch (columnOfSort) {
      case 'fullname':
        sortedClients = sortClientsByFullname(clients, typeSortingByFullname);
        break;
      case 'createdAt':
        sortedClients = sortClientsByDate(clients, columnOfSort, typeSortingByCreatedAt);
        break;
      case 'updatedAt':
        sortedClients = sortClientsByDate(clients, columnOfSort, typeSortingByUpdatedAt);
        break;
      default:
        sortedClients = sortClientsById(clients, typeSortingById);
    };

    tbodyElement.innerHTML = '';

    markColumnOfSort(columnOfSort, stateOfSort);

    sortedClients.forEach(function (client) {
      tbodyElement.append(createRowWithClientData(client));
    });

    showAllContacts(tbodyElement);

    const deleteClientButtons = tbodyElement.querySelectorAll('.main-table-body__cell-delete-btn');
    deleteClientButtons.forEach(function (deleteClientbutton) {
      deleteClientbutton.addEventListener('click', async function () {
        const clientId = this.dataset.id;

        modalWindowStructure.type = 'delete';

        const client = await fetchGetClientById(clientId);

        createModalWindow(client, modalWindowStructure);
      });
    });


    const changeClientButtons = tbodyElement.querySelectorAll('.main-table-body__cell-edit-btn');
    changeClientButtons.forEach(function (changeClientButton) {
      changeClientButton.addEventListener('click', async function () {
        const clientId = this.dataset.id;
        const iconElement = changeClientButton.querySelector('.main-table-body__cell-edit-btn-icon');

        modalWindowStructure.type = 'change';
        iconElement.classList.add('load__icon');

        const client = await fetchGetClientById(clientId);
        iconElement.classList.remove('load__icon');

        createModalWindow(client, modalWindowStructure);
        document.location.hash = 'id_' + clientId;

      });
    });
  };

  // Cтрокa в таблице с данными клиента
  function createRowWithClientData(client) {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdFullname = document.createElement('td');
    const tdCreateDate = document.createElement('td');
    const wrapCreateDate = document.createElement('div');
    const createDate = document.createElement('span');
    const createTime = document.createElement('span');
    const tdUpdateDate = document.createElement('td');
    const wrapUpdateDate = document.createElement('div');
    const updateDate = document.createElement('span');
    const updateTime = document.createElement('span');
    const tdContacts = document.createElement('td');
    const ulContacts = createContactList(client.contacts);
    const tdActions = document.createElement('td');
    const wrapActions = document.createElement('div');
    const buttonEdit = document.createElement('button');
    const buttonEditImg = document.createElement('span');
    const buttonEditText = document.createElement('span');
    const buttonDelete = document.createElement('button');
    const buttonDeleteImg = document.createElement('span');
    const buttonDeleteText = document.createElement('span');

    tr.classList.add('main-table-body__row');
    tdId.classList.add('main-table-body__cell', 'main-table-body__cell-id');
    tdFullname.classList.add('main-table-body__cell', 'main-table-body__cell-fullname');
    tdCreateDate.classList.add('main-table-body__cell');
    wrapCreateDate.classList.add('main-table-body__cell-wrapper');
    createDate.classList.add('main-table-body__cell-date');
    createTime.classList.add('main-table-body__cell-time');
    tdUpdateDate.classList.add('main-table-body__cell');
    wrapUpdateDate.classList.add('main-table-body__cell-wrapper');
    updateDate.classList.add('main-table-body__cell-date');
    updateTime.classList.add('main-table-body__cell-time');
    tdContacts.classList.add('main-table-body__cell');
    tdActions.classList.add('main-table-body__cell');
    wrapActions.classList.add('main-table-body__cell-wrapper');
    buttonEdit.classList.add('main-table-body__cell-btn', 'main-table-body__cell-edit-btn', 'btn');
    buttonEditImg.classList.add('main-table-body__cell-btn-icon', 'main-table-body__cell-edit-btn-icon');
    buttonEditText.classList.add('main-table-body__cell-btn-text');
    buttonDelete.classList.add('main-table-body__cell-btn', 'main-table-body__cell-delete-btn', 'btn');
    buttonDeleteImg.classList.add('main-table-body__cell-btn-icon', 'main-table-body__cell-delete-btn-icon');
    buttonDeleteText.classList.add('main-table-body__cell-btn-text');

    tr.setAttribute('id', client.id);
    buttonEdit.setAttribute('data-id', client.id);
    buttonDelete.setAttribute('data-id', client.id);

    tdId.innerText = client.id.slice(-6);
    tdFullname.innerText = `${client.surname.trim()} ${client.name.trim()} ${client.lastName.trim()}`;
    createDate.innerText = formatDate(client.createdAt);
    createTime.innerText = formatTime(client.createdAt);
    updateDate.innerText = formatDate(client.updatedAt);
    updateTime.innerText = formatTime(client.updatedAt);
    buttonEditText.innerText = 'Изменить';
    buttonDeleteText.innerText = 'Удалить';

    wrapCreateDate.append(createDate);
    wrapCreateDate.append(createTime);
    tdCreateDate.append(wrapCreateDate);

    wrapUpdateDate.append(updateDate);
    wrapUpdateDate.append(updateTime);
    tdUpdateDate.append(wrapUpdateDate);
    tdContacts.append(ulContacts);
    buttonEdit.append(buttonEditImg);
    buttonEdit.append(buttonEditText);
    buttonDelete.append(buttonDeleteImg);
    buttonDelete.append(buttonDeleteText);
    wrapActions.append(buttonEdit);
    wrapActions.append(buttonDelete);
    tdActions.append(wrapActions);

    tr.append(tdId);
    tr.append(tdFullname);
    tr.append(tdCreateDate);
    tr.append(tdUpdateDate);
    tr.append(tdContacts);
    tr.append(tdActions);

    return tr;
  }

  // Дата из json
  function formatDate(str) {
    return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
  }

  // Время из json
  function formatTime(str) {
    return str.slice(11, 16);
  }

  // Список контактов клиента
  function createContactList(contacts) {
    const ul = document.createElement('ul');
    ul.classList.add('main-table-body-contacts-list');
    const amountOfContacts = contacts.length;
    let visible = true;

    contacts.forEach(function (contact, index) {
      if (index === 4 && amountOfContacts > 5) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('main-table-body-contacts-list__item');
        span.classList.add('main-table-body-contacts-list__item-comb-icon');
        li.setAttribute('id', 'comb');
        span.setAttribute('data-value', 'Развернуть');
        span.innerText = '+' + (amountOfContacts - index);
        li.append(span);
        ul.append(li);
        visible = false;
      }

      ul.append(createContactItem(contact, visible));
    });

    return ul;
  };

  // li элемент для иконок списка контактов
  function createContactItem(contact, visible) {
    const li = document.createElement('li');
    const img = document.createElement('img');

    li.classList.add('main-table-body-contacts-list__item');
    if (!visible) {
      li.classList.add('blocked');
    };
    img.classList.add('main-table-body-contacts-list__item-icon');

    if (contact.type === 'Другое') {
      img.setAttribute('data-type', '');
    } else {
      img.setAttribute('data-type', contact.type + ':');
    };
    img.setAttribute('data-value', contact.value);


    switch (contact.type) {
      case 'Телефон':
        img.setAttribute('src', './img/phone.svg');
        img.setAttribute('alt', 'Телефон');
        break;
      case 'Facebook':
        img.setAttribute('src', './img/fb.svg');
        img.setAttribute('alt', 'Фэйсбук');
        break;
      case 'VK':
        img.setAttribute('src', './img/vk.svg');
        img.setAttribute('alt', 'В контактах');
        break;
      case 'Email':
        img.setAttribute('src', './img/mail.svg');
        img.setAttribute('alt', 'Имэйл');
        break;
      default:
        img.setAttribute('src', './img/other.svg');
        img.setAttribute('alt', 'Другое');
    };

    li.append(img);

    return li;
  };

  // Сортировка данных в таблице
  function sortDataInTable(clientsState, tableHeadElement) {
    const thElements = tableHeadElement.querySelectorAll('.main-table-head__column-sort');
    thElements.forEach(function (thElement) {
      thElement.addEventListener('click', function () {
        clientsState.columnOfSort = thElement.id;
        if (clientsState.stateOfSort[thElement.id]) {
          clientsState.stateOfSort[thElement.id] = false;
        } else {
          clientsState.stateOfSort[thElement.id] = true;
        };
        insertClientsData(clientsState);
      });
    });
  };

  // Сорировка списка клиентов по полю ID
  function sortClientsById(clients, ascending) {
    if (ascending) {
      return clients.sort(function (a, b) {
        return a.id > b.id ? 1 : -1;
      });
    };
    return clients.sort(function (a, b) {
      return a.id < b.id ? 1 : -1;
    });
  };

  // Сортировка списка клиентов по полю Ф.И.О.
  function sortClientsByFullname(clients, ascending) {
    if (ascending) {
      return clients.sort(function (a, b) {
        return a.surname.trim().toLowerCase() + a.name.trim().toLowerCase() + a.lastName.trim().toLowerCase() < b.surname.trim().toLowerCase() + b.name.trim().toLowerCase() + b.lastName.trim().toLowerCase() ? 1 : -1;
      });
    };
    return clients.sort(function (a, b) {
      return a.surname.trim().toLowerCase() + a.name.trim().toLowerCase() + a.lastName.trim().toLowerCase() > b.surname.trim().toLowerCase() + b.name.trim().toLowerCase() + b.lastName.trim().toLowerCase() ? 1 : -1;
    });
  };

  // Сортировка списка клиентов по полю дата и время создания
  function sortClientsByDate(clients, field, ascending) {
    if (ascending) {
      return clients.sort(function (a, b) {
        return new Date(a[field]).getTime() > new Date(b[field]).getTime() ? 1 : -1;
      });
    };
    return clients.sort(function (a, b) {
      return new Date(a[field]).getTime() < new Date(b[field]).getTime() ? 1 : -1;
    });
  };

  // Маркировка столбца сортировки
  function markColumnOfSort(columnOfSort, stateOfSort) {
    const columns = document.querySelectorAll('.main-table-head__column-sort');
    columns.forEach(function (column) {
      if (column.id === columnOfSort) {
        column.childNodes[0].classList.add('color_light-slate-blue');
      } else {
        column.childNodes[0].classList.remove('color_light-slate-blue')
      };
      if (stateOfSort[column.id]) {
        column.childNodes[1].classList.remove('rotate-180');
        if (column.id === 'fullname') {
          column.childNodes[2].innerText = 'Я-А';
        };
      } else {
        column.childNodes[1].classList.add('rotate-180');
        if (column.id === 'fullname') {
          column.childNodes[2].innerText = 'А-Я';
        };
      };
    });
  };

  // Тултипы
  function showTooltips() {
    let tooltipElememt;
    let tooltipTypeElement;
    let tooltipValueElement;
    document.addEventListener('mouseover', function (event) {
      let target = event.target;
      let tooltipType = target.dataset.type;
      let tooltipValue = target.dataset.value;

      if (!tooltipType && !tooltipValue) return;

      tooltipElememt = document.createElement('div');
      tooltipValueElement = document.createElement('span');

      tooltipElememt.classList.add('tooltip');
      tooltipValueElement.classList.add('tooltip__value');

      if (tooltipType) {
        tooltipTypeElement = document.createElement('span');
        tooltipTypeElement.classList.add('tooltip__title');
        tooltipTypeElement.innerText = tooltipType;
        tooltipElememt.append(tooltipTypeElement);
        tooltipValueElement.classList.add('color_light-slate-blue');
      };

      tooltipValueElement.innerText = tooltipValue;

      tooltipElememt.append(tooltipValueElement);
      document.body.append(tooltipElememt);

      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElememt.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElememt.offsetHeight - 10;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 10;
      };

      tooltipElememt.style.left = left + 'px';
      tooltipElememt.style.top = top + 'px';
      tooltipElememt.style.opacity = 1;
    });

    document.addEventListener('mouseout', function () {
      if (tooltipElememt) {
        tooltipElememt.remove();
        tooltipElememt = null;
      };
    });
  };

  // Все контакты клинета по нажатию
  function showAllContacts(tbodyElement) {
    const combElements = tbodyElement.querySelectorAll('#comb');
    combElements.forEach(function (combElement) {
      combElement.addEventListener('click', function () {
        const contactsElements = combElement.parentNode.querySelectorAll('.main-table-body-contacts-list__item');
        contactsElements.forEach(function (contactsElement) {
          if (contactsElement.id) {
            contactsElement.classList.add('blocked');
          } else {
            contactsElement.classList.remove('blocked');
          };
        });
      });
    });
  };


  // Модальное окно
  function createModalWindow(client, modalWindowStructure) {
    const { id, surname, name, lastName, contacts } = client;
    const { type: typeOfModal, buttonSubmit: buttonSubmitText, button: buttonSmallText } = modalWindowStructure;

    const modal = document.createElement('div');
    const wrapper = document.createElement('div');
    const buttonWindowClose = document.createElement('span');

    modal.classList.add('modal');
    wrapper.classList.add('modal-wrapper');
    buttonWindowClose.classList.add('modal__close-sign');
    buttonWindowClose.setAttribute('data-btn', 'close');

    wrapper.append(buttonWindowClose);


    let idValue = null;
    if (typeOfModal === 'change') {
      idValue = id;
    };

    const headerElement = createHeadOfModal(modalWindowStructure.headTitle(), idValue);
    wrapper.append(headerElement.header);

    const formElement = document.createElement('form');
    formElement.classList.add('modal-form');
    formElement.setAttribute('action', '#');


    const blockError = createErrorForModal();


    if (typeOfModal !== 'delete') {

      const clietntNameElement = createClientNameForModal(surname, name, lastName);
      formElement.append(clietntNameElement);

      const { fieldsetContacts, buttonAddContactElement, wrapperContacts } = createClientContactsForModal(contacts);
      formElement.append(fieldsetContacts);
      wrapper.append(formElement);

      disabledButtonAddContact(buttonAddContactElement, fieldsetContacts);

      addNewContact(buttonAddContactElement, wrapperContacts);

      deleteContact(buttonAddContactElement, wrapperContacts);


      checkValueInInputs(wrapperContacts);


      wrapper.append(blockError.wrapperError);

    } else {

      wrapper.append(blockError.wrapperError);

      blockError.wrapperError.classList.remove('blocked');
      blockError.spanError.textContent = 'Вы действительно хотите удалить данного клиента?';
      blockError.spanError.classList.add('modal-error__text-style');

      headerElement.header.classList.add('delete-modal-header');
      headerElement.headerTitle.classList.add('modal-header__heading-padding-top');
    };

    const buttonsElement = createButtonsForModal(modalWindowStructure.buttonSubmit(), modalWindowStructure.button());
    wrapper.append(buttonsElement.wrapperButtons);

    modal.append(wrapper);
    document.body.append(modal);


    document.addEventListener('keydown', function (event) {
      if (event.code == "Escape") {
        onClose(modal, wrapper);
      };
    });


    buttonWindowClose.addEventListener('click', function () {
      onClose(modal);
    });


    modal.addEventListener('click', function (event) {
      if (!event.target.classList.contains('modal')) {
        return;
      }
      onClose(modal);
    });


    buttonsElement.buttonSubmit.addEventListener('click', async function () {

      if (typeOfModal == 'delete') {
        onDelete(id, modal);
      } else {
        const clientValues = getValuesFromModal(modal);

        if (!clientValues.textError) {
          const iconButtonSubmit = buttonsElement.buttonSubmit.querySelector('.modal-btns__submit-btn-icon');
          iconButtonSubmit.classList.add('upload_visible');
          setDisabledOnElementsOfForm(modal, true);
          if (typeOfModal == 'new') {
            await onSave(clientValues, modal);
          } else if (typeOfModal == 'change') {
            await onUpdate(clientValues, idValue, modal);
          };

          iconButtonSubmit.classList.remove('upload_visible');

          setDisabledOnElementsOfForm(modal, false);
        } else {
          blockError.wrapperError.classList.remove('blocked');
          blockError.spanError.innerHTML = clientValues.textError;
        }
      };
    });


    buttonsElement.buttonSmall.addEventListener('click', function () {
      if (typeOfModal !== 'change') {
        onClose(modal);
      } else {
        onDelete(id, modal);
      };
    });


    showDropDown(modal);

    const timeoutId = setTimeout(function () {
      modal.classList.add(VISIBLE_CSS);
      wrapper.classList.add(VISIBLE_CSS);
    }, 100);

    return modal;
  };

  // Добавления паддингов
  function setPaddingToContacrsWrap() {
    const contactsWrap = document.querySelector('.modal-form-contacts');
    if (contactsWrap) {
      const contactsElements = contactsWrap.querySelectorAll('.modal-form-contacts-list__item');
      if (!contactsElements.length) {
        contactsWrap.classList.remove('modal-form-contacts-padding');
      } else {
        contactsWrap.classList.add('modal-form-contacts-padding');
      };
    };
  };


  // Шапка модального окна
  function createHeadOfModal(title, idValue) {
    const header = document.createElement('div');
    const headerTitle = document.createElement('h2');

    header.classList.add('modal-header', 'modal-container');
    headerTitle.classList.add('modal-header__title');

    headerTitle.textContent = title;

    header.append(headerTitle);

    if (idValue) {
      const headerInfo = document.createElement('span');
      headerInfo.classList.add('modal-header__id');
      headerInfo.innerText = `ID: ${idValue.slice(-6)}`;
      header.append(headerInfo);
    }

    return {
      header,
      headerTitle,
    };
  };

  // Часть формы с ФИО клиента
  function createClientNameForModal(surname, name, lastName) {
    const fieldsetClientName = document.createElement('fieldset');
    const wrapperClientName = document.createElement('div');
    const wrapperSurname = document.createElement('div');
    const inputSurname = document.createElement('input');
    const lableSurname = document.createElement('lable');
    const asterixSurname = document.createElement('span');
    const wrapperName = document.createElement('div');
    const inputName = document.createElement('input');
    const lableName = document.createElement('lable');
    const asterixName = document.createElement('span');
    const wrapperLastname = document.createElement('div');
    const inputLastname = document.createElement('input');
    const lableLastname = document.createElement('lable');

    fieldsetClientName.classList.add('fieldset-reset', 'modal-form-fullname');
    wrapperClientName.classList.add('modal-container', 'modal-form-fullname-contaiter');

    wrapperSurname.classList.add('modal-form-fullname-input-wrap');
    inputSurname.classList.add('input', 'modal-form-fullname-input-wrap__intup');
    lableSurname.classList.add('modal-form-fullname-input-wrap__lable');
    asterixSurname.classList.add('modal-form-fullname-input-wrap__lable-asterix');
    wrapperName.classList.add('modal-form-fullname-input-wrap');
    inputName.classList.add('input', 'modal-form-fullname-input-wrap__intup');
    lableName.classList.add('modal-form-fullname-input-wrap__lable');
    asterixName.classList.add('modal-form-fullname-input-wrap__lable-asterix');
    wrapperLastname.classList.add('modal-form-fullname-input-wrap');
    inputLastname.classList.add('input', 'modal-form-fullname-input-wrap__intup');
    lableLastname.classList.add('modal-form-fullname-input-wrap__lable');

    inputSurname.setAttribute('id', 'surname');
    inputSurname.setAttribute('data-input', 'surname');
    inputSurname.setAttribute('type', 'text');
    inputSurname.setAttribute('name', 'surname');
    lableSurname.setAttribute('for', 'surname');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('data-input', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('name', 'name');
    lableName.setAttribute('for', 'name');
    inputLastname.setAttribute('id', 'lastname');
    inputLastname.setAttribute('data-input', 'lastname');
    inputLastname.setAttribute('type', 'text');
    inputLastname.setAttribute('name', 'lastname');
    lableLastname.setAttribute('for', 'lastname');

    lableSurname.textContent = 'Фамилия';
    asterixSurname.textContent = '*';
    lableName.textContent = 'Имя';
    asterixName.textContent = '*';
    lableLastname.textContent = 'Отчество';

    if (surname) {
      lableSurname.classList.add('modal-form-fullname-input-wrap__lable-up');
      inputSurname.value = surname;
    };

    if (name) {
      lableName.classList.add('modal-form-fullname-input-wrap__lable-up');
      inputName.value = name;
    };

    if (lastName) {
      lableLastname.classList.add('modal-form-fullname-input-wrap__lable-up');
      inputLastname.value = lastName;
    };

    lableSurname.append(asterixSurname);
    lableName.append(asterixName);

    wrapperSurname.append(lableSurname);
    wrapperSurname.append(inputSurname);
    wrapperName.append(lableName);
    wrapperName.append(inputName);
    wrapperLastname.append(lableLastname);
    wrapperLastname.append(inputLastname);

    wrapperClientName.append(wrapperSurname);
    wrapperClientName.append(wrapperName);
    wrapperClientName.append(wrapperLastname);

    fieldsetClientName.append(wrapperClientName);

    inputSurname.addEventListener('input', function () {
      inputSurname.parentNode.classList.remove('border-color_burnt-sienna');
    });

    inputName.addEventListener('input', function () {
      inputName.parentNode.classList.remove('border-color_burnt-sienna');
    });


    showInpunsUnderLables(wrapperClientName);

    return fieldsetClientName;
  }

  // Подъём label
  function showInpunsUnderLables(wrapperClientName) {
    const inputs = wrapperClientName.querySelectorAll('.modal-form-fullname-input-wrap');
    inputs.forEach(addListenersOnInput);
  };

  // Обработчики событий на инпут
  function addListenersOnInput(input) {
    const inputElement = input.querySelector('.modal-form-fullname-input-wrap__intup');
    const lableElement = input.querySelector('.modal-form-fullname-input-wrap__lable');
    inputElement.addEventListener('focus', function () {
      lableElement.classList.add('modal-form-fullname-input-wrap__lable-up');
    });
    inputElement.addEventListener('blur', function () {
      if (!inputElement.value) {
        lableElement.classList.remove('modal-form-fullname-input-wrap__lable-up');
      };
    });
  };

  // Часть формы с контактами клиента
  function createClientContactsForModal(contacts) {
    const fieldsetContacts = document.createElement('fieldset');
    const wrapperContacts = document.createElement('div');
    const listOfContacts = document.createElement('ul');

    fieldsetContacts.classList.add('modal-form-contacts', 'fieldset-reset');
    wrapperContacts.classList.add('modal-container');
    listOfContacts.classList.add('modal-form-contacts-list');

    wrapperContacts.append(listOfContacts);

    if (contacts) {
      contacts.forEach(function (contact) {
        const contactItem = createContactForModal(contact);
        listOfContacts.append(contactItem);
      });
    };

    setTimeout(setPaddingToContacrsWrap, 300);

    const buttonAddContactElement = createButtonAddContactForModal();
    fieldsetContacts.append(wrapperContacts);
    fieldsetContacts.append(buttonAddContactElement);

    return {
      fieldsetContacts,
      buttonAddContactElement,
      wrapperContacts,
    };
  };

  // Элемент списка контактов
  function createContactForModal(contact) {
    const contactItem = document.createElement('li');
    const wrapContactType = document.createElement('div');
    const buttonContactType = document.createElement('button');
    const listContactTypeDropdown = document.createElement('ul');
    const inputContactValue = document.createElement('input');
    const buttonContactDelete = document.createElement('button');
    const buttonContactDeleteIcon = document.createElement('span');

    contactItem.classList.add('modal-form-contacts-list__item');
    wrapContactType.classList.add('modal-form-contacts-list__item-type');
    buttonContactType.classList.add('modal-form-contacts-list__item-type-btn', 'btn');
    listContactTypeDropdown.classList.add('modal-form-contacts-list__item-type-list');
    inputContactValue.classList.add('input', 'modal-form-contacts-list__item-input');
    inputContactValue.setAttribute('type', 'text');
    inputContactValue.setAttribute('placeholder', 'Введите данные контакта');
    buttonContactDelete.classList.add('modal-form-contacts-list__item-btn', 'btn', 'blocked');
    buttonContactDeleteIcon.classList.add('modal-form-contacts-list__item-btn-icon');

    buttonContactType.textContent = 'Тип контакта';

    contactsTypes.forEach(function (contactsType) {
      const item = document.createElement('li');
      item.classList.add('modal-form-contacts-list__item-type-item');
      item.textContent = contactsType;
      listContactTypeDropdown.append(item);
    })

    if (contact) {
      buttonContactType.textContent = contact.type;
      inputContactValue.value = contact.value;
      buttonContactDelete.classList.remove('blocked');
    };

    buttonContactDelete.append(buttonContactDeleteIcon);

    wrapContactType.append(buttonContactType);
    wrapContactType.append(listContactTypeDropdown);

    contactItem.append(wrapContactType);
    contactItem.append(inputContactValue);
    contactItem.append(buttonContactDelete);

    inputContactValue.addEventListener('input', function () {
      inputContactValue.classList.remove('border-color_burnt-sienna');
    });

    return contactItem;
  };

  // Кнопка добавления контакта
  function createButtonAddContactForModal() {
    const buttonAddContact = document.createElement('button');
    const buttonAddContactIcon = document.createElement('span');
    const buttonAddContactTitle = document.createElement('span');

    buttonAddContact.classList.add('modal-form-contacts__btn', 'btn', VISIBLE_CSS);
    buttonAddContactIcon.classList.add('modal-form-contacts__btn-icon');
    buttonAddContactTitle.classList.add('modal-form-contacts__btn-title');

    buttonAddContact.setAttribute('data-btn', 'contact-add');
    buttonAddContactTitle.textContent = 'Добавить контакт';

    buttonAddContact.append(buttonAddContactIcon);
    buttonAddContact.append(buttonAddContactTitle);

    return buttonAddContact;
  }

  // Блок с выводом ошибок
  function createErrorForModal() {
    const wrapperError = document.createElement('div');
    const spanError = document.createElement('span');

    wrapperError.classList.add('modal-error', 'blocked');
    spanError.classList.add('modal-error__text');

    wrapperError.classList.remove('blocked');

    wrapperError.append(spanError);

    return {
      wrapperError,
      spanError,
    };
  };

  // Блок кнопок модального окна
  function createButtonsForModal(submitTitle, smallTitle) {
    const wrapperButtons = document.createElement('div');
    const buttonSubmit = document.createElement('button');
    const buttonSubmitIcon = document.createElement('span');
    const buttonSubmitTitle = document.createElement('span');
    const buttonSmall = document.createElement('button');

    wrapperButtons.classList.add('modal-btns');
    buttonSubmit.classList.add('modal-btns__submit-btn', 'btn');
    buttonSubmitIcon.classList.add('modal-btns__submit-btn-icon');
    buttonSubmitTitle.classList.add('modal-btns__submit-btn-title');
    buttonSmall.classList.add('modal-btns__delete-btn', 'btn');

    buttonSubmit.setAttribute('data-btn', 'submit');
    buttonSmall.setAttribute('data-btn', 'small');


    buttonSubmitTitle.textContent = submitTitle;
    buttonSmall.textContent = smallTitle;

    buttonSubmit.append(buttonSubmitIcon);
    buttonSubmit.append(buttonSubmitTitle);
    wrapperButtons.append(buttonSubmit);
    wrapperButtons.append(buttonSmall);

    return {
      wrapperButtons,
      buttonSubmit,
      buttonSmall,
    };
  };

  // Деактивация кнопки Добавить контакт
  function disabledButtonAddContact(buttonAddContact, wrapper) {
    const items = wrapper.querySelectorAll('.modal-form-contacts-list__item');
    if (items.length >= 10) {
      buttonAddContact.classList.remove(VISIBLE_CSS);
    } else {
      buttonAddContact.classList.add(VISIBLE_CSS);
    };
  };

  //Дропдаун
  function showDropDown(modalElement) {
    const dropdowns = modalElement.querySelectorAll('.modal-form-contacts-list__item-type');

    dropdowns.forEach(function (dropdown) {
      setEventsOnDropdown(dropdown)
    });
  };

  // Слушатели к элементам дропдауна
  function setEventsOnDropdown(dropdown) {
    const buttonDropdown = dropdown.querySelector('.modal-form-contacts-list__item-type-btn');
    const listDropdown = dropdown.querySelector('.modal-form-contacts-list__item-type-list');
    const itemsDropdown = listDropdown.querySelectorAll('.modal-form-contacts-list__item-type-item');

    buttonDropdown.addEventListener('click', function (event) {
      event.preventDefault();
      listDropdown.classList.toggle('modal-form-contacts-list__item-type-list-visible');
      buttonDropdown.classList.toggle('modal-form-contacts-list__item-type-btn-rotate');
    });

    itemsDropdown.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.stopPropagation();
        buttonDropdown.classList.remove('border-color_burnt-sienna');
        buttonDropdown.textContent = this.innerText;
        buttonDropdown.focus();
        hidenDropdown(listDropdown, buttonDropdown);
      });
    });

    document.addEventListener('click', function (event) {
      if (event.target !== buttonDropdown) {
        hidenDropdown(listDropdown, buttonDropdown);
      };
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Tab' || event.key === 'Escape') {
        hidenDropdown(listDropdown, buttonDropdown);
      };
    });
  };

  // Удаление свойст показа списка дропдауна
  function hidenDropdown(listDropdown, buttonDropdown) {
    listDropdown.classList.remove('modal-form-contacts-list__item-type-list-visible');
    buttonDropdown.classList.remove('modal-form-contacts-list__item-type-btn-rotate');
  };

  // Добавление события ввода данных в инпуты контактов
  function checkValueInInputs(modalElement) {
    const contacts = modalElement.querySelectorAll('.modal-form-contacts-list__item');
    contacts.forEach(function (contact) {
      setEventsOnInput(contact);
    });
  };

  // Установка видимости кнопки "Удалить контакт"
  function setEventsOnInput(element) {
    const buttonDeleteContact = element.querySelector('.modal-form-contacts-list__item-btn');
    const inputContact = element.querySelector('.modal-form-contacts-list__item-input');

    element.addEventListener('input', function (event) {
      event.stopPropagation();
      if (inputContact.value) {
        buttonDeleteContact.classList.remove('blocked');
      } else {
        buttonDeleteContact.classList.add('blocked');
      };
    });
  };

  // Новый контакт клиенту
  function addNewContact(buttonAddContact, wrapperContacts) {
    const listContacts = wrapperContacts.querySelector('.modal-form-contacts-list');
    buttonAddContact.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const contactItem = createContactForModal('');
      listContacts.append(contactItem);


      setPaddingToContacrsWrap();

      setEventsOnDropdown(contactItem);

      setEventsOnInput(contactItem);

      setEventOnButtonDeleteContact(contactItem, buttonAddContact, wrapperContacts);

      disabledButtonAddContact(buttonAddContact, wrapperContacts);
    });
  };

  // Удаление контакт по кнопке
  function deleteContact(buttonAddContact, wrapperContacts) {
    const deleteButtons = wrapperContacts.querySelectorAll('.modal-form-contacts-list__item');

    deleteButtons.forEach(function (deleteButton) {
      setEventOnButtonDeleteContact(deleteButton, buttonAddContact, wrapperContacts);
    });
  };

  // Событие клик на кнопку удаления контакта
  function setEventOnButtonDeleteContact(element, buttonAddContact, wrapperContacts) {
    const deleteButton = element.querySelector('.modal-form-contacts-list__item-btn');
    deleteButton.addEventListener('click', function () {
      element.remove();
      disabledButtonAddContact(buttonAddContact, wrapperContacts);
      // // Стилизация блока контактов
      setPaddingToContacrsWrap();
    });
  };

  // Данные формы модального окна
  function getValuesFromModal(modal) {
    let textError = '';
    const surnameElement = modal.querySelector('#surname');
    const surname = surnameElement.value.trim();
    if (!surname) {
      surnameElement.parentNode.classList.add('border-color_burnt-sienna');
      textError = 'Введите фамилию клиента';
    };

    const nameElement = modal.querySelector('#name');
    const name = nameElement.value.trim();
    if (!name) {
      nameElement.parentNode.classList.add('border-color_burnt-sienna');
      if (textError) {
        textError = textError + '<br>';
      }
      textError = textError + 'Введите имя клиента';
    };

    const lastNameElement = modal.querySelector('#lastname');
    const lastName = lastNameElement.value.trim();

    const contacts = [];
    const contactsItems = modal.querySelectorAll('.modal-form-contacts-list__item');

    contactsItems.forEach(function (contactsItem) {
      const typeElement = contactsItem.querySelector('.modal-form-contacts-list__item-type-btn');
      const type = typeElement.innerText;
      if (type === 'Тип контакта') {
        typeElement.classList.add('border-color_burnt-sienna');
        if (textError) {
          textError = textError + '<br>';
        }
        textError = textError + 'Установите тип контакта';
      }

      const valueElement = contactsItem.querySelector('.modal-form-contacts-list__item-input');
      const value = valueElement.value.trim();
      if (!value) {
        valueElement.classList.add('border-color_burnt-sienna');
        if (textError) {
          textError = textError + '<br>';
        }
        textError = textError + 'Введите данные контакта';
      }

      const objContact = {
        type,
        value,
      };
      contacts.push(objContact);
    });

    return {
      name,
      surname,
      lastName,
      contacts,
      textError,
    };
  };

  // Установка/снятие disabled с полей формы
  function setDisabledOnElementsOfForm(modal, disabledElements) {
    const modalInputs = modal.querySelectorAll('.modal-form-fullname-input-wrap__intup');
    const contactsItems = modal.querySelectorAll('.modal-form-contacts-list__item');
    const buttonAddContact = modal.querySelector('.modal-form-contacts__btn');
    const buttonSubmit = modal.querySelector('.modal-btns__submit-btn');
    const buttonSmall = modal.querySelector('.modal-btns__delete-btn');

    if (disabledElements) {
      modalInputs.forEach(function (modalInput) {
        modalInput.disabled = true;
      });

      contactsItems.forEach(function (contactsItem) {
        const typeElement = contactsItem.querySelector('.modal-form-contacts-list__item-type-btn');
        const valueElement = contactsItem.querySelector('.modal-form-contacts-list__item-input');
        const buttonDeleteContact = contactsItem.querySelector('.modal-form-contacts-list__item-btn');

        typeElement.disabled = true;
        valueElement.disabled = true;
        buttonDeleteContact.disabled = true;
      });

      buttonAddContact.disabled = true;
      buttonSubmit.disabled = true;
      buttonSmall.disabled = true;

    } else {
      modalInputs.forEach(function (modalInput) {
        modalInput.disabled = false;
      });

      contactsItems.forEach(function (contactsItem) {
        const typeElement = contactsItem.querySelector('.modal-form-contacts-list__item-type-btn');
        const valueElement = contactsItem.querySelector('.modal-form-contacts-list__item-input');
        const buttonDeleteContact = contactsItem.querySelector('.modal-form-contacts-list__item-btn');

        typeElement.disabled = false;
        valueElement.disabled = false;
        buttonDeleteContact.disabled = false;
      });

      buttonAddContact.disabled = false;
      buttonSubmit.disabled = false;
      buttonSmall.disabled = false;
    };
  };

  // Закрытие модального окна
  function onClose(modal) {
    const wrapper = modal.querySelector('.modal-wrapper');
    modal.classList.remove(VISIBLE_CSS);
    wrapper.classList.remove(VISIBLE_CSS);
    const timeoutId = setTimeout(function () {
      modal.remove();
    }, DELAY_TIME);
    document.location.hash = '';
  };

  // Удаление клиента
  async function onDelete(clientId, modal) {

    const response = await fetchDeleteClient(clientId);
    httpErrorHandler(response, modal);
  };

  // Добавление нового клиента
  async function onSave(client, modal) {
    const response = await fetchAddClient(client);
    httpErrorHandler(response, modal);
  };

  // Обновление данных клиента
  async function onUpdate(сlient, clientId, modal) {
    const response = await fetchUpdateClient(сlient, clientId);
    httpErrorHandler(response, modal);
  };

  // Обработка HTTP ошибок
  async function httpErrorHandler(response, modal) {
    let info;
    const wrapperError = modal.querySelector('.modal-error');
    const spanError = wrapperError.querySelector('.modal-error__text');

    if (response.status === 200 || response.status === 201) {
      await updateClientsInTable();
      onClose(modal);
    } else {
      if (modalWindowStructure.type !== 'delete') {
        if (response.status === 500) {
          info = `Данные не сохранены. Ответ сервера - ${response.status}. Ошибка работы сервера.`;
        } else {
          switch (response.status) {
            case 404:
              info = 'Данные не сохранены. Ответ сервера - 404. Не удалось найти запрашиваемую страницую.';
              break;
            case 422:
              const errors = await response.json();
              errors.errors.forEach(function (error) {
                if (info) {
                  info = info + ' <br> ' + error.message;
                } else {
                  info = error.message;
                }
              });
              break;
            default:
              info = '"Что-то пошло не так..."';
              break;
          };
        };

        wrapperError.classList.remove('blocked');
        spanError.innerHTML = info;
      };
    };
  };


  // Задержка для тестов
  const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
  };

  // Чтение клиентов из базы
  async function fetchGetClients() {
    await delay(DELAY_TIME);
    const response = await fetch(URI);
    const data = await response.json();

    return data;
  };

  // Поиск клиентов
  async function fetchSearchClients(search) {
    await delay(DELAY_TIME);
    const url = `${URI}?search=${search}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  };

  // Добавление клиента в базу
  async function fetchAddClient(obj) {
    await delay(DELAY_TIME);
    const response = await fetch(URI, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    return response;
  };

  // Получение клиента по его ID
  async function fetchGetClientById(id) {
    await delay(DELAY_TIME);
    const response = await fetch(`${URI}/${id}`);
    const data = await response.json();

    return data;
  };

  // Обновление данных клиента по ID
  async function fetchUpdateClient(obj, id) {
    await delay(DELAY_TIME);
    const response = await fetch(`${URI}/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    return response;
  };

  // Удаление клиента по ID
  async function fetchDeleteClient(id) {
    const response = await fetch(`${URI}/${id}`, {
      method: "DELETE",
    });

    return response;
  };

  // Добавление клиентов из базы данных в таблицу
  async function updateClientsInTable() {

    const serchInput = document.querySelector('.header-search-form__input');
    serchInput.disabled = true;

    const tableBodyOverley = document.querySelector('.main-table-body__overlay');
    tableBodyOverley.classList.remove('blocked');

    clientsState.clients = await fetchGetClients();

    insertClientsData(clientsState);

    tableBodyOverley.classList.add('blocked');

    serchInput.disabled = false;
  };


  // Создание списка найденных клиентов
  function createListItems(clients, list, tableBody) {

    clients.forEach(function (client) {
      const listItem = document.createElement('li');
      listItem.classList.add('header-search-form-list__item');
      listItem.setAttribute('data-id', client.id);
      listItem.textContent = client.name + ' ' + client.surname;
      list.append(listItem);

      listItem.addEventListener('click', function () {
        showClientInTable(this.dataset.id, tableBody);
        clearListOfSearch(list);
      });
    });

    list.classList.remove('blocked');

    return list;
  };

  // Установка фокуса на элемент списка поиска клиентов
  function setFocusOnItem(focusedItem, itemElements) {
    if (focusedItem > itemElements.length - 1) {
      focusedItem = 0;
    };
    if (focusedItem < 0) {
      focusedItem = itemElements.length - 1
    };
    unfocusAllItems(itemElements);
    itemElements[focusedItem].classList.add('header-search-form-list__item-focused');

    return focusedItem;
  };

  // Снятие фокусировок с элементов списка поиска клиентов
  function unfocusAllItems(itemElements) {
    itemElements.forEach(function (itemElement) {
      itemElement.classList.remove('header-search-form-list__item-focused');
    });
  };

  // Поиск клиента в таблице по id
  function showClientInTable(clientId) {

    const trOfClient = document.getElementById(clientId);
    trOfClient.classList.add('outline_medium-slate-blue');

    trOfClient.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  };

  // Очистка списка поиска
  function clearListOfSearch(list) {
    list.classList.add('blocked');
    list.innerHTML = '';
  };

  // Основная функция
  document.addEventListener('DOMContentLoaded', function () {
    async function createApp() {
      const container = document.getElementById('crm');
      const header = createHeader();
      const tableHead = createTableHead();
      const tableBody = createTableBody();
      const addButton = createAddClientButton();

      container.append(header.header);
      container.append(tableHead.main);
      tableHead.tableBox.append(tableBody.tableBody);
      tableHead.main.append(addButton.wrapper);

      await updateClientsInTable();

      showTooltips();

      const listSearchedValues = document.createElement('ul');
      listSearchedValues.classList.add('header-search-form-list', 'blocked');
      header.form.append(listSearchedValues);

      let timeoutId = null;
      let listItemsElements = null;
      let focusedItem = -1;

      header.input.addEventListener('input', function () {
        const highlightedItems = tableBody.tableBody.querySelectorAll('.main-table-body__row');
        highlightedItems.forEach(function (highlightedItem) {
          highlightedItem.classList.remove('outline_medium-slate-blue');
        });

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { findContacts() }, DELAY_TIME);
      });

      async function findContacts() {
        const inputValue = header.input.value.trim();
        clearListOfSearch(listSearchedValues);

        if (inputValue) {
          const serchedClients = await fetchSearchClients(inputValue);
          if (serchedClients.length) {
            listItemsElements = createListItems(serchedClients, listSearchedValues, tableBody.tableBody).querySelectorAll('.header-search-form-list__item');
          } else {
            listItemsElements = null;
          };
        } else {
          listItemsElements = null;
        };
      };

      document.addEventListener('keydown', function (event) {
        if (listItemsElements) {
          switch (event.key) {
            case 'Enter':
              event.preventDefault();
              showClientInTable(listItemsElements[focusedItem].dataset.id);
              clearListOfSearch(listSearchedValues);
              break;
            case 'ArrowDown':
              focusedItem++;
              focusedItem = setFocusOnItem(focusedItem, listItemsElements);
              break;
            case 'ArrowUp':
              focusedItem--;
              focusedItem = setFocusOnItem(focusedItem, listItemsElements);
              break;
            case 'Escape':
              clearListOfSearch(listSearchedValues);
              break;
          };
        };
      });

      sortDataInTable(clientsState, tableHead.tr);

      addButton.button.addEventListener('click', function () {
        modalWindowStructure.type = 'new';
        createModalWindow('', modalWindowStructure);
      });

      if (document.location.hash) {
        const clientId = document.location.hash.split('_')[1];
        modalWindowStructure.type = 'change';
        const client = await fetchGetClientById(clientId);
        createModalWindow(client, modalWindowStructure);
      };
    };

    createApp();

  });
})();


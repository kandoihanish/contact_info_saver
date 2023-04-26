
const form = document.querySelector('form');
const inputFirstName = document.querySelector('#firstName');
const inputLastName = document.querySelector('#lastName');
const inputContactNumber = document.querySelector('#contactNumber');
const tableBody = document.querySelector('#tableBody');
const searchInput = document.querySelector('#search');
const nameHeader = document.querySelector('#nameHeader');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function updateTable(data) {
  tableBody.innerHTML = '';
  data.forEach(function(contact) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const nameText = document.createTextNode(`${contact.firstName} ${contact.lastName}`);
    nameCell.appendChild(nameText);
    const contactNumberCell = document.createElement('td');
    const contactNumberText = document.createTextNode(contact.contactNumber);
    contactNumberCell.appendChild(contactNumberText);
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      const index = contacts.indexOf(contact);
      if (confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
        contacts.splice(index, 1);
        updateTable(contacts);
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(contactNumberCell);
    row.appendChild(deleteButtonCell);
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const contactNumber = inputContactNumber.value;
  const existingContact = contacts.find(function(contact) {
    return contact.firstName === firstName && contact.lastName === lastName;
  });
  if (existingContact) {
    alert('Contact already exists.');
  } else {
    const newContact = {
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber
    };
    contacts.push(newContact);
    updateTable(contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    inputFirstName.value = '';
    inputLastName.value = '';
    inputContactNumber.value = '';
  }
});

searchInput.addEventListener('input', function() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredContacts = contacts.filter(function(contact) {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchValue);
  });
  updateTable(filteredContacts);
});

nameHeader.addEventListener('click', function() {
  contacts.sort(function(a, b) {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  updateTable(contacts);
});

// Display contacts on page load
updateTable(contacts);


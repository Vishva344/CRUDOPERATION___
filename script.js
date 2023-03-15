// Get table body and form elements
const tableBody = document.getElementById('table-body');
const form = document.getElementById('formData');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');

// Retrieve data from local storage or set empty array
let data = JSON.parse(localStorage.getItem('formData')) || [];

// Generate unique ID for form submission
let uniqueId = 1;

function generateUniqueId() {
  if (data.length > 0) {
    uniqueId = data[data.length - 1].id + 1;
  }
  return uniqueId;
}

// Render table rows from local storage data
function renderRows() {
  tableBody.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].age}</td><td>${data[i].city}</td><td>${data[i].state}</td><td><button onclick="editRow(${data[i].id})">Edit</button><button onclick="deleteRow(${data[i].id})">Delete</button></td>`;
    tableBody.appendChild(row);
  }
}

// Save form data to local storage
function saveData() {
  const idInput = document.getElementById('id');
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const cityInput = document.getElementById('city');
  const stateInput = document.getElementById('state');

  if (
    
    nameInput.value.trim() === '' ||
    ageInput.value.trim() === '' ||
    cityInput.value.trim() === '' ||
    stateInput.value.trim() === ''
  ) {
    alert('Please fill in all fields');
    return;
  }

  const id = generateUniqueId();
  const name = nameInput.value;
  const age = ageInput.value;
  
  const city = cityInput.value;
const state = stateInput.value;

// Create new data object and push to data array
const newData = { id, name, age, city, state };
data.push(newData);

// Save data to local storage
localStorage.setItem('formData', JSON.stringify(data));

// Reset form inputs
nameInput.value = '';
ageInput.value = '';
cityInput.value = '';
stateInput.value = '';

// Render table rows with updated data
renderRows();
}





// Edit form data in local storage
function editData(id) {
const formData = data.find(item => item.id === id);
const name = document.getElementById('name').value || formData.name;
const age = document.getElementById('age').value || formData.age;
const city = document.getElementById('city').value || formData.city;
const state = document.getElementById('state').value || formData.state;

const index = data.findIndex(item => item.id === id);
data[index] = { id, name, age, city, state };
localStorage.setItem('formData', JSON.stringify(data));

form.reset();
renderRows();
}

// Delete form data from local storage
function deleteData(id) {
const index = data.findIndex(item => item.id === id);
data.splice(index, 1);
localStorage.setItem('formData', JSON.stringify(data));

renderRows();
}

 // Edit form data in local storage
function editData(id) {
  const formData = data.find(item => item.id === id);
  const name = document.getElementById('name').value || formData.name;
  const age = document.getElementById('age').value || formData.age;
  const city = document.getElementById('city').value || formData.city;
  const state = document.getElementById('state').value || formData.state;
  
  
  const index = data.findIndex(item => item.id === id);
  data[index] = { id, name, age, city, state};
  localStorage.setItem('formData', JSON.stringify(data));
  
  form.reset();
  renderRows();
  }
  
  // Delete form data from local storage
  function deleteData(id) {
  const index = data.findIndex(item => item.id === id);
  data.splice(index, 1);
  localStorage.setItem('formData', JSON.stringify(data));
  
  renderRows();
  }
  
  // Edit form data when "Edit" button is clicked
  function editRow(id) {
  const formData = data.find(item => item.id === id);
  document.getElementById('id').value = formData.id;
  document.getElementById('name').value = formData.name;
  document.getElementById('age').value = formData.age;
  document.getElementById('city').value = formData.city;
  document.getElementById('state').value = formData.state;
  
  
  
  saveButton.removeEventListener('click', saveData);
  saveButton.addEventListener('click', () => editData(id));
  }
// Delete form data when "Delete" button is clicked
function deleteRow(id) {
deleteData(id);
}

// Clear local storage and table
function clearData() {
localStorage.clear();
data = [];
renderRows();
}

// Render initial table rows
renderRows();

// Add event listeners to buttons
saveButton.addEventListener('click', saveData);
clearButton.addEventListener('click', clearData);


  function searchTable() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("registration-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      tdID = tr[i].getElementsByTagName("td")[0];
      tdName = tr[i].getElementsByTagName("td")[1];
      tdAge = tr[i].getElementsByTagName("td")[2];
      tdCity = tr[i].getElementsByTagName("td")[3];
      tdState = tr[i].getElementsByTagName("td")[4];
      if (tdID || tdName || tdAge || tdCity || tdState) {
        txtValueID = tdID.textContent || tdID.innerText;
        txtValueName = tdName.textContent || tdName.innerText;
        txtValueAge = tdAge.textContent || tdAge.innerText;
        txtValueCity = tdCity.textContent || tdCity.innerText;
        txtValueState = tdState.textContent || tdState.innerText;
        if (
          txtValueID.indexOf(filter) > -1 ||
          txtValueName.toUpperCase().indexOf(filter) > -1 ||
            txtValueAge.indexOf(filter) > -1 ||
            txtValueCity.toUpperCase().indexOf(filter) > -1 ||
            txtValueState.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  //sorting
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("registration-table");
    switching = true;
    
    dir = "asc"; 
    
    while (switching) {
      
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        
        shouldSwitch = false;
        
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        
        if (dir == "asc") {
          if (isNaN(parseInt(x.innerHTML))) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else {
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
              shouldSwitch= true;
              break;
            }
          }
        } else if (dir == "desc") {
          if (isNaN(parseInt(x.innerHTML))) {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else {
            if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
              shouldSwitch= true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        
        switchcount ++;      
      } else {
        
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  
  

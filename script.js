// Initial inventory data
let inventory = [
    { id: 1, name: 'Laptop', quantity: 10, price: 999.99 },
    { id: 2, name: 'Smartphone', quantity: 20, price: 599.99 },
    { id: 3, name: 'Headphones', quantity: 50, price: 99.99 },
];

// Function to show different pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
    if (pageId === 'view') updateInventoryTable();
    if (pageId === 'edit') updateEditSelect();
    if (pageId === 'delete') updateDeleteList();
}

// Function to update the inventory table
function updateInventoryTable() {
    const table = document.getElementById('inventoryTable');
    table.innerHTML = '<tr><th>Name</th><th>Quantity</th><th>Price</th></tr>';
    inventory.forEach(item => {
        const row = table.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = '$' + item.price.toFixed(2);
    });
}

// Function to add a new item
function addItem(event) {
    event.preventDefault();
    const newItem = {
        id: Date.now(),
        name: document.getElementById('name').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };
    inventory.push(newItem);
    document.getElementById('addItemForm').reset();
    alert('Item added successfully!');
}

// Function to update the edit item select dropdown
function updateEditSelect() {
    const select = document.getElementById('editItemSelect');
    select.innerHTML = '<option value="">Select an item to edit</option>';
    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

// Function to handle edit item select change
function handleEditSelectChange() {
    const form = document.getElementById('editItemForm');
    const selectedId = this.value;
    if (selectedId) {
        const item = inventory.find(i => i.id == selectedId);
        document.getElementById('editName').value = item.name;
        document.getElementById('editQuantity').value = item.quantity;
        document.getElementById('editPrice').value = item.price;
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

// Function to edit an item
function editItem(event) {
    event.preventDefault();
    const id = document.getElementById('editItemSelect').value;
    const updatedItem = {
        id: parseInt(id),
        name: document.getElementById('editName').value,
        quantity: parseInt(document.getElementById('editQuantity').value),
        price: parseFloat(document.getElementById('editPrice').value)
    };
    inventory = inventory.map(item => item.id == id ? updatedItem : item);
    document.getElementById('editItemForm').reset();
    document.getElementById('editItemSelect').value = '';
    document.getElementById('editItemForm').style.display = 'none';
    alert('Item updated successfully!');
    updateEditSelect();
}

// Function to update the delete item list
function updateDeleteList() {
    const list = document.getElementById('deleteItemList');
    list.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)} `;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteItem(item.id);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Function to delete an item
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        inventory = inventory.filter(i => i.id !== id);
        updateDeleteList();
        alert('Item deleted successfully!');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation event listeners
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.target.getAttribute('href').substr(1));
        });
    });

    // Form submission event listeners
    document.getElementById('addItemForm').addEventListener('submit', addItem);
    document.getElementById('editItemForm').addEventListener('submit', editItem);

    // Edit select change event listener
    document.getElementById('editItemSelect').addEventListener('change', handleEditSelectChange);

    // Initialize the home page
    showPage('home');
});

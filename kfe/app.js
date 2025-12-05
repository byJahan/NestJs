const API = 'http://localhost:3000/items';
const $ = sel => document.querySelector(sel);
const tbody = $('#tbody');

// ---------- helpers ----------
const api = (url, method = 'GET', body = null) =>
  fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });

const row = item => `
  <tr data-id="${item.id}">
    <td>${item.id}</td>
    <td class="name">${item.name}</td>
    <td class="price">${item.price}</td>
    <td>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </td>
  </tr>`;

async function load() {
  const res = await api(API);
  const data = await res.json();
  tbody.innerHTML = data.map(row).join('');
}
load();

// ---------- POST ----------
$('#addForm').addEventListener('submit', async e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const newItem = { name: fd.get('name'), price: +fd.get('price') };
  await api(API, 'POST', JSON.stringify(newItem));
  e.target.reset();
  load();
});

// ---------- PUT & DELETE (delegated) ----------
tbody.addEventListener('click', async e => {
  const tr = e.target.closest('tr');
  const id = tr.dataset.id;

  if (e.target.classList.contains('delete')) {
    await api(`${API}/${id}`, 'DELETE');
    load();
    return;
  }

  if (e.target.classList.contains('edit')) {
    const name = prompt('New name:', tr.querySelector('.name').textContent);
    const price = prompt('New price:', tr.querySelector('.price').textContent);
    if (name === null || price === null) return; // cancelled
    await api(`${API}/${id}`, 'PUT', JSON.stringify({ name, price: +price }));
    load();
  }
});
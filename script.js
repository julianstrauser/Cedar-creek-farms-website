const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const money = value => value || 'Call for pricing';

const storageKey = 'cedarCreekInquiry';

function getInquiry() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
  catch { return []; }
}

function setInquiry(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
  updateInquiryUI();
}

function addInquiry(tree) {
  const items = getInquiry();
  if (!items.some(item => item.id === tree.id)) items.push(tree);
  setInquiry(items);
}

function clearInquiry() { setInquiry([]); }

function updateInquiryUI() {
  const items = getInquiry();
  const countText = items.length === 1 ? '1 tree selected' : `${items.length} trees selected`;
  $$('[data-inquiry-count]').forEach(el => el.textContent = countText);
  const contactBox = $('[data-contact-inquiry]');
  const hidden = $('[data-selected-trees-field]');
  if (hidden) hidden.value = items.map(item => `${item.name} - ${item.size}`).join('\n');
  if (contactBox) {
    contactBox.innerHTML = items.length
      ? `<div class="selected-tree-list">${items.map(item => `<div class="selected-tree"><strong>${item.name}</strong><span>${item.size} • ${item.quantity} available</span></div>`).join('')}</div>`
      : '<p class="muted">No trees selected yet. Add trees from the availability page.</p>';
  }
}

async function getJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function setupMenu() {
  const button = $('[data-menu-button]');
  const nav = $('[data-nav]');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
}

function treeCard(tree, compact = false) {
  const card = document.createElement('article');
  card.className = 'tree-card';
  card.innerHTML = `
    <img class="tree-card-image" src="${tree.image}" alt="${tree.name}" loading="lazy" />
    <div class="tree-card-body">
      <h3>${tree.name}</h3>
      <p>${tree.notes}</p>
      <div class="tree-card-meta">
        <span class="badge">${tree.type}</span>
        <span class="badge">${tree.size}</span>
        <span class="badge gold">${tree.quantity} available</span>
      </div>
      ${compact ? '' : `<p><strong>${money(tree.price)}</strong></p><div class="tree-card-actions"><button class="button primary" type="button">Add to quote</button><a class="button secondary" href="contact.html">Ask about it</a></div>`}
    </div>
  `;
  const button = $('button', card);
  if (button) button.addEventListener('click', () => addInquiry(tree));
  return card;
}

async function setupFeaturedTrees() {
  const container = $('[data-featured-trees]');
  if (!container) return;
  try {
    const trees = await getJSON('data/trees.json');
    trees.filter(tree => tree.featured).slice(0, 3).forEach(tree => container.append(treeCard(tree, true)));
  } catch {
    container.innerHTML = '<p class="muted">Featured trees could not be loaded.</p>';
  }
}

async function setupInventory() {
  const grid = $('[data-tree-grid]');
  if (!grid) return;
  const search = $('[data-tree-search]');
  const type = $('[data-tree-type]');
  const size = $('[data-tree-size]');
  const status = $('[data-inventory-status]');
  const clear = $('[data-clear-filters]');
  const clearList = $('[data-clear-inquiry]');
  let trees = [];

  function fillSelect(select, values) {
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const selectedType = type.value;
    const selectedSize = size.value;
    const filtered = trees.filter(tree => {
      const text = `${tree.name} ${tree.type} ${tree.size} ${tree.notes}`.toLowerCase();
      return (!q || text.includes(q)) &&
             (selectedType === 'all' || tree.type === selectedType) &&
             (selectedSize === 'all' || tree.size === selectedSize);
    });
    grid.innerHTML = '';
    filtered.forEach(tree => grid.append(treeCard(tree)));
    status.textContent = `${filtered.length} of ${trees.length} trees shown`;
  }

  try {
    trees = await getJSON('data/trees.json');
    fillSelect(type, [...new Set(trees.map(tree => tree.type))].sort());
    fillSelect(size, [...new Set(trees.map(tree => tree.size))].sort());
    [search, type, size].forEach(el => el.addEventListener('input', render));
    clear.addEventListener('click', () => { search.value = ''; type.value = 'all'; size.value = 'all'; render(); });
    clearList.addEventListener('click', clearInquiry);
    render();
  } catch {
    status.textContent = 'Inventory could not be loaded. Check data/trees.json.';
  }
}

async function setupGallery() {
  const grid = $('[data-gallery-grid]');
  const cats = $('[data-gallery-cats]');
  if (!grid || !cats) return;
  const dialog = $('[data-lightbox]');
  const img = $('[data-lightbox-img]');
  const title = $('[data-lightbox-title]');
  const caption = $('[data-lightbox-caption]');
  const close = $('[data-lightbox-close]');
  let items = [];
  let active = 'All';

  function renderButtons() {
    const categories = ['All', ...new Set(items.map(item => item.category))];
    cats.innerHTML = categories.map(cat => `<button type="button" class="${cat === active ? 'active' : ''}" data-cat="${cat}">${cat}</button>`).join('');
    $$('button', cats).forEach(button => button.addEventListener('click', () => {
      active = button.dataset.cat;
      renderButtons();
      renderGallery();
    }));
  }

  function renderGallery() {
    const shown = active === 'All' ? items : items.filter(item => item.category === active);
    grid.innerHTML = '';
    shown.forEach(item => {
      const card = document.createElement('button');
      card.className = 'gallery-card';
      card.type = 'button';
      card.innerHTML = `<img src="${item.image}" alt="${item.title}" loading="lazy"><div><h3>${item.title}</h3><p>${item.caption}</p></div>`;
      card.addEventListener('click', () => {
        img.src = item.image;
        img.alt = item.title;
        title.textContent = item.title;
        caption.textContent = item.caption;
        if (dialog.showModal) dialog.showModal();
      });
      grid.append(card);
    });
  }

  try {
    items = await getJSON('data/gallery.json');
    renderButtons();
    renderGallery();
    close?.addEventListener('click', () => dialog.close());
  } catch {
    grid.innerHTML = '<p class="muted">Gallery could not be loaded. Check data/gallery.json.</p>';
  }
}

function setupContactForm() {
  const form = $('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', event => {
    updateInquiryUI();

    // If this is deployed on Netlify, let Netlify handle the form submission.
    // For non-Netlify hosting, change data-form-mode to "email" on the form if you want mailto fallback.
    const usesNetlify = form.hasAttribute('data-netlify') || form.hasAttribute('netlify');
    const emailFallback = form.dataset.formMode === 'email';
    if (usesNetlify && !emailFallback) return;

    event.preventDefault();
    const data = new FormData(form);
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Interest: ${data.get('interest')}`,
      `Job location: ${data.get('location')}`,
      '',
      'Selected trees:',
      data.get('selectedTrees') || 'None selected',
      '',
      'Message:',
      data.get('message') || '',
      '',
      `Photo link: ${data.get('photo') || 'None'}`
    ].join('\n');
    const mailto = `mailto:info@example.com?subject=${encodeURIComponent('Tree Farm Quote Request')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).map(row => row.split(',').map(cell => cell.trim()));
  const headers = rows.shift();
  return rows.filter(row => row.length && row[0]).map((row, index) => {
    const obj = { id: `tree-${Date.now()}-${index}` };
    headers.forEach((header, i) => {
      const value = row[i] || '';
      obj[header] = header === 'featured' ? value.toLowerCase() === 'true' : value;
    });
    obj.quantity = Number(obj.quantity) || obj.quantity;
    return obj;
  });
}

function setupAdmin() {
  const csv = $('[data-csv-input]');
  const output = $('[data-json-output]');
  const convert = $('[data-convert-csv]');
  const download = $('[data-download-json]');
  if (!csv || !output || !convert || !download) return;

  function convertNow() {
    const json = parseCSV(csv.value);
    output.value = JSON.stringify(json, null, 2);
  }

  convert.addEventListener('click', convertNow);
  download.addEventListener('click', () => {
    if (!output.value.trim()) convertNow();
    const blob = new Blob([output.value], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'trees.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });
  convertNow();
}

setupMenu();
setupFeaturedTrees();
setupInventory();
setupGallery();
setupContactForm();
setupAdmin();
updateInquiryUI();

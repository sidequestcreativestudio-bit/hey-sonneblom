const toast = document.getElementById('toast');
let toastTimer;
let supabaseClient = null;
let customerSupabaseClient = null;
let cart = [];

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function money(value) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(Number(value || 0));
}

function initSupabase() {
  if (!window.supabase || !window.HEY_SONNEBLOM_SUPABASE_URL || !window.HEY_SONNEBLOM_SUPABASE_KEY) {
    throw new Error('Supabase client configuration is missing. Check supabase-config.js and the Supabase library.');
  }
  supabaseClient = window.supabase.createClient(
    window.HEY_SONNEBLOM_SUPABASE_URL,
    window.HEY_SONNEBLOM_SUPABASE_KEY
  );
  return supabaseClient;
}


function addProductToBag(product) {
  cart.push({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    product_ref: product.product_ref
  });
  const count = document.getElementById('cart-count');
  if (count) count.textContent = String(cart.length);
  showToast(`${product.name} added to your bag.`);
}

let quickViewElement = null;

function closeQuickView() {
  if (!quickViewElement) return;
  quickViewElement.classList.remove('is-open');
  quickViewElement.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('quick-view-open');
}

function openQuickView(product) {
  if (!quickViewElement) {
    quickViewElement = document.createElement('div');
    quickViewElement.className = 'quick-view-overlay';
    quickViewElement.id = 'quick-view-overlay';
    quickViewElement.setAttribute('aria-hidden', 'true');
    quickViewElement.innerHTML = `
      <section class="quick-view-modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
        <button class="quick-view-close" type="button" aria-label="Close product details">&times;</button>
        <div class="quick-view-image-wrap"><img class="quick-view-image" alt=""></div>
        <div class="quick-view-content">
          <p class="quick-view-eyebrow">HEY SONNEBLOM 🌻 THRIFTING CLOTHES</p>
          <h2 id="quick-view-title"></h2>
          <p class="quick-view-price"></p>
          <dl class="quick-view-meta">
            <div><dt>Brand</dt><dd class="quick-view-brand"></dd></div>
            <div><dt>Size</dt><dd class="quick-view-size"></dd></div>
            <div><dt>Product reference</dt><dd class="quick-view-ref"></dd></div>
          </dl>
          <p class="quick-view-description"></p>
          <button class="quick-view-add add-button" type="button">Add to bag</button>
        </div>
      </section>`;
    document.body.append(quickViewElement);

    quickViewElement.addEventListener('click', event => {
      if (event.target === quickViewElement || event.target.closest('.quick-view-close')) {
        closeQuickView();
      }
    });
  }

  const image = product.product_images?.[0]?.image_url;
  const imageElement = quickViewElement.querySelector('.quick-view-image');
  const imageWrap = quickViewElement.querySelector('.quick-view-image-wrap');
  if (image) {
    imageElement.src = image;
    imageElement.alt = product.name || 'Clothing item';
    imageElement.hidden = false;
    imageWrap.classList.remove('has-no-image');
    const existingPlaceholder = imageWrap.querySelector('.quick-view-placeholder');
    if (existingPlaceholder) existingPlaceholder.hidden = true;
  } else {
    imageElement.removeAttribute('src');
    imageElement.alt = '';
    imageElement.hidden = true;
    imageWrap.classList.add('has-no-image');
    if (!imageWrap.querySelector('.quick-view-placeholder')) {
      const placeholder = document.createElement('span');
      placeholder.className = 'quick-view-placeholder';
      placeholder.textContent = 'HEY SONNEBLOM 🌻';
      imageWrap.append(placeholder);
    }
    const existingPlaceholder = imageWrap.querySelector('.quick-view-placeholder');
    if (existingPlaceholder) existingPlaceholder.hidden = false;
  }

  quickViewElement.querySelector('#quick-view-title').textContent = product.name || '';
  quickViewElement.querySelector('.quick-view-price').textContent = money(product.price);
  quickViewElement.querySelector('.quick-view-brand').textContent = product.brand || 'Not specified';
  quickViewElement.querySelector('.quick-view-size').textContent = product.size || 'Not specified';
  quickViewElement.querySelector('.quick-view-ref').textContent = product.product_ref || 'Not specified';
  quickViewElement.querySelector('.quick-view-description').textContent =
    product.description || 'A lovely preloved find. Contact us if you would like more information.';
  quickViewElement.querySelector('.quick-view-add').onclick = () => {
    addProductToBag(product);
    closeQuickView();
  };

  quickViewElement.classList.add('is-open');
  quickViewElement.setAttribute('aria-hidden', 'false');
  document.body.classList.add('quick-view-open');
  quickViewElement.querySelector('.quick-view-close').focus();
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeQuickView();
});

function productCard(product) {
  const image = product.product_images?.[0]?.image_url;
  const card = document.createElement('article');
  card.className = 'product-card';
  const media = document.createElement('div');
  media.className = 'product-image';
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = product.name;
    img.loading = 'lazy';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    media.append(img);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'product-placeholder';
    placeholder.textContent = 'HEY\\nSONNEBLOM';
    media.append(placeholder);
  }
  const tag = document.createElement('span');
  tag.className = 'condition-tag';
  tag.textContent = product.featured ? 'FEATURED FIND' : 'PRELOVED';
  media.append(tag);
  media.classList.add('quick-view-trigger');
  media.setAttribute('role', 'button');
  media.setAttribute('tabindex', '0');
  media.setAttribute('aria-label', `View details for ${product.name}`);
  media.addEventListener('click', () => openQuickView(product));
  media.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openQuickView(product);
    }
  });

  const info = document.createElement('div');
  info.className = 'product-info';
  const details = document.createElement('div');
  const name = document.createElement('h3');
  name.textContent = product.name;
  name.classList.add('quick-view-title-trigger');
  name.setAttribute('role', 'button');
  name.setAttribute('tabindex', '0');
  name.setAttribute('aria-label', `View details for ${product.name}`);
  name.addEventListener('click', () => openQuickView(product));
  name.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openQuickView(product);
    }
  });
  const meta = document.createElement('p');
  meta.textContent = [product.brand, product.size, product.product_ref].filter(Boolean).join(' · ');
  details.append(name, meta);
  const price = document.createElement('strong');
  price.textContent = money(product.price);
  info.append(details, price);

  const button = document.createElement('button');
  button.className = 'add-button';
  button.type = 'button';
  button.textContent = 'Add to bag';
  button.addEventListener('click', () => addProductToBag(product));
  card.append(media, info, button);
  return card;
}

async function loadPublicProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '<p class="loading-note">Loading lovely finds…</p>';
  try {
    const categorySlug = document.body.dataset.category;
    let query = supabaseClient
      .from('products')
      .select('id, product_ref, name, brand, size, price, description, status, featured, created_at, product_images(image_url, display_order)')
      .eq('status', 'available');

    if (categorySlug) {
      query = query
        .select('id, product_ref, name, brand, size, price, description, status, featured, created_at, product_images(image_url, display_order), categories!inner(name, slug)')
        .eq('categories.slug', categorySlug);
    }

    const { data, error } = await query
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    grid.replaceChildren();
    if (!data?.length) {
      grid.innerHTML = categorySlug
        ? '<div class="category-empty"><span>🌻</span><h3>Something lovely is on its way</h3><p>There are no available items in this category just yet. Please check back soon.</p><a class="secondary-button" href="index.html#shop-categories">Browse all categories</a></div>'
        : '<p class="empty-note">No items are available just yet. Please check back soon. 🌻</p>';
      return;
    }
    data.forEach(product => {
      product.product_images?.sort((a, b) => a.display_order - b.display_order);
      grid.append(productCard(product));
    });
    const note = document.querySelector('.preview-note');
    if (note) note.textContent = categorySlug
      ? 'This collection updates automatically when new items are published in the seller dashboard. 🌻'
      : 'Fresh finds, updated as soon as they are published in the seller dashboard.';
    const label = document.querySelector('.demo-label');
    if (label) label.textContent = `${data.length} available ${data.length === 1 ? 'item' : 'items'}`;
  } catch (error) {
    console.error('Product catalogue error:', error);
    grid.innerHTML = '<p class="empty-note">We could not load the shop catalogue. Please try again shortly.</p>';
  }
}


function setCustomerMessage(message, isError = false) {
  const el = document.getElementById('customer-auth-message');
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('error', isError);
}

function initCustomerAuth() {
  const accountSection = document.getElementById('customer-account');
  if (!accountSection) return;

  const accountOverlay = document.getElementById('customer-account-overlay');
  const openAccountButton = document.getElementById('account-open');
  const closeAccountButton = document.getElementById('customer-account-close');

  function openCustomerAccount() {
    accountOverlay.classList.add('is-open');
    accountOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeAccountButton.focus();
  }

  function closeCustomerAccount() {
    accountOverlay.classList.remove('is-open');
    accountOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openAccountButton.focus();
  }

  openAccountButton?.addEventListener('click', openCustomerAccount);
  closeAccountButton?.addEventListener('click', closeCustomerAccount);
  accountOverlay?.addEventListener('click', event => {
    if (event.target === accountOverlay) closeCustomerAccount();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && accountOverlay.classList.contains('is-open')) {
      closeCustomerAccount();
    }
  });
  if (!window.supabase || !window.HEY_SONNEBLOM_CUSTOMER_SUPABASE_URL || !window.HEY_SONNEBLOM_CUSTOMER_SUPABASE_KEY) {
    setCustomerMessage('Customer account service is not configured yet. Please try again later.', true);
    return;
  }

  customerSupabaseClient = window.supabase.createClient(
    window.HEY_SONNEBLOM_CUSTOMER_SUPABASE_URL,
    window.HEY_SONNEBLOM_CUSTOMER_SUPABASE_KEY
  );

  const form = document.getElementById('customer-auth-form');
  const submit = document.getElementById('customer-auth-submit');
  const logout = document.getElementById('customer-logout');
  const nameField = document.getElementById('customer-full-name');
  const phoneField = document.getElementById('customer-phone');
  const modeSwitch = document.getElementById('customer-mode-switch');
  let mode = 'register';

  function setMode(nextMode) {
    mode = nextMode;
    const registering = mode === 'register';
    nameField.closest('label').hidden = !registering;
    nameField.required = registering;
    phoneField.closest('label').hidden = !registering;
    form.elements.password.autocomplete = registering ? 'new-password' : 'current-password';
    submit.textContent = registering ? 'Create my account' : 'Sign in';
    document.querySelectorAll('[data-customer-mode]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.customerMode === mode));
    });
    setCustomerMessage('');
  }

  document.querySelectorAll('[data-customer-mode]').forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.customerMode));
  });

  function renderCustomerSession(session) {
    const signedIn = !!session;
    document.getElementById('customer-signed-out').hidden = signedIn;
    document.getElementById('customer-signed-in').hidden = !signedIn;
    if (signedIn) {
      document.getElementById('customer-account-email').textContent = session.user.email || '';
      form.hidden = true;
      modeSwitch.hidden = true;
    } else {
      form.hidden = false;
      modeSwitch.hidden = false;
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    submit.disabled = true;
    setCustomerMessage(mode === 'register' ? 'Creating your account…' : 'Signing in…');
    try {
      const email = form.elements.email.value.trim();
      const password = form.elements.password.value;
      if (mode === 'register') {
        const fullName = nameField.value.trim();
        if (!fullName) throw new Error('Please enter your name.');
        const { data, error } = await customerSupabaseClient.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, phone: phoneField.value.trim() } }
        });
        if (error) throw error;
        setCustomerMessage(data.session
          ? 'Your account has been created and you are signed in.'
          : 'Registration received. Please check your email for the confirmation link before signing in.');
      } else {
        const { error } = await customerSupabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setCustomerMessage('You are signed in successfully.');
      }
      const { data: { session } } = await customerSupabaseClient.auth.getSession();
      renderCustomerSession(session);
    } catch (error) {
      setCustomerMessage(error.message || 'We could not complete that request. Please try again.', true);
    } finally {
      submit.disabled = false;
    }
  });

  logout.addEventListener('click', async () => {
    logout.disabled = true;
    const { error } = await customerSupabaseClient.auth.signOut();
    logout.disabled = false;
    if (error) {
      setCustomerMessage(error.message, true);
      return;
    }
    setCustomerMessage('You have signed out.');
    const { data: { session } } = await customerSupabaseClient.auth.getSession();
    renderCustomerSession(session);
  });

  setMode('register');
  customerSupabaseClient.auth.getSession().then(({ data: { session }, error }) => {
    if (error) setCustomerMessage(error.message, true);
    else renderCustomerSession(session);
  });
  customerSupabaseClient.auth.onAuthStateChange((_event, session) => {
    renderCustomerSession(session);
  });
}

function initShop() {
  document.getElementById('year')?.append(String(new Date().getFullYear()));
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-nav')?.classList.toggle('open');
  });
  document.getElementById('search-toggle')?.addEventListener('click', () => {
    const term = window.prompt('Search clothing by name, brand or size:');
    if (term === null) return;
    const cards = [...document.querySelectorAll('.product-card')];
    const query = term.trim().toLowerCase();
    cards.forEach(card => card.hidden = !card.textContent.toLowerCase().includes(query));
  });
  document.getElementById('cart-open')?.addEventListener('click', () => {
    if (!cart.length) {
      showToast('Your bag is empty for now.');
      return;
    }
    const summary = cart.map(item => `${item.name} (${money(item.price)})`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const message = `Hello Hey Sonneblom! I would like to enquire about:\n${summary}\nClothing subtotal: ${money(total)}`;
    const phone = document.body.dataset.whatsapp;
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    } else {
      showToast('WhatsApp ordering will be enabled when the shop number is configured.');
    }
  });
  initCustomerAuth();
  loadPublicProducts();
}

function setAdminMessage(message, isError = false) {
  const el = document.getElementById('admin-message');
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('error', isError);
}

async function loadAdminDashboard() {
  const { data: products, error } = await supabaseClient
    .from('products')
    .select('id, product_ref, name, brand, category_id, size, price, status, featured, created_at, product_images(image_url, display_order)')
    .order('created_at', { ascending: false });
  if (error) throw error;

  const counts = {
    available: products.filter(p => p.status === 'available').length,
    reserved: products.filter(p => p.status === 'reserved').length,
    sold: products.filter(p => p.status === 'sold').length
  };
  document.getElementById('count-available').textContent = counts.available;
  document.getElementById('count-reserved').textContent = counts.reserved;
  document.getElementById('count-sold').textContent = counts.sold;

  const list = document.getElementById('admin-product-list');
  list.replaceChildren();
  if (!products.length) {
    list.innerHTML = '<p>No products yet. Add your first lovely find above. 🌻</p>';
    return;
  }
  products.forEach(product => {
    const row = document.createElement('article');
    row.className = 'admin-product-row';
    const photo = product.product_images?.sort((a,b) => a.display_order-b.display_order)[0]?.image_url;
    if (photo) {
      const img = document.createElement('img');
      img.src = photo;
      img.alt = '';
      row.append(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'admin-product-placeholder';
      placeholder.textContent = '🌻';
      row.append(placeholder);
    }
    const info = document.createElement('div');
    info.className = 'admin-product-details';
    const title = document.createElement('strong');
    title.textContent = `${product.product_ref} · ${product.name}`;
    const sub = document.createElement('small');
    sub.textContent = `${product.brand || 'No brand'} · ${product.size || 'No size'} · ${money(product.price)}`;
    info.append(title, sub);
    const status = document.createElement('span');
    status.className = 'status-pill';
    status.textContent = product.status;
    const actions = document.createElement('div');
    actions.className = 'admin-product-actions';
    const edit = document.createElement('button');
    edit.className = 'secondary-button';
    edit.type = 'button';
    edit.textContent = 'Edit';
    edit.addEventListener('click', () => fillProductForm(product));
    const del = document.createElement('button');
    del.className = 'danger-button';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteProduct(product));
    actions.append(edit, del);
    row.append(info, status, actions);
    list.append(row);
  });
}

function fillProductForm(product) {
  const form = document.getElementById('product-form');
  form.elements.product_id.value = product.id;
  form.elements.name.value = product.name || '';
  form.elements.brand.value = product.brand || '';
  form.elements.category_id.value = product.category_id || '';
  form.elements.size.value = product.size || '';
  form.elements.price.value = product.price || '';
  form.elements.description.value = product.description || '';
  form.elements.status.value = product.status || 'draft';
  form.elements.featured.checked = !!product.featured;
  document.getElementById('form-heading').textContent = `Edit ${product.product_ref}`;
  window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
}

async function deleteProduct(product) {
  if (!window.confirm(`Delete ${product.product_ref} · ${product.name}? This cannot be undone.`)) return;
  try {
    const { error } = await supabaseClient.from('products').delete().eq('id', product.id);
    if (error) throw error;
    showToast('Product deleted.');
    await loadAdminDashboard();
  } catch (error) {
    console.error(error);
    showToast(error.message || 'Could not delete product.');
  }
}

async function uploadProductImages(productId, files) {
  const uploaded = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error(`${file.name}: use JPG, PNG or WEBP images.`);
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`${file.name}: image must be 5 MB or smaller.`);
    }
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const path = `${productId}/${Date.now()}-${i}-${safeName}`;
    const { error: uploadError } = await supabaseClient.storage.from('product-images').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type
    });
    if (uploadError) throw uploadError;
    const { data } = supabaseClient.storage.from('product-images').getPublicUrl(path);
    const { error: insertError } = await supabaseClient.from('product_images').insert({
      product_id: productId, image_url: data.publicUrl, display_order: i
    });
    if (insertError) throw insertError;
    uploaded.push(path);
  }
  return uploaded;
}

async function loadCategories() {
  const select = document.getElementById('category-select');
  const { data, error } = await supabaseClient.from('categories').select('id,name').eq('active', true).order('name');
  if (error) throw error;
  select.innerHTML = '<option value="">Choose a category</option>';
  (data || []).forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    select.append(option);
  });
}

async function initAdmin() {
  const loginPanel = document.getElementById('login-panel');
  const dashboard = document.getElementById('dashboard-content');
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    loginPanel.hidden = false;
    dashboard.hidden = true;
    return;
  }
  const { data: profile, error } = await supabaseClient
  .from('profiles')
  .select('full_name, role')
  .eq('id', session.user.id)
  .single();

console.log('SIGNED-IN USER:', session.user);
console.log('PROFILE RESULT:', profile);
console.log('PROFILE ERROR:', error);
console.log('PROFILE ROLE:', profile?.role);
console.log('USER ID:', session.user.id);

if (error) {
  setAdminMessage(
    `Could not retrieve administrator profile: ${error.message}`,
    true
  );
  return;
}

if (String(profile?.role || '').trim().toLowerCase() !== 'admin') {
  setAdminMessage(
    `Administrator access denied. Role received: ${profile?.role || 'No role found'}`,
    true
  );
  return;
}
  loginPanel.hidden = true;
  dashboard.hidden = false;
  document.getElementById('admin-heading').textContent = `Good day, ${profile.full_name || session.user.email}`;
  document.getElementById('admin-email').textContent = session.user.email;
  await loadCategories();
  await loadAdminDashboard();
}

async function main() {
  try {
    initSupabase();
    if (document.body.classList.contains('admin-page')) {
      
      document.getElementById('login-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const form = event.currentTarget;
        setAdminMessage('Signing in…');
        const { error } = await supabaseClient.auth.signInWithPassword({
          email: form.elements.email.value.trim(),
          password: form.elements.password.value
        });
        if (error) return setAdminMessage(error.message, true);
        await initAdmin();
      });
      document.getElementById('logout-button')?.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        window.location.reload();
      });
      document.getElementById('product-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const saveButton = form.querySelector('[type="submit"]');
        saveButton.disabled = true;
        try {
          const payload = {
            name: form.elements.name.value.trim(),
            brand: form.elements.brand.value.trim() || null,
            category_id: form.elements.category_id.value || null,
            size: form.elements.size.value.trim() || null,
            price: Number(form.elements.price.value),
            description: form.elements.description.value.trim() || null,
            status: form.elements.status.value,
            featured: form.elements.featured.checked
          };
          const id = form.elements.product_id.value;
          let productId = id;
          if (id) {
            const { error } = await supabaseClient.from('products').update(payload).eq('id', id);
            if (error) throw error;
          } else {
            const { data, error } = await supabaseClient.from('products').insert(payload).select('id').single();
            if (error) throw error;
            productId = data.id;
          }
          const files = [...form.elements.photos.files];
          if (files.length) await uploadProductImages(productId, files);
          form.reset();
          form.elements.product_id.value = '';
          document.getElementById('form-heading').textContent = 'Add a product';
          setAdminMessage('Product saved successfully.');
          showToast('Your product has been saved.');
          await loadAdminDashboard();
        } catch (error) {
          console.error(error);
          setAdminMessage(error.message || 'Could not save product.', true);
        } finally {
          saveButton.disabled = false;
        }
      });
      document.getElementById('cancel-edit')?.addEventListener('click', () => {
        const form = document.getElementById('product-form');
        form.reset();
        form.elements.product_id.value = '';
        document.getElementById('form-heading').textContent = 'Add a product';
      });
            // Load the dashboard after all event listeners are ready.
      try {
        await initAdmin();
      } catch (error) {
        console.error('Admin dashboard initialisation error:', error);
        setAdminMessage(
          `Dashboard could not finish loading: ${error.message}`,
          true
        );
      }
    } else {
      initShop();
    }
  } catch (error) {
    console.error(error);
    showToast(error.message || 'The shop could not connect.');
  }
}

document.addEventListener('DOMContentLoaded', main);

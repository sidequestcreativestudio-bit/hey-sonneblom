const toast = document.getElementById('toast');
let cartCount = 0;
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.getElementById('year')?.append(String(new Date().getFullYear()));
document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    cartCount += 1;
    const count = document.getElementById('cart-count');
    if (count) count.textContent = String(cartCount);
    showToast(`${button.dataset.name} added to your preview bag.`);
  });
});
document.getElementById('cart-open')?.addEventListener('click', () => showToast('The full shopping cart will be connected in a later phase.'));
document.getElementById('menu-toggle')?.addEventListener('click', () => document.getElementById('mobile-nav')?.classList.toggle('open'));
document.getElementById('search-toggle')?.addEventListener('click', () => showToast('Product search will be connected when the catalogue is ready.'));
document.getElementById('add-product-demo')?.addEventListener('click', () => showToast('Secure product upload will be built in the seller-dashboard phase.'));
document.getElementById('admin-info')?.addEventListener('click', () => showToast('Product fields: photos, name, brand, category, size, price and description.'));

# Hey Sonneblom Phase 2

## Included
- Live public catalogue from Supabase `products` and `product_images`
- Admin sign-in using Supabase Auth
- Admin product create/edit/delete
- Multiple product image uploads to `product-images`
- Stock status values: `draft`, `available`, `reserved`, `sold`
- Dashboard counts for available, reserved and sold products

## Publish to GitHub Pages
Upload/replace these five files in the existing repository root:
- `index.html`
- `admin.html`
- `app.js`
- `styles.css`
- `supabase-config.js`

Keep the existing repository settings and GitHub Pages configuration.

## Security notes
- `supabase-config.js` contains only the Supabase project URL and publishable key. Publishable keys are intended for browser use.
- Never add an `sb_secret_` key to this repository.
- The browser code relies on Supabase RLS policies and `public.is_admin()` for admin access.
- The current public catalogue intentionally displays only `status = 'available'`, even though the existing SELECT policy allows reads of every non-draft product.
- Product images are public because the bucket is intended for public shop photography.

## Before first live use
1. Test admin sign-in with each administrator account.
2. Create a draft product and confirm it is not visible on the public shop.
3. Publish an available product with a small JPG/PNG/WEBP photo (5 MB max).
4. Confirm the product appears publicly.
5. Test editing and deleting a test listing.
6. Do not enable customer checkout/order submission yet. That is a later phase.

## Important current limitations
- The bag is a local preview only and is not persisted.
- The bag WhatsApp action remains disabled until the shop WhatsApp number is deliberately configured.
- The dashboard's new-orders count is not connected yet.
- Product image deletion from Storage is not yet automated when a product is deleted; orphaned image files may remain in the bucket.
- Existing category links are visual navigation tiles; category filtering is a later refinement.

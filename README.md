# Hey Sonneblom 🌻 Thrifting Clothes

**Live shop:** https://sidequestcreativestudio-bit.github.io/hey-sonneblom/  
**Seller dashboard:** https://sidequestcreativestudio-bit.github.io/hey-sonneblom/admin.html  
**Repository:** https://github.com/sidequestcreativestudio-bit/hey-sonneblom

Hey Sonneblom is a South African preloved-clothing shop. The website gives customers a simple way to browse available clothing by category, view product details, and add items to their shopping bag.

The visual identity uses a warm boutique style with cream and ivory backgrounds, sunflower yellow, sage and deep green accents, and refined typography. Keep the established brand look consistent when making future changes.

---

## Current project status

- **Phases 1–4:** Complete and field-tested.
- **Phase 5: Customer Accounts and Profiles:** Core functionality is implemented. Profile save/reload works, but the remaining privacy, session and password-recovery checks are still outstanding.
- **Phase 6: Shopping Bag:** Implemented functionality is present, but the full cart test checklist is not yet signed off.
- **Phase 7: Checkout and Order Submission:** Database preparation and the relevant RLS policy review are complete. The frontend checkout implementation still needs to be inspected and tested end to end.
- **Current development focus:** Verify the existing checkout implementation, then run one controlled test order and confirm that the correct records are created in `orders` and `order_items`.
- **Admin presentation refresh:** Dashboard navigation and section layout are being tidied without database or order-workflow changes. This is a presentation improvement only and does not change the phase sequence.

The deployed storefront, category pages and Product Quick-View remain the stable baseline. Do not repeat checks already recorded as complete. Back up working files before making further changes.

## Completed development phases

### Phase 1: Website foundation — Complete

- GitHub Pages storefront established.
- Initial storefront structure and visual identity created.
- Supabase connected to the website.

### Phase 2: Database and seller dashboard — Complete

- Supabase database tables and storage configured.
- Row Level Security (RLS) enabled.
- Seller sign-in and dashboard functionality established.
- Product creation and image upload.
- Product editing and deletion.
- Product availability/status management.
- Automatic product reference generation.
- Category assignment for products.

### Phase 3: Categories and automatic publishing — Complete

- Four category collections created: Tops & Shirts, Dresses, Bottoms and Other Finds.
- Homepage category tiles link to their collection pages.
- Collection pages load products from Supabase.
- Public collection queries show products with status = 'available'.
- Products are filtered by their assigned category.
- Draft or unavailable products do not appear in public collections.
- Category page styling and empty-category states implemented.

### Phase 4: Product Quick-View — Complete and field-tested

- Product image and product name open a centred Quick-View modal.
- Product name, price, brand, size, product reference and description displayed.
- Add to Bag action available from Quick-View.
- Modal closes using the close button, backdrop or Escape key.
- Keyboard access supported for opening product details.
- Responsive desktop and mobile layouts.
- Existing category filtering, product publishing, seller dashboard and Add to Bag functionality preserved.

#### Phase 4 verification record

- [x] Tops & Shirts collection checked.
- [x] Dresses collection checked.
- [x] Bottoms collection checked.
- [x] Other Finds collection checked.
- [x] Category styling and product filtering retained.
- [x] Quick-View product details and image checked.
- [x] Quick-View controls checked by the user.
- [x] Desktop presentation checked.
- [x] Mobile presentation checked.

---

## Active development

### Phase 5: Customer Accounts and Profiles — In progress

Customer authentication uses a **separate customer Supabase project**. It must remain separate from the original shop/seller Supabase project.

#### Implemented and tested

- [x] Customer registration.
- [x] Supabase email-confirmation flow tested with a test account.
- [x] Customer sign-in and sign-out.
- [x] Account window and round account icon.
- [x] Approved warm Hey Sonneblom signed-in welcome message.
- [x] Customer profile form displayed inside the account window.
- [x] `customer_profiles` table extended with delivery-address columns.
- [x] Profile data loads for the signed-in customer.
- [x] Profile data saves successfully.
- [x] Saved profile data remains available after sign-out and sign-in.
- [x] Table privileges for the `authenticated` role were granted and verified for SELECT, INSERT and UPDATE.

#### Customer profile fields

- Full name (`full_name`)
- Email address (`email`)
- Mobile number (`phone`)
- Street address (`street_address`)
- Suburb (`suburb`)
- Town / City (`city`)
- Province (`province`)
- Postal code (`postal_code`)

The table also retains its existing `id`, `created_at` and `updated_at` columns.

#### Still to complete in Phase 5

- [ ] Test privacy isolation with a second customer account. Customer A must not read or update Customer B's profile.
- [ ] Confirm RLS policies enforce ownership for SELECT, INSERT and UPDATE. Table GRANT permissions alone are not sufficient.
- [ ] Test editing an already-saved profile.
- [ ] Add sensible required-field and input validation.
- [ ] Decide whether multiple saved delivery addresses are required, then implement if approved.
- [ ] Add delivery instructions if required.
- [ ] Verify profile behaviour on mobile and desktop.
- [ ] Test customer password reset.
- [ ] Customise the Supabase confirmation email with approved Hey Sonneblom wording and branding.
- [ ] Test the final confirmation email and link.
- [ ] Implement and test customer session timeout/automatic logout.
- [ ] Verify customer authentication does not interfere with the seller dashboard session.

**Phase 5 is not complete until the outstanding security and functional tests pass.**

### Phase 6: Shopping Bag and Order Journey — In progress

The shopping bag and Add to Bag journey have been implemented in the storefront. The phase is not signed off until the following behaviours have been tested on the live site:

- [ ] Add products from the category listing and Product Quick-View.
- [ ] Remove an item from the bag.
- [ ] Change quantity, if quantity controls are supported by the current implementation.
- [ ] Confirm the bag total and subtotal recalculate correctly.
- [ ] Confirm unavailable products cannot proceed to checkout.
- [ ] Confirm one-of-one products cannot be duplicated or ordered more than once.
- [ ] Confirm the bag behaves correctly after a page refresh.
- [ ] Confirm the bag behaves correctly for signed-in and signed-out customers.
- [ ] Confirm the selected product references and item details are passed correctly into checkout.

Do not assume a cart behaviour is complete merely because its control is visible. Record each live test result before marking it complete.

### Phase 7: Checkout, Orders and Payments — In progress

#### Database preparation and review — Complete

The original shop/seller Supabase project was inspected. The following database structure and security items have been checked:

- [x] `orders` table structure inspected.
- [x] `order_items` table structure inspected.
- [x] `orders` has three reviewed RLS policies: admin management, customer order creation and customer reading of their own orders.
- [x] `order_items` has three reviewed RLS policies: admin management, customer insertion of items belonging to their own order and customer reading of their own order items.
- [x] Customer order policies scope access using the authenticated customer's `customer_id`.
- [x] Admin policies use the `is_admin()` check.
- [x] `order_items.order_id` references `orders.id` with ON DELETE CASCADE.
- [x] `order_items.product_id` references `products.id` with ON DELETE SET NULL.
- [x] `products.category_id` references `categories.id` with ON DELETE SET NULL.
- [x] `product_images.product_id` references `products.id` with ON DELETE CASCADE.
- [x] Data API exposure reviewed: `categories`, `order_items`, `orders`, `product_images` and `products` are exposed. `profiles` remains unexposed.
- [x] Existing test products `HS-00001` and `HS-00002` inspected.
- [x] A stored product image URL was opened and verified to load.

These checks confirm the schema, configured policies and relationships were reviewed. They do **not** prove that a live customer order can be submitted successfully. The order tables were empty during the inspection; no successful end-to-end order submission has yet been recorded.

#### Next checkout and order-submission work

- [ ] Inspect the current checkout code and confirm which fields it collects.
- [ ] Confirm collection and delivery choices and how PUDO/PAXI are represented.
- [ ] Confirm delivery fee, subtotal and total calculations.
- [ ] Confirm customer details are loaded or validated correctly.
- [ ] Confirm checkout validates product availability and one-of-one stock.
- [ ] Confirm the frontend creates one `orders` row and the corresponding `order_items` rows.
- [ ] Run one controlled test order and inspect both tables for correct values and relationships.
- [ ] Confirm errors are handled without creating incomplete or duplicate orders.
- [ ] Confirm order creation works under the intended authenticated customer role, not only the Supabase SQL editor's `postgres` role.
- [ ] Add seller dashboard order management after successful order creation is verified.
- [ ] Add invoice generation, payment workflow and secure payment verification.
- [ ] Add fulfilment updates, customer notifications and customer order history.

Payment and fulfilment automation must remain out of scope until order creation is proven to work safely.

#### Important one-of-one stock rules

Hey Sonneblom sells unique, one-of-a-kind clothing items. Preserve these agreed rules:

1. Adding an item to a bag or wishlist does not reserve it.
2. Placing an order reserves the item.
3. The item remains visible with a SOLD label until payment is confirmed.
4. Once paid, its status becomes `sold` and it is hidden from normal available-product listings.
5. Prevent two customers from successfully reserving the same one-of-a-kind item.

Never mark an order as paid solely because a customer returns to the website from a payment page. Payment must be verified securely.

### Phase 8: Seller/Admin Improvements — Planned

- Add a discreet admin login entry in the agreed footer location.
- Preserve the customer-facing storefront and avoid an obvious admin button for shoppers.
- Provide Rachel with intended admin access through the existing seller/admin authentication system.
- Implement and test admin session timeout/automatic logout.
- Verify strict separation between customer and admin permissions and sessions.
- Add order/customer management improvements as required by the order workflow.

### Phase 9: Final Testing and Launch Readiness — Planned

- Full desktop and mobile testing.
- Customer registration, confirmation, sign-in and password-reset tests.
- Customer profile privacy and ownership tests.
- Shopping bag and stock-reservation tests.
- Checkout and payment verification tests.
- Order, invoice and fulfilment tests.
- Seller/admin access and session tests.
- Review database backups and recovery arrangements.
- Confirm public frontend files contain only Supabase public/publishable keys.

---

## Technology

- HTML
- CSS
- JavaScript
- GitHub Pages
- Supabase (database, authentication and image storage)

## Supabase project structure

The project uses **two separate Supabase projects**:

1. **Original shop/seller project** — existing storefront product data, seller dashboard and related shop functionality.
2. **Customer accounts project** — customer authentication and the `customer_profiles` table.

Keep the projects separate. Do not replace the original shop configuration with the customer project configuration, or vice versa.

The original shop project uses these tables:

- categories
- products
- product_images
- profiles
- orders
- order_items

Original shop storage bucket:

- product-images

The customer project includes:

- customer_profiles

Keep RLS enabled on both projects and preserve appropriately scoped policies. Customer profile access must be restricted to the authenticated owner of each profile.

### Security rules

- The website must use only Supabase public/publishable keys.
- Never place a Supabase secret or service-role key in frontend files, GitHub Pages or public repository code.
- Never disable RLS as a shortcut to fix a database issue.
- Table GRANT permissions do not replace RLS policies. Both required SQL privileges and correct ownership policies must be in place.
- Do not expose customer addresses, contact details, orders or invoices to other customers.
- Keep customer authentication separate from seller/admin access.

## Main website files

- `index.html` - storefront homepage and customer account/profile interface.
- `app.js` - storefront behaviour, product loading, bag interactions, Quick-View, customer authentication/profile behaviour and seller dashboard logic.
- `styles.css` - storefront, category, dashboard, Quick-View and account styling.
- `supabase-config.js` - original shop Supabase URL and public client configuration.
- Customer Supabase configuration - separate customer project URL and public client configuration, kept distinct from the original shop configuration.
- `admin.html` - seller dashboard.
- `tops-and-shirts.html` - Tops & Shirts collection.
- `dresses.html` - Dresses collection.
- `bottoms.html` - Bottoms collection.
- `other-finds.html` - Other Finds collection.

Keep the four category pages and their `data-category` values aligned with the category slugs in Supabase.

## Product reference examples

- HS-00001
- HS-00002

Product references should remain unique and should be retained through customer enquiries and order records.

## Stable baseline and change-control rules

The deployed storefront, category pages and Product Quick-View have been tested and confirmed working. Customer registration and basic profile save/reload have also been tested.

Before starting a new feature or phase:

1. Download or commit a backup of the current working files.
2. Make changes in a separate development copy or branch where possible.
3. Keep category filtering and category page styling intact.
4. Do not replace whole files with older or partial versions.
5. Make the smallest practical changes for the phase.
6. Make one database change at a time.
7. Run a JavaScript syntax check before deployment.
8. Deploy and test the live website before marking a feature complete.
9. Update this README after the user confirms the live tests.
10. Never disable RLS as a shortcut to fix a database issue.

## Deployment

The website is hosted through GitHub Pages. Changes pushed to the configured publishing branch are deployed by GitHub Pages/Actions.

After deployment, verify relevant features:

- Homepage loads.
- All four category links work.
- Products appear only in their assigned category.
- Unavailable products are not publicly listed.
- Product Quick-View opens and shows the correct item.
- Add to Bag works.
- Customer registration, sign-in and sign-out work.
- Customer profile saves and reloads.
- Customer profile privacy is enforced.
- Desktop and mobile layouts remain usable.
- Seller dashboard still loads and existing product-management actions remain functional.

## Project principle

Protect what works. Improve one phase at a time. Test the live result before moving forward.

**Every piece deserves another story. 🌻**

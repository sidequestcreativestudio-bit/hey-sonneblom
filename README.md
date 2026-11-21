# Hey Sonneblom 🌻 Thrifting Clothes

**Live shop:** https://sidequestcreativestudio-bit.github.io/hey-sonneblom/  
**Seller dashboard:** https://sidequestcreativestudio-bit.github.io/hey-sonneblom/admin.html  
**Repository:** https://github.com/sidequestcreativestudio-bit/hey-sonneblom

Hey Sonneblom is a South African preloved-clothing shop. The website lets customers browse available clothing by category, view product details, create customer accounts, save profile details, add garments to a shopping bag and proceed through checkout.

The visual identity uses the approved Hey Sonneblom floral badge/logo and a warm boutique style: cream and ivory backgrounds, sunflower yellow, sage and deep green accents. Preserve the approved logo artwork and wording. Keep the established brand look consistent.

---

## Current project status (updated 21 November 2026)

- **Phases 1–4: Website foundation, shop database/dashboard, categories and Product Quick-View — Complete and previously field-tested.**
- **Phase 5: Customer Accounts and Profiles — Core functionality implemented and tested. Security, recovery and session checks remain.**
- **Phase 6: Shopping Bag — Implemented and used in checkout. Full regression checklist still needs sign-off.**
- **Phase 7: Checkout and Order Submission — Checkout UI, secure order backend and order-creation path have been built. Authentication, profile lookup, request validation, database function existence/security and function execution permissions were verified. The final Place Order button was added and displayed in the live checkout. The customer-to-shop foreign-key mismatch was identified and the incorrect `orders_customer_id_fkey` constraint was removed. Continue verifying the resulting order records, stock reservation and duplicate-submit behaviour before calling the full order workflow complete.**
- **Invoice design — Approved visual direction. Invoice V3 draft is in `Invoice/Hey_Sonneblom_Invoice_Design_v3.pdf`. This is a design draft, not yet connected to automatic invoice generation or delivery.**
- **Current development focus — Admin order management and fulfilment controls, followed by invoice generation and customer notifications.**

The live storefront, category pages and Product Quick-View are the stable baseline. Back up working files before making changes. Do not replace newer files with older versions.

## Completed development phases

### Phase 1: Website foundation — Complete

- GitHub Pages storefront established.
- Initial storefront structure and visual identity created.
- Supabase connected to the website.

### Phase 2: Database and seller dashboard foundation — Complete

- Supabase database tables and storage configured.
- Row Level Security (RLS) enabled.
- Seller sign-in and dashboard foundation established.
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

### Phase 5: Customer Accounts and Profiles — Core implemented; remaining checks open

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
- [x] Edge Function customer-token verification passed.
- [x] Edge Function customer profile lookup passed after correcting the customer project's service access configuration.

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

### Phase 6: Shopping Bag — Implemented; full regression sign-off pending

- [x] Shopping bag is connected to the Add to Bag journey.
- [x] Bag contents were used to proceed through the checkout flow.
- [ ] Add products from category listing and Product Quick-View.
- [ ] Remove an item from the bag.
- [ ] Change quantity, if quantity controls are supported by the current implementation.
- [ ] Confirm the bag total and subtotal recalculate correctly.
- [ ] Confirm unavailable products cannot proceed to checkout.
- [ ] Confirm one-of-one products cannot be duplicated or ordered more than once.
- [ ] Confirm the bag behaves correctly after a page refresh.
- [ ] Confirm the bag behaves correctly for signed-in and signed-out customers.
- [ ] Confirm selected product references and item details are passed correctly into checkout.
- [ ] Confirm the bag is cleared only after successful order creation.

Do not assume a cart behaviour is complete merely because its control is visible. Record each live test result before marking it complete.

### Phase 7: Checkout, Orders and Payments — In progress

#### Database and secure order backend — Implemented; end-to-end verification remains

- [x] `orders` and `order_items` structures inspected.
- [x] Existing RLS policies reviewed.
- [x] `reservation_expires_at` column added to `orders`.
- [x] `public.create_customer_order(...)` database function created.
- [x] Database function verified as `SECURITY DEFINER` and returning `jsonb`.
- [x] Function execution permissions verified: `anon = false`, `authenticated = false`, `service_role = true`.
- [x] Database function includes the 48-hour reservation expiry and server-side product/price and courier validation logic.
- [x] `create-customer-order` Supabase Edge Function deployed in the main shop project.
- [x] Edge Function secrets configured in the main shop project. Secret/service-role values must remain in Supabase secrets only.
- [x] Customer authentication and customer profile lookup passed in the Edge Function.
- [x] Empty-bag validation returned the expected response, confirming the request parsing and validation path.
- [x] Final Place Order button added to the checkout summary and displayed in the live storefront.
- [x] Incorrect `orders_customer_id_fkey` relationship to the main project's `auth.users` identified as incompatible with the separate customer-auth project and removed. The `customer_id` UUID column remains.
- [ ] Verify the live successful order is present in `orders` and its line item(s) are present in `order_items`.
- [ ] Verify the selected product changes from `available` to `reserved`.
- [ ] Verify the order has a `reservation_expires_at` approximately 48 hours after creation.
- [ ] Verify failed submissions do not create partial orders or reserve stock.
- [ ] Verify repeated clicks/retries cannot create duplicate orders.
- [ ] Verify the shopping bag clears only after a confirmed successful response.
- [ ] Test collection, PUDO and PAXI separately, including server-side delivery fee calculations.
- [ ] Confirm unpaid orders are safely cancelled and stock is released after 48 hours. The expiry timestamp exists; automatic expiry processing/cron is not yet implemented.
- [ ] Add secure payment confirmation and ensure paid orders can never be released by expiry processing.

#### Agreed one-of-one stock rules

Hey Sonneblom sells unique, one-of-a-kind clothing items. Preserve these rules:

1. Adding an item to a bag or wishlist does not reserve it.
2. Placing an order reserves the item.
3. The item remains visible with a SOLD label until payment is confirmed, if that is the approved storefront behaviour.
4. Once paid, its status becomes `sold` and it is hidden from normal available-product listings.
5. Prevent two customers from successfully reserving the same one-of-a-kind item.
6. Never mark an order as paid solely because a customer returns to the website from a payment page. Payment must be verified and confirmed by Rachel.

### Phase 8: Admin Order Management and Fulfilment — Next development focus

The admin panel must be the control point for Rachel to manage orders from payment confirmation through dispatch or collection.

#### Planned admin order controls

- [ ] Add an order list to the existing `admin.html` seller dashboard.
- [ ] Display order reference, date, customer details, items, sizes, totals and fulfilment method.
- [ ] Display payment status separately from fulfilment status.
- [ ] Add a deliberate **Mark as Paid** action for Rachel after she verifies payment.
- [ ] Record who/when confirmed payment where practical.
- [ ] For local collection orders, provide **Ready for Collection** and **Completed** actions.
- [ ] Show the collection address: 77 Algoa Rd, De Mist, Kariega, 6229.
- [ ] For PUDO/PAXI orders, provide courier selection and tracking-number input.
- [ ] Require a tracking number before allowing an order to be marked **Shipped**.
- [ ] Save tracking details to the order record.
- [ ] Provide a **Shipped** action and a **Completed** action.
- [ ] Prevent irrelevant actions from appearing: collection orders should not require courier tracking; courier orders should not use the collection-ready action.
- [ ] Add safe cancellation handling and stock-release rules.
- [ ] Preserve existing product-management functionality and admin access controls.

#### Agreed fulfilment workflow

**All fulfilment is controlled from the admin panel.**

1. Customer places an order; it begins as pending payment.
2. Rachel checks the payment and selects **Mark as Paid**.
3. The customer receives a payment/order confirmation email.
4. For **PUDO/PAXI**, Rachel prepares the parcel, enters the courier tracking number and marks it **Shipped**. The customer receives the tracking details by email.
5. For **local collection**, Rachel marks the order **Ready for Collection**. The customer receives the collection notification and address.
6. Rachel marks the order **Completed** when the parcel has been collected or delivery is complete.

### Phase 9: Invoice, Payment Proof and Customer Notifications — Design approved; automation pending

#### Approved invoice design

- [x] Hey Sonneblom floral badge/logo supplied and used in the invoice design.
- [x] Invoice wording used instead of “Tax Invoice”.
- [x] Business email included: `heysonneblomthrift@gmail.com`.
- [x] Local collection address included: 77 Algoa Rd, De Mist, Kariega, 6229.
- [x] Capitec EFT account details included in the invoice draft.
- [x] Rachel's proof-of-payment WhatsApp number included: 069 991 7794.
- [x] EFT and cash payment sections included in the design.
- [x] 48-hour reservation notice included.
- [x] Invoice V3 draft saved at `Invoice/Hey_Sonneblom_Invoice_Design_v3.pdf`.

#### Still to build

- [ ] Generate a unique invoice from each successful order, populated with actual customer, order, item, delivery and total data.
- [ ] Store invoice number and generated PDF/reference against the order.
- [ ] Email the PDF invoice to the customer.
- [ ] Send the invoice to the customer by WhatsApp using an approved WhatsApp integration or provider. A phone number printed on an invoice does not itself send messages.
- [ ] Send new-order notification to `heysonneblomthrift@gmail.com`.
- [ ] Provide a customer proof-of-payment submission method.
- [ ] Notify Rachel when proof of payment is submitted.
- [ ] Keep payment status pending until Rachel verifies the funds and selects **Mark as Paid**.
- [ ] When Rachel marks an order as paid, automatically email the customer a payment/order confirmation.
- [ ] When a PUDO/PAXI order is marked shipped, email the courier and tracking number to the customer.
- [ ] When a collection order is marked ready, email the customer the collection notification and address.
- [ ] When an order is completed or cancelled, send the appropriate customer email.
- [ ] Record notification delivery/failure status and prevent duplicate emails when an admin action is repeated.

**Important:** Invoice V3 is an approved design draft only. Automatic PDF creation, email sending and WhatsApp sending have not yet been implemented.

### Phase 10: Final Testing and Launch Readiness — Planned

- [ ] Full desktop and mobile testing.
- [ ] Customer registration, confirmation, sign-in and password-reset tests.
- [ ] Customer profile privacy and ownership tests.
- [ ] Shopping bag and stock-reservation tests.
- [ ] Checkout and payment verification tests.
- [ ] Order, invoice and fulfilment tests.
- [ ] Email delivery and WhatsApp integration tests.
- [ ] Seller/admin access and session tests.
- [ ] Review database backups and recovery arrangements.
- [ ] Confirm public frontend files contain only Supabase public/publishable keys.

---

## Technology

- HTML
- CSS
- JavaScript
- GitHub Pages
- Supabase (database, authentication, storage and Edge Functions)

## Supabase project structure

The project uses **two separate Supabase projects**:

1. **Original shop/seller project** — storefront product data, seller dashboard, orders, order items, courier rates and related shop functionality.
2. **Customer accounts project** — customer authentication and the `customer_profiles` table.

Keep the projects separate. Do not replace the original shop configuration with the customer project configuration, or vice versa.

The original shop project uses these tables:

- categories
- products
- product_images
- profiles
- orders
- order_items
- courier_rates
- courier_settings

Original shop storage bucket:

- product-images

The customer project includes:

- customer_profiles

Keep RLS enabled on both projects and preserve appropriately scoped policies. Customer profile access must be restricted to the authenticated owner of each profile.

## Security rules

- The website must use only Supabase public/publishable keys.
- Never place a Supabase secret or service-role key in frontend files, GitHub, public repository code or downloadable website ZIPs.
- Keep all service-role keys in Supabase Edge Function secrets.
- Never disable RLS as a shortcut to fix a database issue.
- Table GRANT permissions do not replace RLS policies. Both required SQL privileges and correct ownership policies must be in place.
- Do not expose customer addresses, contact details, orders or invoices to other customers.
- Keep customer authentication separate from seller/admin access.
- Order creation and payment-sensitive actions must be performed through appropriately secured server-side functions or policies.

## Main website files

- `index.html` - storefront homepage and customer account/profile interface.
- `app.js` - storefront behaviour, product loading, bag interactions, Quick-View, customer authentication/profile behaviour and checkout submission.
- `styles.css` - storefront, category, dashboard, Quick-View and account styling.
- `supabase-config.js` - original shop Supabase URL and public client configuration.
- Customer Supabase configuration - separate customer project URL and public client configuration, kept distinct from the original shop configuration.
- `admin.html` - seller dashboard; order-management controls are the next planned addition.
- `tops-and-shirts.html` - Tops & Shirts collection.
- `dresses.html` - Dresses collection.
- `bottoms.html` - Bottoms collection.
- `other-finds.html` - Other Finds collection.
- `Invoice/Hey_Sonneblom_Invoice_Design_v3.pdf` - approved invoice design draft.

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
- Checkout and order submission work.
- Order and product reservation records are correct.
- Admin product-management actions remain functional.
- Admin order-management actions are permission-protected.
- Invoice and customer notifications work once implemented.
- Desktop and mobile layouts remain usable.

## Project principle

Protect what works. Improve one phase at a time. Test the live result before moving forward.

**Every piece deserves another story. 🌻**

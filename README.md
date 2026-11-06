Hey Sonneblom 🌻 Thrifting Clothes
Live shop: https://sidequestcreativestudio-bit.github.io/hey-sonneblom/
Seller dashboard: https://sidequestcreativestudio-bit.github.io/hey-sonneblom/admin.html
Repository: https://github.com/sidequestcreativestudio-bit/hey-sonneblom

Hey Sonneblom is a South African preloved-clothing shop. The website gives customers a simple way to browse available clothing by category, view product details, and add items to their shopping bag.

The visual identity uses a warm boutique style with cream and ivory backgrounds, sunflower yellow, sage and deep green accents, and refined typography. Keep the established brand look consistent when making future changes.
Current project status
Phase 4: Product Quick-View is complete and field-tested.

The live storefront has been checked after deployment. The four category pages display their correct products or the correct empty-category state. Quick-View displays the selected product information and image. The Quick-View controls have been tested, and the layout has been confirmed on desktop and mobile.

The current deployed app.js and styles.css are the stable baseline. Back them up before making further changes.
Completed development phases
Phase 1: Website foundation
- GitHub Pages storefront established.
- Initial storefront structure and visual identity created.
- Supabase connected to the website.
Phase 2: Database and seller dashboard
- Supabase database tables and storage configured.
- Row Level Security (RLS) enabled.
- Seller sign-in and dashboard functionality established.
- Product creation and image upload.
- Product editing and deletion.
- Product availability/status management.
- Automatic product reference generation.
- Category assignment for products.
Phase 3: Categories and automatic publishing
- Four category collections created:
  - Tops & Shirts
  - Dresses
  - Bottoms
  - Other Finds
- Homepage category tiles link to their collection pages.
- Collection pages load products from Supabase.
- Public collection queries show products with status = 'available'.
- Products are filtered by their assigned category.
- Draft or unavailable products do not appear in public collections.
- Category page styling and empty-category states implemented.
Phase 4: Product Quick-View
- Product image and product name open a centred Quick-View modal.
- Product details shown:
  - Product name
  - Price
  - Brand
  - Size
  - Product reference
  - Description
- Add to Bag action available from Quick-View.
- Modal can be closed using the close button, backdrop, or Escape key.
- Keyboard access supported for opening product details.
- Responsive desktop and mobile layouts.
- Existing category filtering, product publishing, seller dashboard and Add to Bag functionality preserved.
Phase 4 verification record
- [x] Tops & Shirts collection checked.
- [x] Dresses collection checked.
- [x] Bottoms collection checked.
- [x] Other Finds collection checked.
- [x] Category styling and product filtering retained.
- [x] Quick-View product details and image checked.
- [x] Quick-View controls checked by the user.
- [x] Desktop presentation checked.
- [x] Mobile presentation checked.
Technology
- HTML
- CSS
- JavaScript
- GitHub Pages
- Supabase (database, authentication and image storage)
Supabase project structure
The project uses the following tables:
- categories
- products
- product_images
- profiles
- orders
- order_items
Storage bucket:
- product-images
Row Level Security is enabled. Keep RLS enabled and preserve appropriately scoped policies.

Security rule: The website must use only the Supabase public/publishable key. Never place a Supabase secret or service-role key in frontend files, GitHub Pages, or public repository code.
Main website files
- index.html - storefront homepage.
- app.js - storefront behaviour, product loading, bag interactions, Quick-View and seller dashboard logic.
- styles.css - storefront, category, dashboard and Quick-View styling.
- supabase-config.js - Supabase URL and public client configuration.
- admin.html - seller dashboard.
- tops-and-shirts.html - Tops & Shirts collection.
- dresses.html - Dresses collection.
- bottoms.html - Bottoms collection.
- other-finds.html - Other Finds collection.
Keep the four category pages and their data-category values aligned with the category slugs in Supabase.
Stable baseline and change-control rules
After completing Phase 4, the deployed app.js and styles.css were tested and confirmed working.

Before starting a new phase:
1. Download or commit a backup of the current working files.
2. Make changes in a separate development copy or branch where possible.
3. Keep category filtering and the category page styling intact.
4. Do not replace whole files with older or partial versions.
5. Make the smallest practical changes for the phase.
6. Run a JavaScript syntax check before deployment.
7. Deploy and test the live website before marking a phase complete.
8. Update this README only after the user confirms the live tests.
Never disable RLS as a shortcut to fix a database issue.
Planned development roadmap
The following items are planned, not yet marked complete.
Next: Phase 5 - Shopping Bag and Order Journey
Review and improve the customer shopping journey before introducing payment or fulfilment automation. Scope to be confirmed before implementation. Potential work includes:
- A clear bag/cart view with selected items.
- Quantity and item removal controls where appropriate.
- Stock checks to prevent unavailable items being ordered.
- A clear order summary and subtotal.
- A customer enquiry/order hand-off that retains the selected product references.
- Clear collection and delivery choices, including PUDO and PAXI, with courier charges confirmed separately.
Later phases
- Customer accounts, if they provide a clear benefit.
- Checkout and order capture.
- Order management in the seller dashboard.
- Invoice generation.
- Payment workflow.
- Order fulfilment and customer updates.
Do not implement payment processing, automatic courier pricing, or customer account features until their requirements and security implications have been agreed.
Product reference examples
- HS-00001
- HS-00002
Product references should remain unique and should be retained through customer enquiries and order records.
Deployment
The website is hosted through GitHub Pages. Changes pushed to the configured publishing branch are deployed by GitHub Pages/Actions.

After deployment, verify:
- Homepage loads.
- All four category links work.
- Products appear only in their assigned category.
- Unavailable products are not publicly listed.
- Product Quick-View opens and shows the correct item.
- Add to Bag works.
- Desktop and mobile layouts remain usable.
- Seller dashboard still loads and existing product-management actions remain functional.
Project principle
Protect what works. Improve one phase at a time. Test the live result before moving forward.

Every piece deserves another story. 🌻

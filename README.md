# גן עדן | Gan Eden — Garden Store Demo

A bilingual (Hebrew/English) RTL gardening e-commerce site built with React + Vite.

## Quick Start

```bash
cd websites/gan-eden
cp .env.example .env          # add your Stripe key
npm install
npm run dev
```

Open http://localhost:5173

## Stripe Setup

1. Create a free account at stripe.com
2. Copy your **Publishable key** (starts with `pk_test_…`)
3. Paste it in `.env`:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

The checkout form is fully wired with `@stripe/react-stripe-js`. In demo mode (no real key) it simulates a successful payment after 1.8 seconds.

## Image Sources

Images use Unsplash URLs. To replace with nano banana MCP generated images:

1. Run the nanobanana MCP tool for each image (see prompts in comments below)
2. Save outputs to `public/images/`
3. Update `src/data.js` — change each product's `image` field to `/images/filename.jpg`
4. Update hero src in `src/components/Hero.jsx`
5. Update category images in `src/data.js` → `CATEGORIES` array
6. Update trust photo in `src/components/Trust.jsx`

### Recommended nano banana prompts

| File | Prompt |
|------|--------|
| `hero.jpg` | Lush overhead flat-lay of fresh plants, herbs, gardening tools on terracotta surface, professional photography |
| `cat-plants.jpg` | Collection of potted indoor plants, studio product photography, white background |
| `cat-seeds.jpg` | Colorful seed packets flat lay on rustic wood, overhead shot |
| `cat-tools.jpg` | Gardening tools arranged on wood — trowel, shears, fork, gloves |
| `cat-soil.jpg` | Rich dark potting soil with organic fertilizer, earthy tones |
| `cat-pots.jpg` | Variety of terracotta and ceramic plant pots, product photography |
| `trust-garden.jpg` | Hands tending plants in sunlit Mediterranean garden, warm light |
| `product-fern.jpg` | Boston fern in terracotta pot, white background, product photo |
| *(repeat for each product)* | Clean, well-lit product photo on neutral background |

## Customizing Products

Edit `src/data.js` → `PRODUCTS` array. Each product:

```js
{
  id: 1,
  nameHe: 'שם בעברית',
  nameEn: 'English Name',
  price: 49,           // in ₪
  category: 'plants',  // plants | seeds | tools | pots | soil
  isNew: true,         // shows "חדש" badge
  image: 'https://...' // URL or /images/local.jpg
}
```

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** with RTL support (`dir="rtl"` on root)
- **@stripe/react-stripe-js** + **@stripe/stripe-js**
- Google Fonts: Frank Ruhl Libre (Hebrew display) + Inter (body)
- Unsplash photos (swap for nano banana generated images)

## Features

- Bilingual RTL layout (Hebrew primary, English secondary)
- Sticky header with scroll blur
- Animated marquee strip
- Product grid with category filter + scroll-triggered fade-in
- Cart drawer with quantity controls + free delivery threshold
- Toast notification on add-to-cart
- Stripe Elements checkout with simulated success state
- Fully responsive: 375px → 1440px

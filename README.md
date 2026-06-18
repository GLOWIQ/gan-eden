# גן עדן | Gan Eden

בוטיק צמחים פרמיום — חווית עריכה בוטנית.  
A premium plant boutique — editorial brand experience.

---

## הרצת הפרויקט | How to run

```bash
cp .env.example .env          # הגדר מפתח Stripe
npm install                   # התקן תלויות
npm run dev                   # פתח בדפדפן — http://localhost:5173
```

סיסמת הדמו: `ganeden2025`

---

## מפתח Stripe | Stripe key

ב-`.env` החלף את הערך:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
```

ניתן לקבל מפתח ב-dashboard.stripe.com  
ללא מפתח — הטופס עדיין עובד במצב דמו (ללא חיוב אמיתי).

---

## הוספת מוצרים | How to add products

ערוך את `src/data.js` — מערך `products`:

```js
{
  id: 9,
  nameHe: 'שם בעברית',
  nameEn: 'English Name',
  price: 79,
  image: '/images/shop-myplant.jpg',
  tags: ['צמחי בית', 'קטנים'],
  care: 1,       // 1=קל | 2=בינוני | 3=מאתגר
  isNew: false,
  gradient: 'linear-gradient(...)',
}
```

---

## תמונות | Images

התמונות ממוקמות ב-`public/images/`. ללא תמונות, הסייט מציג גרדיאנטים בוטניים אלגנטיים.

נתיבים נדרשים: `hero.jpg`, `strip-fig/fern/elephant/cactus.jpg`,  
`editorial-monstera/pothos/zz.jpg`, `shop-*.jpg` (8 תמונות),  
`care-light/water/pot.jpg`, `gallery-1..5.jpg`.

---

## בנייה לייצור | Build for production

```bash
npm run build    # dist/ — מוצפן ומוקטן
npm run preview  # תצוגה מקדימה של ה-build
```

---

© 2025 גן עדן | Gan Eden

# StudyLab

A mobile course marketplace (Udemy-style) built with Expo + Expo Router. Students can
browse, buy, and watch video courses with progress tracking.

## Core idea

One app shell for everyone. There is no separate "guest app" and "member app" —
the same screens render for both, but:

- **Guests** can browse and shop freely (no friction).
- **Login is only required at the moment of real intent**: checkout, saving to
  wishlist, watching a paid lesson, or reviewing a course.

This keeps the funnel wide (anyone can explore the catalog) and only asks for an
account when it directly benefits the user (owning content, tracking progress).

---

## Tab bar: Guest vs Logged-in

The tab bar always has 4 slots. Slot 3 changes meaning depending on auth state —
the bar itself doesn't reshape, so login feels like an upgrade, not a different app.

| Slot | Guest | Logged-in |
|---|---|---|
| 1 | Home | Home |
| 2 | Explore | Explore |
| 3 | *(hidden / nothing)* | **My Learning** |
| 4 | Profile → shows login/signup CTA | Profile → real account screen |

Cart is **not a tab** in either state — it's a header icon (top-right, badge with
item count) visible from Home, Explore, and Course Detail. Tapping it pushes the
Cart screen as a stack, not a tab switch.

---

## What renders for a Guest (not logged in)

**Can do:**
- View Home feed (featured/recommended courses, banners, categories)
- Browse Explore / search / filter by category
- Open Course Detail — see full curriculum, instructor, reviews, price
- Watch the free preview lesson of a course
- Add courses to Cart (stored locally/session — no account needed)
- Reach the Checkout screen and see the order summary

**Cannot do (triggers login modal instead):**
- Add to Wishlist
- Complete checkout / pay
- Watch a paid (non-preview) lesson
- Leave a rating or review
- View My Learning (tab isn't shown at all)
- View real Profile (shown as a stub CTA instead)

**Guest-only screens:** Login, Signup, Forgot Password, Profile stub (CTA card).

---

## What renders for a Logged-in user

Everything a guest can do, plus:

- **My Learning** tab — grid/list of purchased courses with progress bars,
  "continue watching" section
- **Course Player** — full video playback, lesson sidebar, mark-complete,
  resume-from-last-position
- **Wishlist** — saved courses, accessible from Profile
- **Order history** — past purchases, receipts
- **Real Profile / Settings** — edit name/photo, payment methods, logout
- **Certificates** — for completed courses (since progress tracking exists)
- Cart persists to their account and merges with any items added while they
  were still a guest, at the moment they log in

---

## The gating pattern

Every action that needs an account checks auth state at the moment of the tap,
not ahead of time. If not logged in, it opens the Login screen as a modal over
the current screen (so nothing is lost), and on success, replays the original
action automatically.

Example: guest taps "Add to Wishlist" → Login modal opens → user logs in →
modal closes → item is added to wishlist automatically → user is right back
where they were.

This is implemented via a shared `gated-action` wrapper — any button that
requires auth uses it instead of a plain `onPress`, so the check-and-redirect
logic lives in one place.

---

## Screen list (reference)

**Shared (guest + logged-in):**
Home · Explore/Search · Course Detail · Cart · Checkout (redirects to login
before payment if guest)

**Guest only:**
Login · Signup · Forgot Password · Profile stub

**Logged-in only:**
My Learning · Course Player · Wishlist · Order History · Profile/Settings ·
Certificates

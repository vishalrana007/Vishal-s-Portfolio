# Dynamic Portfolio + Admin Dashboard

Production-ready personal portfolio built with:

- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion
- Firebase Auth + Firestore
- Cloudinary image upload
- Zustand state management

All public content is dynamic and controlled from the admin dashboard.

## 1) Setup

Use `pnpm` only.

```bash
pnpm install
```

Create environment file:

```bash
cp .env.example .env.local
```

Fill all values in `.env.local`.

## 2) Firebase Configuration

Create a Firebase project and enable:

- Authentication (Email/Password provider)
- Firestore Database

Set an admin email in `.env.local`:

```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

Only this email can access `/admin/dashboard`.

## 3) Cloudinary Configuration

Create an unsigned upload preset and add:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Uploads are handled by `app/api/upload/cloudinary/route.ts`.

## 4) Firestore Collections

This app reads/writes these collections:

- `hero` (doc id `content`)
- `about` (doc id `content`)
- `contacts` (doc id `content`)
- `skills`
- `projects`
- `experience`
- `messages`

## 5) Run

```bash
pnpm dev
```

- Public website: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## 6) Security Rules (example baseline)

Use admin-only writes in Firestore. Example:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == "admin@example.com";
    }

    match /messages/{docId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }

    match /{collection}/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

Update the email to your real admin email.

## 7) Build & Quality

```bash
pnpm lint
pnpm typecheck
pnpm build
```

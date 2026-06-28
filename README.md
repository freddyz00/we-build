# WeBuild

A full-stack, no-code e-commerce site builder. Users sign in, create a store, and assemble a live storefront from pre-built sections using a drag-and-drop visual editor with real-time preview — similar in concept to Shopify's site builder.

## Features

- **Drag-and-drop editor** — add, remove, and reorder page sections (header, image banner, about, featured products, image-with-text, footer).
- **Real-time WYSIWYG preview** — the storefront renders in an embedded iframe and updates instantly as you edit, via the browser `postMessage` API.
- **Dynamic store routes** — every store is published at its own slug (`/store/<storeSlug>`).
- **Product management** — create and delete products, with image uploads.
- **Authentication & authorization** — Google sign-in; only a store's owner can edit it.
- **Image hosting** — uploads are stored and served via Cloudinary.

## Tech Stack

- **Framework:** Next.js 12 (Pages Router), React 17
- **Styling:** Tailwind CSS
- **Client state:** Recoil
- **Drag & drop:** react-beautiful-dnd
- **Backend:** Next.js API routes (`pages/api/*`)
- **Data:** Sanity (headless CMS)
- **Auth:** NextAuth (Google OAuth) with the Sanity adapter
- **Images:** Cloudinary

## How It Works

A page is stored as an ordered array of **section** objects. Each section type has a matching display component (`components/sections`) and editor component (`components/editors`).

In the editor, the left control panel edits the section array (held in Recoil), while the right side embeds the live storefront in an `<iframe>`. On every change, the editor pushes the updated sections into the iframe with `postMessage`, giving instant preview. Clicking **Save** persists the array back to Sanity through the `/api/save-data` route.

## Getting Started

### Prerequisites

Accounts/projects for [Sanity](https://www.sanity.io/), [Cloudinary](https://cloudinary.com/), and a [Google OAuth](https://console.cloud.google.com/) client.

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Google OAuth (NextAuth)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
pages/            Routes and API endpoints
  api/            Serverless backend (stores, products, images, auth, save)
  store/          Storefront, admin, editor, and product pages
components/
  sections/       Section display components
  editors/        Per-section editor UIs
atoms/            Recoil state (sections, editing section, page/store ids)
lib/              Sanity client, Cloudinary config, defaults, utils
```

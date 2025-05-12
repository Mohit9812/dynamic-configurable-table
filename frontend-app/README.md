# 🧩 Dynamic Configurable Table

A fully responsive, configurable data table SPA built with React and Redux Toolkit. The table is dynamically rendered from external JSON files and supports real-time filtering, column visibility toggling, inline editing, and shareable views via URL.

---

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohit9812/dynamic-configurable-table.git
   cd dynamic-configurable-table/frontend-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🚀 Usage Guide

### 📊 Load Data and Columns
- **Table Columns**: Defined in `public/data/column-configuration.json`
- **Table Rows**: Fetched from `public/data/data.json`

### ✏️ Editable Table
- Edit cell values directly (based on column type):
  - **text**: Free text input
  - **number**: Numeric input
  - **date**: Calendar picker
  - **options**: Dropdown menu
- Edits update live in the table (session only).

### 👁️ Toggle Column Visibility
- Use the 👁️ / 👁️‍🗨️ icons to hide/show columns.
- Changes are reflected instantly and stored in the URL.

### 🔍 Filter Data
- Add multiple filters with conditions (`equals`, `contains`, etc.).
- Input field type adapts automatically (e.g., calendar for dates).
- Filters update the view in real-time.

### 🔗 Share View
- Click **"Copy Shareable Link"** to copy a URL with the current filters and visible columns.
- Pasting the link into a new tab restores that exact view.

---

## 🧠 Implementation Approach

### 🔧 Architecture
- **React (with Vite)**: Fast, modular SPA setup with hot reloading.
- **Redux Toolkit**: Manages state for table, filters, and UI preferences.
- **React Router + URL Sync**: Maintains shareable filter/column state in query params.
- **React Icons**: Clean, consistent icons for interactivity.

### 💡 Dynamic Rendering
- Table structure is entirely driven by JSON schema (`column-configuration.json`).
- Columns can be reordered, hidden, or redefined without code changes.
- Input types are dynamically assigned based on column types.

### 📐 Responsiveness
- Custom CSS for a smooth mobile and desktop layout.
- Collapse table rows into readable cards on small screens.
- Accessible components with keyboard-friendly controls.

### 🔁 Sync Logic
- All state updates (filters, visibility) are persisted into the URL.
- On page load, state is hydrated from the URL only after column/data load.
- Ensures consistent UX when sharing and reopening table views.

---

## 📁 Project Structure Overview

```
.
├── public/
│   └── data/
│       ├── column-configuration.json
│       └── data.json
├── src/
│   ├── components/
│   │   ├── Table.jsx
│   │   ├── Table.css
│   │   ├── ColumnToggler.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── ShareButton.jsx
│   │   └── Toast.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── tableSlice.js
│   ├── utils/
│   │   └── filterUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
```

## 🪛 Extra Features
- Pagination
- Export Filtered Table as Excel
# 🛡️ Raksha Hash

**Raksha Hash** is a privacy-first, decentralized digital protection platform designed to combat Non-Consensual Intimate Imagery (NCII). By leveraging client-side hashing technology, it allows victims to register "digital fingerprints" of their content without ever uploading the actual images to a server, ensuring absolute privacy and legal readiness.

---

## 🎯 Project Goals
- **Privacy First:** Images never leave the user's device. Hashing happens entirely in the browser using WebAssembly.
- **Legal Empowerment:** Automate the generation of police FIR (First Information Report) drafts with valid digital evidence.
- **Direct Reporting:** Provide a centralized hub for reporting to major platforms (Meta, Google, NCW, etc.).
- **Global & Local:** Support for multi-language (Hindi/English) and integration with both global (StopNCII.org) and Indian legal frameworks.

---

## 🏗️ Architecture & Technology Stack

### Frontend & Framework
- **Next.js 16 (App Router):** High-performance React framework for the core UI and routing.
- **Tailwind CSS 4:** Modern, utility-first CSS for a premium, responsive design.
- **WASM (WebAssembly):** Used for heavy computational tasks like image hashing.

### Core Service Modules
- **PDQ-WASM:** Implements the PDQ hashing algorithm locally in the browser. Only the 64-character hash is sent to the backend.
- **Firebase & Supabase:** Hybrid backend for secure data storage, user authentication, and real-time database needs.
- **jsPDF & html2canvas:** A custom-built engine to generate high-resolution, multi-page PDF FIR drafts.

### Internationalization
- **Next.js Context API:** Custom localization provider supporting English and Hindi (Universal Hindi/English support).

---

## 📂 Project Structure

```text
raksha-hash/
├── app/                  # Next.js App Router (Pages, API, Layouts)
│   ├── api/              # Backend API routes (Auth, Database)
│   ├── dashboard/        # User protected dashboard
│   ├── legal/            # FIR Generator & Legal Guide
│   ├── protect/          # Core Hashing/Registration logic
│   ├── saheli/           # AI Assistance / Support
│   └── verify/           # Hash verification & audit tools
├── components/           # Reusable UI components (Navbar, Buttons, Forms)
├── context/              # Global state (Language/Auth context)
├── locales/              # JSON translation files (EN/HI)
├── lib/                  # Shared library configurations (Supabase/Firebase)
├── public/               # Static assets (Images, Icons, WASM binaries)
├── supabase/             # Database migrations and seed files
└── utils/                # Helper functions and formatting tools
```

---

## 🚀 Key Features

### 1. Zero-Knowledge Protection
Users "protect" an image by generating its **PDQ Hash**. This hash is a unique digital fingerprint. Raksha Hash stores only this signature, making it impossible for the platform to see the original content, yet providing the user with a "Case ID" to prove original ownership.

### 2. Smart FIR Generator
Located in `/legal`, this tool allows victims to fill out a simple form and generate a professional FIR draft.
- **Multi-page PDF:** Automatically partitions long descriptions into multiple A4 pages.
- **Dual Language:** Switch between Hindi and English templates instantly.
- **Digital Evidence:** Automatically embeds the Raksha Hash Case ID as forensic proof.

### 3. Verification Engine
The `/verify` module allows users to re-hash an image and check if it matches a pre-existing registration. This is crucial for verifying if leaked content matches what was previously protected.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- NPM or Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/examvijeta/Raksha-Hash.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with your credentials (Firebase/Supabase/Resend).

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## ⚖️ Legal Disclaimer
Raksha Hash is a tool to assist in the documentation and reporting of NCII. It is not a law firm and does not provide legal advice. Users are encouraged to contact local law enforcement or a legal professional for specific legal actions.

---

## 🤝 Contributing
We welcome contributions that improve the security, accessibility, and utility of Raksha Hash. Please submit a PR or open an issue for major changes.

**Protect your privacy. Reclaim your digital space.**

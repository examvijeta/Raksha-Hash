# 🛡️ Raksha Hash

**Raksha Hash** is a revolutionary, privacy-first digital safeguard designed to empower victims of Non-Consensual Intimate Imagery (NCII). By combining advanced client-side hashing with automated legal assistance, Raksha Hash provides a "Digital Shield" that is both technically robust and legally actionable.

---

## 🌟 Core Purpose & Mission

The digital landscape can often feel unsafe, especially when private content is weaponized. Raksha Hash was built with a single, uncompromising mission: **To give victims their power back.**

### 1. Privacy Without Compromise
Most reporting tools require you to upload your sensitive images to a third-party server. **Raksha Hash changes that.** Using browser-based WebAssembly, we convert your image into a "Digital Fingerprint" (a 64-char PDQ Hash) directly on your device. The original image *never* leaves your tab.

### 2. Legal Readiness & Enforcement
Reporting a crime is often as Traumatic as the crime itself. We bridge the gap between "happened" and "reported" by:
- **Instant FIR Generation:** Automatically creating legally-valid police complaint drafts in Local Hindi and English.
- **Forensic Proof:** Every registration generates a unique Case ID that acts as a verifiable digital anchor for law enforcement.
- **Multi-Platform Clearing:** Providing a direct roadmap to report content to Meta, Google, TikTok, and the Government of India (CyberCrime.gov.in).

### 3. Fighting the "Permanent" Nature of the Web
Our goal is to make NCII content "un-sharable." By registering hashes, we help platforms identify and block re-uploads of protected content, effectively breaking the cycle of viral abuse.

---

## 🎯 Project Goals
- **Browser-Only Fingerprinting:** Absolute zero-knowledge architecture.
- **Empowerment Through Automation:** Reducing the friction of legal filing.
- **Cross-Border Support:** Supporting both International (StopNCII) and National (NCW/Police) frameworks.
- **Accessible Design:** A premium, calm, and supportive UI/UX for users in distress.

---

## 🏗️ Architecture & Technology Stack

### Frontend & Framework
- **Next.js 16 (App Router):** High-performance React framework for core UI.
- **Tailwind CSS 4:** Modern, utility-first CSS for a premium, responsive design.
- **WASM (WebAssembly):** Client-side execution of complex hashing algorithms.

### Core Service Modules
- **PDQ-WASM:** Implements the Photo-Perceptual hashing (PDQ) locally.
- **Firebase & Supabase:** Hybrid secure storage for hashes, Case IDs, and user metadata.
- **jsPDF & html2canvas:** Advanced PDF engine designed for multi-page, high-res legal document generation.

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
Users "protect" an image by generating its **PDQ Hash**. This hash is a unique digital fingerprint. Raksha Hash stores only this signature, making it impossible for the platform to see the original content.

### 2. Smart FIR Generator
Located in `/legal`, this tool generates a professional FIR draft.
- **Multi-page PDF:** Automatically partitions long descriptions into multiple A4 pages.
- **Dual Language:** Switch between Hindi and English templates instantly.
- **Digital Evidence:** Automatically embeds the Raksha Hash Case ID as forensic proof.

### 3. Verification Engine
The `/verify` module allows users to re-hash an image and check if it matches a pre-existing registration.

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
3. Set up environment variables in `.env.local`.
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## ⚖️ Legal Disclaimer
Raksha Hash is a tool to assist in the documentation and reporting of NCII. IT IS NOT A LAW FIRM. Always consult with legal professionals or law enforcement for official processes.

---

**Protect your privacy. Reclaim your digital space.**

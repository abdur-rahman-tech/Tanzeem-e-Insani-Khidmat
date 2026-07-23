 # 🤝 Tanzeem-e-Insani Khidmat (TIK) Shishi — Smart Welfare Platform

> **Motto:** *Service, Brotherhood, Progress (خدمت، اخوت، ترقی)*  
> A modern, AI-powered community welfare web application built for **Tanzeem-e-Insani Khidmat (TIK)**, serving the community of Shishi London, Drosh, Lower Chitral, Khyber Pakhtunkhwa, Pakistan.

---

## 🌐 Live Application & Links

* **Live Web Application:** [https://your-app-name.vercel.app](https://your-app-name.vercel.app) *(Replace with your Vercel URL)*
* **GitHub Repository:** [https://github.com/your-username/tik-shishi-welfare](https://github.com/your-username/tik-shishi-welfare)

---

## 🎯 Executive Overview

**Tanzeem-e-Insani Khidmat (TIK) Shishi** was established on **January 11, 2025**, as a non-political, non-profit welfare organization. 

This platform acts as a digital nerve center to manage rural welfare operations, facilitate community asset sharing, maintain transparent financial ledgers, and automate humanitarian appeals using Generative AI.

### Key Organizational Roles & Governance
* **Volunteer Software Developer:** Abdur Rahman *(Platform Architect & Technical Developer)*
* **Executive Leadership:**
  * **M. Sami Ul Haq** — President (صدر)
  * **Inam Ul Haq** — General Secretary (جنرل سیکرٹری)
  * **Zia Ur Rahman** — Community Fundraising Coordinator
  * **Amir Hussain** — Overseas Fundraising Coordinator
  * **Akhtar Uddin** — Overseas Fundraising Coordinator
* **General Society Members:** 28 registered community representatives.

---

## 🧩 Frontend Architecture & Main Components

The frontend is engineered as a responsive, single-page web application using **React**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. 

### Core App Interface (`src/App.tsx` & `src/components/`)

| Component | Description & Functionality |
| :--- | :--- |
| **`Header.tsx`** | Top navigation bar displaying organization branding, official address, language toggles (English/Urdu), and the developer authentication lock status. |
| **`AICoordinatorHub.tsx`** | Generative AI hub integrated with **Google AI Studio (Gemini 2.5 Flash)** to auto-generate bilingual donor campaign appeals, emergency alerts, and volunteer task rosters. |
| **`DailyActivityTracker.tsx`** | Public feed for logging, editing, and viewing daily field operations and village progress reports. |
| **`FundsAndDonorsTracker.tsx`** | Transparent financial ledger tracking donor accounts, contribution receipts, payment methods, and cause allocations. |
| **`KarakariCabinetTracker.tsx`** | Community resource management system tracking short-term borrowing and returns for shared utility equipment (large cooking cauldrons, event tents, platters). |
| **`VolunteerPortal.tsx`** | Registration, skill classification (Construction, First Aid, Logistics), and active status roster for community volunteers. |
| **`CabinetMembersTracker.tsx`** | Executive directory featuring profile cards for Cabinet Members, contact details for General Society Members, and direct device photo management. |
| **`WaterSupplyTracker.tsx`** | Tracking high-altitude gravity-fed HDPE pipeline maintenance and natural spring protection projects. |
| **`HouseConstructionTracker.tsx`** | Case registry for zero-cost housing construction and structural repairs for widows, orphans, and destitute families. |
| **`RashanDistributionTracker.tsx`** | Resource distribution tracker preventing duplicate food package allocations. |
| **`SolarCommunityTracker.tsx`** | Management for micro-solar lighting installations and public pathway improvements. |
| **`TransparencyReport.tsx`** | Public audit dashboard verifying zero administrative overhead and direct relief metrics. |
| **`AdminAuthModal.tsx`** | Security verification modal granting full administrative CRUD access to authorized developers via PIN (`7860`). |

---

## 🔒 Security & Access Control

To protect operational data while maintaining complete public transparency:
* **Public Mode (Read-Only):** Community members and donors can freely browse daily field activities, equipment availability, donor ledgers, and project statuses.
* **Developer Admin Access:** Administrative actions (Adding, Editing, Deleting) across all components are secured behind developer PIN authentication (`7860`).

---

## 🛠️ Technology Stack

* **Frontend Framework:** React (TypeScript) / Vite
* **Styling & UI:** Tailwind CSS / Lucide React Icons
* **Generative AI:** Google AI Studio — Gemini 2.5 Flash API
* **Version Control & CI/CD:** GitHub
* **Hosting Platform:** Vercel

---

## 🚀 Quick Start for Developers

1. **Clone Repository:**
   ```bash
   git clone [https://github.com/your-username/tik-shishi-welfare.git](https://github.com/your-username/tik-shishi-welfare.git)
   cd tik-shishi-welfare

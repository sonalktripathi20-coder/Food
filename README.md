# FoodConnect Bharat — Advanced Food Rescue & Redistribution Network

**Connect Food. Connect People. Reduce Waste.**

FoodConnect Bharat is a map-first, event-driven food rescue and redistribution platform tailored for Indian communities. It connects surplus food from weddings, bhandaras, restaurants, and homes with beneficiaries, volunteers, NGOs, and community kitchens.

---

## 🎬 Judge Presentation & Demo Suite

FoodConnect Bharat features a dedicated **Judge Demo Console** designed specifically for hackathon and startup pitch presentations.

### 🚀 How to Launch the Demo

1. Open `index.html` in any web browser (Double-click `index.html` or serve via `npx serve .`).
2. Click **`🎬 Start Demo`** in the top navigation bar or select **`🎬 Judge Demo Panel`** tab.
3. Click **`Execute 13-Step Demo`** to watch the automated 13-stage redistribution lifecycle execute across all roles in real time!

---

### 👥 Demo Accounts & Roles

| Role | Demo Entity Name | Purpose |
|---|---|---|
| **🙏 Beneficiary** | Demo Beneficiary (Karol Bagh) | Requests food, receives real-time delivery alerts, confirms receipt |
| **🍱 Donor** | Demo Restaurant (Jain Bhojanalaya) | Posts surplus thalis/meals, accepts requests, manages usable hours |
| **🚴 Volunteer** | Demo Volunteer (Rahul Sharma) | Accepts delivery tasks, completes physical pickup verification, streams live GPS simulation |
| **🏢 NGO** | Robin Hood Army / Akshaya Hub | Handles 5-minute unassigned fallback escalations & bulk redistribution |
| **🛡️ Admin** | System Administrator | Verifies organizations, monitors safety reports, inspects live event audit logs |

---

### 📋 13-Stage Demo Workflow Execution

```text
1. Beneficiary Requests 10 Jain Meals
    ↓
2. Donor Receives Real-Time Notification Alert
    ↓
3. Donor Accepts Request
    ↓
4. Beneficiary Confirms Match
    ↓
5. Delivery #FCB-DEMO-001 Created
    ↓
6. Volunteer Receives Delivery Task & Accepts
    ↓
7. Donor Receives "Volunteer Assigned" Update
    ↓
8. Simulated Route Started (Animated Leaflet Marker)
    ↓
9. Pickup Verification Checklist Completed
    ↓
10. Beneficiary Receives "Food Is On The Way" Alert
    ↓
11. Volunteer Arrives & Marks Delivered
    ↓
12. Beneficiary Confirms Receipt ("Yes, I Received It")
    ↓
13. SUCCESSFUL Delivery & Impact Dashboard Updated (+10 Meals Delivered)
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Leaflet.js (Map rendering & live route simulation).
- **Backend / ORM**: Node.js, Prisma ORM, PostgreSQL schema (`prisma/schema.prisma`).
- **Real-time & State**: Event-Driven Notification Engine, Delivery State Machine (15 states).
- **Logic Engines**: Smart Expiry Countdown (`lib/foodLifecycleEngine.ts`), Quantity Splitting Engine (`lib/quantitySplittingEngine.ts`), Multi-Stop Batches (`lib/deliveryBatches.ts`), Food Rescue Missions Engine (`lib/rescueMissions.ts`).

---

## 🔄 Resetting Demo State

Click **`🔄 Reset Demo`** in the top bar at any time during a presentation to restore all demo data, maps, notifications, and impact metrics to their pristine initial state.

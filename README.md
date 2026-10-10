# DeptAdvisor 🎓

DeptAdvisor is a cross-platform mobile application designed to help university students explore academic streams, requirements, and department details with ease. Built with modern mobile technologies, it features real-time cloud data synchronization and a smooth, themed user experience.

---

## 🚀 Features

* **Stream-Based Filtering:** Easily filter departments by **Natural Science** and **Social Science** streams with reactive query updates.
* **Detailed Academic Insights:** View course summaries, required GPAs, program durations, and department codes at a glance.
* **Themed UI Design:** Clean, modern interface powered by custom **Syne** typography and dynamic color themes managed via Zustand.
* **Bottom-Tab Navigation:** Seamlessly switch between Home, Departments, and Settings using Expo Router.
* **Cloud-Powered Backend:** Utilizes **Convex** for robust database schema management, queries, and real-time updates.

---

## 🛠️ Tech Stack

* **Frontend:** React Native, Expo (SDK 54), Expo Router
* **State Management:** Zustand
* **Backend & Database:** Convex
* **Styling & Icons:** StyleSheet, Expo Vector Icons (`Ionicons`)

---

## 📁 Project Structure

```text
DeptAdvisor/
└── my-app/
    ├── convex/             # Convex backend functions & schema
    │   ├── departments.ts  # Department queries & filters
    │   └── schema.ts       # Database schema definition
    ├── src/
    │   ├── app/            # Expo Router screens & layouts
    │   │   ├── (tabs)/     # Bottom-tab navigation group (Home, Depts, Settings)
    │   │   └── _layout.tsx # Root layout & providers
    │   └── store/          # Zustand state management (Theme, etc.)
    ├── package.json
    └── README.md
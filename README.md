# 🌊 ATLANTIS Scoreboard

> *"For those who defend the digital seas."*  
> A sleek, C++-powered cyber competition scoring engine inspired by the mythos of Atlantis.

**ATLANTIS Scoreboard** is a mythic, modern, and modular scoring platform built for collegiate cyber competitions, red vs. blue exercises, and CTF-style inject management. It channels the commanding energy of Poseidon to deliver real-time service checks, team uptime scoring, and inject tracking through a stunning, Greek-inspired UI.

* * *

## ⚙️ Features

- ✅ **Multi-Service Checks**  
    Score SSH, HTTP, DNS, FTP, and more with configurable checks.
    
- 🧭 **TOML-Based Config (dwayne.conf)**  
    Human-readable, clean, and extensible configuration format.
    
- 💡 **Inject System**  
    Time-based injects with file upload handling and deadlines.
    
- 📊 **SLA & Uptime Tracking**  
    Fair and real-time scoring based on service-level agreements.
    
- 🧠 **Purple Team & Persistence Support**  
    Evaluate recovery performance with offline detection and uptime weighting.
    
- 🏛️ **Greek-Themed UI**  
    Stylish, glowing Matrix + mythology aesthetic using HTML/CSS/JS.
    

* * *

## 🚀 Quick Start

### 🛠️ Build Instructions

`g++ -std=c++17 -o atlantis.exe src/main.cpp./atlantis`

> Requires: GCC or Clang, C++17 support.

* * *

## 📁 Repository Structure

`src/ # Core C++ backend`
`└── main.cpp`
`web/ # HTML/CSS/JS frontend`
`├── index.html`
`├── status.html`
`└── injects.html`
`config/ # Configuration files`
`└── dwayne.conf # Main TOML configuration`
`scripts/ # JS for dynamic content`
`└── status.js # Dynamic content updates`
`scores.json # Runtime score output`
`README.md`


* * *

## 📜 License

MIT License © 2025 Jonathan Geisler  
*“Command the currents. Defend the realm.”*
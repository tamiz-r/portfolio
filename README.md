# Tamiz R — Editorial Portfolio & Architecture System

A human-crafted, bespoke engineering portfolio designed with Swiss/Linear minimalism, anti-inspection security protocols, visitor access verification, and animated dark/light theme transitions.

Zero emojis. 100% vector, clean typography, and handcrafted Vanilla JS.

---

## Key Features & Highlights

1. **Human-Crafted Editorial UI**:
   - Replaced all neon/green matrix glowing tropes with a refined, tactile editorial palette (Crisp Paper & Deep Ink in Light Mode; Deep Obsidian Slate in Dark Mode).
   - Architectural micro-grid background texture with authentic typographic hierarchy.
2. **Animated Dark & Light Mode Transition**:
   - Circular clip-path wipe animation using the View Transitions API with seamless fallback.
   - Smooth sun/moon icon toggle with persistent `localStorage` memory.
3. **Visitor Access Gatekeeper & Telemetry**:
   - Prompts first-time visitors for their **Name** and **Email** (with optional organization).
   - Dispatches visitor telemetry directly to `rtamizh7@gmail.com` via AJAX.
   - Persists verified sessions and displays an authorized visitor badge in the navbar.
4. **Security & Anti-Inspection Shield**:
   - Right-click context menu prevention with custom security alert toast.
   - Blocks DevTools shortcut keys (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, `Ctrl+U`, `Ctrl+S`).
   - Anti-tamper console clearing and security disclaimer.
5. **Loading Micro-Animations**:
   - Top scroll progress bar tracking page depth.
   - Animated button loaders with spinning indicators on access verification and message dispatch.
   - Smooth animated counters for competitive programming metrics.
   - Scroll-triggered skill gauges.
6. **Verified Credentials & Projects**:
   - **AI Agents with MongoDB** (MongoDB Academy, ID: `MDB4pvxjoy5cf`)
   - **Learn Java by CodeChef** (CodeChef Pro, ID: `6a0817e`)
   - **6x LinkedIn Learning Credentials**
   - **1,594 Solved Problems & 1328 Rating** on CodeChef (@tamiz_r)
   - Verified project repositories: Secure Web Application & Smart Ordering Hub
   - Direct Resume download ([TAMIZ_R_Resume.pdf](TAMIZ_R_Resume.pdf))

---

## Local Run

```bash
python3 -m http.server 8000
```
Navigate to `http://localhost:8000` in any web browser.

# CINEVO: The Next-Generation Media Center

**Technical Dossier & Brand Guidelines**

## PART I: Deconstructing app.plex.tv/desktop

`app.plex.tv/desktop` is a centrally hosted Single Page Application (SPA) acting as the universal control plane for decentralized, self-hosted Plex Media Servers. It negotiates direct, secure connections between the browser and the user's local/remote servers using DNS Rebinding and dynamic SSL certificates (`*.plex.direct`).

### Core Technologies & Stack

* **Frontend Framework:** React-based, utilizing a componentized architecture for UI consistency across platforms.

* **State Management:** Redux for handling server connections, user sessions, playback status, and metadata caching.

* **Styling:** Modular CSS, adhering to a dark-mode-first aesthetic with high-contrast elements.

* **Storage:** Heavy reliance on `localStorage` and `IndexedDB` to cache server tokens and UI customizations.

### Networking & API Communication

* **X-Plex-Token:** The primary authentication header issued by central Plex infrastructure.

* **Content Negotiation:** XML by default; JSON via `Accept: application/json` headers.

* **WebSockets:** Used for real-time telemetry, pushing play state and transcoding metrics back to the server.

### Developer Hooks & Debugging

* **Built-in Log Viewer:** Accessible via Settings > General > Show Advanced > Debug, or `#!/logs` in the URL.

* **Console Telemetry:** Outputs decision engine logic (Direct Play vs. Transcode) during playback.

* **Extensibility:** Client-side modding often involves Tampermonkey scripts intercepting the `X-Plex-Token` or API interception via the Network tab.

## PART II: The CINEVO Blueprint (Architecture Rebuild)

To build a superior alternative to Plex's aging architecture, CINEVO strips away bloat (like FAST channels) and focuses on an ultra-premium, self-hosted media experience.

### Architectural Shift

| 

| **System Component** | **Plex Architecture** | **The CINEVO Standard** | 
| **Frontend Framework** | Legacy React + Redux SPA | **Next.js** (App Router) + React | 
| **Styling Engine** | Modular CSS | **Tailwind CSS** (for strict, high-contrast design tokens) | 
| **Backend & State** | Central Plex.tv DB | **Supabase** (PostgreSQL) for decentralized, rapid syncing | 
| **Authentication** | Plex.tv X-Plex-Token routing | Zero-knowledge PIN-based local auth + Supabase GoTrue | 
| **API Layer** | Custom XML/REST | TRPC or GraphQL for strict, type-safe data fetching | 

### Core Product Differentiators

1. **Decentralized Auth:** A hybrid local-first authentication model. If the WAN fails, the Next.js frontend seamlessly fails over to local IP caching.

2. **Edge-Cached Metadata:** Utilizes IndexedDB and Supabase edge functions to cache metadata locally, allowing instant scrolling of massive libraries without server database hits.

3. **Agentic Search:** An LLM-driven query engine for natural language searches (e.g., *"sci-fi movies from the 90s with practical effects"*).

4. **Transparent Telemetry:** A "Nerd Stats" overlay explicitly showing transcoding bottlenecks.

5. **Unified Client Rendering:** Scales from desktop browser to PWA and Electron/Tauri desktop apps with exact visual parity.

## PART III: CINEVO Brand & UI Guidelines

CINEVO is engineered as a luxury operating system for media. The visual language discards utility-driven clutter in favor of architectural precision, high contrast, and immersive edge-to-edge artwork.

### 1. Typography Hierarchy

* **Primary Display & Headers: Righteous**

  * *Usage:* Brand wordmarks, primary navigation nodes, marquee titles, top-level headers.

  * *Styling:* Uppercase or title case, tracked out slightly (`letter-spacing: 0.05em`).

* **Body & Metadata: Inter (or System-Native Sans)**

  * *Usage:* Plot summaries, cast lists, secondary UI text.

  * *Styling:* Strict, highly legible, utilizing varied font weights (Regular for body, Semi-Bold for labels).

* **Telemetry & Codecs: JetBrains Mono**

  * *Usage:* Technical data overlays and codec information.

### 2. Color Palette

The aesthetic is strictly dark-mode-first, allowing media artwork to define the environmental color.

| **Asset** | **Hex Code** | **Usage** | 
| **Void Black** | `#050505` | Absolute background layer. | 
| **Stark White** | `#FFFFFF` | Primary typography, active states, high-contrast icons. | 
| **Glass Slate** | `#1A1A1A` | Fallback solid color for structural modals. | 
| **Subtle Stroke** | `#FFFFFF` (8% Opacity) | Micro-borders for glass panels. | 

### 3. Glassmorphism Design Tokens

Translucent, blurred panes create depth, allowing posters and fanart to bleed through dynamically.

**Core CSS Implementation:**

```
.cinevo-glass-panel {
  /* Translucent dark base */
  background: rgba(15, 15, 15, 0.4);
  
  /* Deep blur with a saturation boost */
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  
  /* Microscopic edge highlight */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  
  /* Environmental depth */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
}

```

### 4. UI & Interaction Principles

* **Media as the Environment:** Artwork dictates the page's atmosphere, scaling edge-to-edge behind glassmorphic layers. Do not box posters in rigid, opaque cards.

* **Zero-Clutter Navigation:** Sidebar menus must remain collapsed or auto-hide.

* **Decentralized Indicators:** Network status (Local IP vs. Remote Relay) is indicated by a subtle, glowing status dot in the upper-right corner.
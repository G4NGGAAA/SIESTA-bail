<div align="center">
  <h1>✨ @G4NGGAAA/SIESTA-bail</h1>
  <p><em>Custom WhatsApp library built upon Baileys — enhanced, modernized, and elegant ✨</em></p>

  <img src="https://files.catbox.moe/pmq2tk.jpg" width="300" alt="SIESTA Bail Banner" />


  
---

  <p>
    <a href="https://www.npmjs.com/package/@g4nggaa/siesta-bail">
      <img src="https://img.shields.io/npm/v/@g4nggaa/siesta-bail?color=blueviolet&label=version&logo=npm" alt="npm version" />
    </a>
    <a href="https://www.npmjs.com/package/@g4nggaa/siesta-bail">
      <img src="https://img.shields.io/npm/dt/@g4nggaa/siesta-bail?color=blueviolet&label=downloads&logo=npm" alt="npm downloads" />
    </a>
    <a href="https://whatsapp.com/channel/0029Vb6DPnBIXnliEawZjb41">
      <img src="https://img.shields.io/badge/Join-WhatsApp%20Channel-25D366?logo=whatsapp&logoColor=white" alt="WhatsApp Channel" />
    </a>
  </p>
</div>

---

## 📌 Overview

> `SIESTA-bail` is a refined version of the Baileys library with cleaner API usage, exclusive features like album messaging, newsletter controls, and full-size profile uploads — tailored for modern WhatsApp automation needs.

> `Update`
+ Beta testing LidToJid Updates
+ fixed baileys features that can make Bot Delay
+ Periodic JID Check
+ Justification for LID ID on Whatsapp
+ Communities Support [ !NEW ]

## 📦 Installation

### Via `package.json` Fork Baileys (NPM)
@whiskeysockets/baileys
```json
"dependencies": {
  "@whiskeysockets/baileys": "github:G4NGGAAA/SIESTA-bail"
}
```
@adiwajsing/baileys
```json
"dependencies": {
  "@adiwajshing/baileys": "github:G4NGGAAA/SIESTA-bail"
}
```

Or via terminal
```bash
npm install @g4nggaa/SIESTA-bail
```

Importing (**for those who don't fork another repository**)

ESM
```bash
import makeWASocket from '@g4nggaa/SIESTA-bail'
```

CJS
```bash
const { default: makeWASocket } = require('@g4nggaa/SIESTA-bail')
```


---

## 🌟 Key Features

| Category         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| 📢 Channels       | Seamlessly send messages to WhatsApp Channels.                              |
| 🖱️ Buttons         | Create interactive messages with button options and quick replies.          |
| 🖼️ Albums          | Send grouped images or videos as an album (carousel-like format).          |
| 👤 LID Grouping    | Handle group operations using the latest @lid addressing style.             |
| 🤖 AI Message Style | Add a stylized “AI” icon to messages.                                      |
| 📷 HD Profile Pics | Upload full-size profile pictures without cropping.                        |
| 🔐 Pairing Code    | Generate custom alphanumeric pairing codes.                                |
| 🛠️ Dev Experience  | Reduced noise from logs with optimized libsignal printouts.                 |

---

## 💡 Use Case Examples

<details>
<summary><strong>📬 Newsletter Control</strong></summary>

```javascript
// Create a newsletter
await sock.newsletterCreate("SIESTA Updates");

// Change description
await sock.newsletterUpdateDescription("SIESTA@newsletter", "Fresh updates weekly");

// Send a reaction to a channel message
await sock.newsletterReactMessage("SIESTA@newsletter", "175", "🔥");
```

</details>

<details>
<summary><strong>📌 Interactive Messaging</strong></summary>

```javascript
const buttons = [
  { buttonId: 'btn1', buttonText: { displayText: 'Click Me' }, type: 1 },
  { buttonId: 'btn2', buttonText: { displayText: 'Visit Site' }, type: 1 }
];

const msg = {
  text: "Choose one:",
  footer: "From SIESTA with love 💜",
  buttons,
  headerType: 1
};

await sock.sendMessage(id, msg, { quoted: null });
```

</details>

<details>
<summary><strong>🖼️ Send Album</strong></summary>

```javascript
const media = [
  { image: { url: "https://example.com/pic1.jpg" } },
  { video: { url: "https://example.com/clip.mp4" } }
];

await sock.sendMessage(id, { album: media, caption: "Memories 💫" }, { quoted: null });
```

</details>

<details>
<summary><strong>🔐 Pairing with Custom Code</strong></summary>

```javascript
const code = await sock.requestPairingCode("62xxxxxxxxxx", "SIESTA01");
console.log("Your Pairing Code:", code);
```

</details>

<details>
<summary><strong>📊 Poll Creation</strong></summary>

```javascript
const pollMessage = {
  name: "Favorite Color?",
  values: ["Red", "Blue", "Green"],
  selectableCount: 1
};

await sock.sendMessage(id, { poll: pollMessage });
```

</details>

<details>
<summary><strong>📍 Location Sharing</strong></summary>

```javascript
const locationMessage = {
  degreesLatitude: 37.422,
  degreesLongitude: -122.084,
  name: "Googleplex",
  address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043"
};

await sock.sendMessage(id, { location: locationMessage });
```

</details>

<details>
<summary><strong>👥 Group Management</strong></summary>

```javascript
// Create group
const group = await sock.groupCreate("My New Group", [number1, number2]);

// Add participants
await sock.groupAdd(group.id, [number3, number4]);

// Change group description
await sock.groupUpdateDescription(group.id, "This is our awesome group!");
```

</details>

---

**Note:** Replace `id` with the actual recipient ID and `sock` with your WhatsApp socket connection variable.

 ---
 
## 🐞 Found a Bug?

Please open an issue at  [ *UNCOMING WEBSITE* ]
Or contact the maintainer directly via WhatsApp:

<p align="center">
  <a href="https://wa.me/6285855962331" target="_blank">
    <img alt="WhatsApp" src="https://img.shields.io/badge/Chat%20on%20WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white">
  </a>
</p>

---

<details>
  <summary>🙏 <strong>TQTO (Thanks To)</strong></summary>

Terima kasih kepada pihak-pihak yang telah memberikan dukungan, inspirasi, dan kontribusi secara langsung maupun tidak langsung dalam pengembangan proyek ini:

- **Allah SWT**  
  For all His grace and ease.

- **Parent**  
  For your continued love, prayers, and support.

- **[Nstar-Y / Nstar-bail](https://github.com/Nstar-Y)**  
  As an initial foundation and reference in the development of this system.

- **[G4NGGAAA](https://github.com/G4NGGAAA)** (Me)  
  The main developer of this project.

</details>

> [!CAUTION]
> Built on top of the WhiskeySockets/Baileys project. All original core logic credits go to their team. SIESTA-bail extends it with thoughtful UX and DX improvements.

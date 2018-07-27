Ryans Lazy Wikipedia parser
---

Runs on http://localhost:4400/

Installation
---

  npm install

(if your machine NODE_ENV is set to production, you might need to `npm install only=dev` as well)


Running
---

  npm start


Tests
---

  npm test


How to enable descriptions
---
  Disabled by default because it makes everything slow as hell.
  Goto `server/config.js` and set the enableDescriptions flag to true.

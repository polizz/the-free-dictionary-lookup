# The-free-dictionary-lookup

## What
This is a simple addon that I wrote years ago. It allows one to simply highlight and open a tab that queries TheFreeDictionary.com for quick word lookups. TheFreeDictionary.com is *free*, **fast** and noticeably absent of annoying ads, unlike many others.

## Why
I wanted to update it to the latest web extensions standard to support multiple browsers and move away from the Mozilla LUA-based extensions of yore. I also wanted to use the latest Javascript features and some build automation.

### To install

```npm install```

### To do a dev build and not build the publish packages

```npm run dev```

### To debug

Chrome allows loading unpacked extensions (the output of the dev build script above) by navigating to chrome://extensions/ and clicking **Load unpacked extension**.

Similarly, Mozilla Firefox (Quantum) allows one to install unpacked extensions by navigating to about:addons and clicking the gear icon and clicking **Install...** and then **Debug...**.

### To build all packages for publishing

```npm run build```

### Publishing

If you choose to fork this project as a base, consider that it is currently setup to not utilize web-ext to publish directly to Mozilla (web-ext is a Mozilla utility and would not publish to Chrome anyway). The current assumption is that the extension is manually uploaded to the Chrome or Mozilla web stores.

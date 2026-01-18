# Yaad 💐

A long time ago, I had created this app just to make someone feel special on their day. Back then, I wanted every detail, the animations, the confetti, the music, and the messages to be perfect so someone could smile, feel remembered, and know how much someone mattered to me.

## 🎨 How to Customize the App

All personal content is separated from the code, so no programming knowledge is required for most changes.

### 1. Change All Texts & Messages

Edit this single file: **`src/data/appContent.json`**

```json
{
  "welcome": {
    "title": "Happy Birthday",
    "name": "Yeju",
    "subtitle": "Sending you a soft virtual hug on your special day. You are so loved!",
    "buttonText": "Continue"
  },

  "splash": {
    "title": "For Yeju",
    "subtitle": "OPENING GIFT..."
  },

  "home": {
    "dateBadge": "POUSH 9TH",
    "greeting": "Happy Birthday,",
    "name": "Yeju!",
    "imageBadge": "Creating memories",
    "noteTitle": "A little note for you",
    "noteLines": [
      "Dear Yeju, may this special day bring you closer to your dreams, fill your heart with joy, and surround you with the warmth of love.",
      "You deserve all the beautiful moments coming your way. Thank you for being such a bright, kind soul in my life."
    ],
    "noteFooter": "Sent with Love",
    "noteSignature": "Always."
  }
}
```

### 2. Customize Carousel Quotes

Edit the quotes that appear over photos in the Memories tab: **`src/data/slideData.json`**

```json
{
  "slides": [
    { "text": "Hope your day is as bright as your smile." },
    { "text": "Wishing you joy, laughter, and all the love around you." },
    { "text": "You make life sweeter just by being you." }
    // Add, remove, or edit as many as you like
  ]
}
```

Add or rewrite quotes to perfectly match your feelings.

### 3. Replace Images

#### Main App Screens (Single Images)

Place your chosen photos in **`src/assets/images/`** and keep the same filenames:

- `welcome-image.jpg` → Main photo on the Welcome screen
- `splash-image.jpg` → Small circular icon on the Splash screen
- `home-image.jpg` → Large memory photo on the Home screen
- `icon-image.jpg` → Icon image

#### Memories Carousel (Multiple Photos)

Add as many photos as you want to the Memories tab carousel:

Folder: **`src/assets/images/carousel/`**

Supported files:

- `c1.jpg`, `c2.jpg`, `c3.jpg`, `c4.jpg`, etc.
- Simply add more images with sequential names like `c27.jpg`, `c28.jpg`, the app will automatically include them in the carousel in order!

Tip: Mix portrait and landscape photos, they all display beautifully full-screen.

### 4. Change Background Music (Optional)

Replace the soft background track:

- Place your new music file (preferably MP3 format) in `src/assets/audio/`
- Update the filename/path in `src/utils/backgroundMusic.ts` if needed

### 5. Test & Share Your Creation

After customizing:

```bash
npx expo start
```

Scan the QR code with the Expo Go app on your phone to preview.

#### When ready to gift:

- Build using Expo EAS (eas build --platform android or ios)
- Share the APK (Android) or TestFlight link (iOS)

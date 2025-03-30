# AniMobile 🦁

A React Native mobile application for wildlife enthusiasts to track, share, and learn about wildlife sightings.

## Features 🌟

- **Wildlife Tracking**: Log and manage wildlife sightings with location data
- **Interactive Map**: View wildlife sightings on an interactive map (mobile only)
- **Wildlife Guide**: Access comprehensive safety guides for various wildlife
- **User Profiles**: Track your sightings, badges, and states visited
- **Social Features**: Connect with other wildlife enthusiasts

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (for testing)
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/dchunawala/AniMobile.git
cd AniMobile
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npx expo start
```

4. View the app:
- Scan the QR code with Expo Go (iOS/Android)
- Press 'w' to view in web browser (limited functionality)

### Common Issues & Solutions

1. **Dependency Conflicts**
```bash
npm ERR! ERESOLVE unable to resolve dependency tree
```
Solution:
```bash
npm install --legacy-peer-deps
# or
npm install --force
```

2. **Metro Bundler Issues**
```bash
Error: Metro Bundler process exited with code 1
```
Solution:
```bash
npm start -- --reset-cache
# or
expo start -c
```

3. **Missing Expo Modules**
Solution:
```bash
npx expo install expo-camera expo-location react-native-safe-area-context @react-navigation/native @react-navigation/bottom-tabs
```

4. **Android Build Issues**
If you encounter Android build issues:
```bash
cd android
./gradlew clean
cd ..
npx expo start --clear
```

5. **iOS Build Issues**
For iOS build issues:
```bash
cd ios
pod install
cd ..
npx expo start --clear
```

### Environment Setup

1. **Node.js Setup**
- Download from: https://nodejs.org/
- Verify installation: `node --version`

2. **Expo CLI Setup**
```bash
npm install -g expo-cli
expo --version
```

3. **Mobile Development Tools**
- iOS: Install Xcode (Mac only)
- Android: Install Android Studio & SDK

4. **Environment Variables**
Create a .env file in the root directory:
```
EXPO_PUBLIC_API_URL=https://your.url.com
```

## Development Guidelines 📝

### Code Structure
```
AniMobile/
├── assets/
│   └── images/
├── screens/
│   ├── AuthScreen.tsx
│   ├── GuideScreen.tsx
│   ├── MapScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SightingsScreen.tsx
└── App.tsx
```

### Best Practices
- Use TypeScript for type safety
- Follow React Native performance guidelines
- Test on both iOS and Android
- Use Expo's built-in components when possible

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Building for Production
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## Support & Resources 📚

- Official Expo Docs: https://docs.expo.dev/
- React Native Docs: https://reactnative.dev/

## Contributing 🤝

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request


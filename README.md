# MealShare - Food Donation App

MealShare is a mobile application that connects restaurants and donors with people in need, allowing for the donation of meals to those who need them most.

## Features

- **Dual Roles**: Users can switch between donor and recipient roles
- **Restaurant Integration**: Restaurants can register, manage menu items, and run donation campaigns
- **Map-Based Interface**: Find nearby restaurants and available meals on a map
- **Points System**: Earn points for donations that can be redeemed for rewards
- **Multilingual Support**: Available in English, Japanese, Chinese, and Spanish
- **Admin Dashboard**: Comprehensive analytics and management tools

## Tech Stack

- React Native with Expo
- Zustand for state management
- Expo Router for navigation
- AsyncStorage for local data persistence
- Internationalization with custom translation system

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mealshare.git
cd mealshare
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on a device or emulator:
```bash
# For iOS
npm run ios
# For Android
npm run android
# For web
npm run web
```

## Project Structure

```
mealshare/
├── app/                  # Expo Router app directory
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main tab screens
│   ├── restaurant/       # Restaurant details screens
│   ├── meal/             # Meal details screens
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry point
├── components/           # Reusable components
├── constants/            # App constants
├── hooks/                # Custom hooks
├── mocks/                # Mock data
├── store/                # Zustand stores
├── styles/               # Global styles
├── translations/         # Translation files
└── types/                # TypeScript type definitions
```

## Multilingual Support

The app supports the following languages:
- English (en)
- Japanese (jp)
- Chinese (zh)
- Spanish (es)

Language detection is automatic based on device settings, but users can manually switch languages in the app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
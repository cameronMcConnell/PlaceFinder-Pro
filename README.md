# PlaceFinder-Pro

## Overview

This mobile application, developed using React Native and Expo, offers seamless integration with the Google Places API for conducting nearby searches of various location types. Utilizing Expo's location services, the app provides personalized experiences based on the user's current geographical coordinates. Users can adjust search radius and measurement units within the app's settings, with all preferences persistently saved in the device's cache.

## Features

- **React Native and Expo**: Developed using React Native framework along with Expo, ensuring cross-platform compatibility for iOS and Android devices.
  
- **Google Places API Integration**: Utilizes the Google Places API to conduct nearby searches for all valid location types supported by the API, providing users with a diverse range of places to explore.
  
- **Expo Location Services**: Fetches the user's current geographical coordinates using Expo's location services, enabling personalized features based on their location.
  
- **Adjustable Search Radius**: Allows users to customize the search radius/range within the app's settings, providing flexibility in defining the scope of nearby searches.
  
- **Measurement Unit Conversion**: Provides the option to switch between miles and kilometers for distance measurement, with the UI automatically calculating and displaying the correct conversion.
  
- **Persistent Settings**: All user preferences, including search radius, measurement units, and other settings, are persistently saved in the mobile device's cache for convenience and seamless user experience.
  
- **Sorted Locations by Distance**: Locations for a specific type are sorted in increasing distance from the user, utilizing the Haversine Formula for accurate distance calculations.

## Getting Started

To run the app locally on your development environment, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/cameronMcConnell/PlaceFinder-Pro.git
```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

```bash
npm install
```

```bash
yarn install
```

3. **Set up Google Places API Key**: Obtain a valid API key from Google Cloud Platform for Google Places API and replace the placeholder `API_KEY` in the project code with your actual API key.

4. **Run the App**: Start the Expo development server by running the following command:

```bash
npx expo start
```

5. **Scan QR Code**: Use your mobile device to scan the QR code displayed in the Expo DevTools interface or use an emulator to launch the app.

6. **Explore the App**: Once the app is running, you can explore nearby locations based on your current location and preferences, and customize settings as desired.

## Demo Video

https://github.com/cameronMcConnell/PlaceFinder-Pro/assets/93450810/e01ada3d-808b-4dd0-b694-35a84f488130

## Dependencies

- React Native
- Expo
- Google Places API

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Setup expo

Follow this [link](https://docs.expo.dev/get-started/set-up-your-environment/)

## Install PNPM

This project use pnpm as a package manager you can follow their doc to install [here](https://pnpm.io/installation)

## Run the project

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Generate native modules

   ```bash
   pnpm expo prebuild
   ```

3. Start the app

   ```bash
    pnpm expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Running test

```bash
 pnpm run test
```

## CocktailDB

Link to the [cocktailDB](https://www.thecocktaildb.com/api.php) api documentation 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Screenshots and screen recording

| Home screen                                                  | Recipe detail                              |
| ------------------------------------------------------------ | ------------------------------------------ |
| ![Home screen with list of cocktail](./docs/Home_screen.png) | ![Recipe detail](./docs/Detail_screen.png) |

| Add to favorites                                     | Remove from favorites                                      |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| ![Add to favorites gif](./docs/Add_to_favorites.gif) | ![Remove from favorites](./docs/Remove_from_favorites.gif) |

## Setup expo

Follow this [link](https://docs.expo.dev/get-started/set-up-your-environment/)

## Install PNPM

This project use pnpm as a package manager you can follow their doc to install [here](https://pnpm.io/installation)

## Run the project

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Generate native modules (android/ios folders)

   ```bash
   pnpm expo prebuild
   ```

3. Start the app

   ```bash
    pnpm expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)
- [iOS simulator](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Running unit test

```bash
 pnpm run test
```

## Running e2e test

- First install [maestro](https://maestro.mobile.dev/getting-started/installing-maestro) (tested with version 1.39.7)

- Have an instance of an iPhone simulator or android emulator running with the app installed else run :

```bash
maestro start-device --platform android
```

or

```bash
maestro start-device --platform ios
```

- then run:

```bash
 pnpm run e2e
```

## CocktailDB

Link to the [cocktailDB](https://www.thecocktaildb.com/api.php) api documentation

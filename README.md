# Aglouglou

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Screenshots and screen recording

| Home screen                                                  | Recipe detail                              |
| ------------------------------------------------------------ | ------------------------------------------ |
| ![Home screen with list of cocktail](./docs/Home_screen.png) | ![Recipe detail](./docs/Detail_screen.png) |

| Add to favorites                                     | Remove from favorites                                      |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| ![Add to favorites gif](./docs/Add_to_favorites.gif) | ![Remove from favorites](./docs/Remove_from_favorites.gif) |

# Getting started

## Setup your environment

[Setup for mac](./docs//setup/MAC_SETUP.md)

[Setup for windows](./docs/setup/WINDOWS_SETUP.md)

[Setup for linux](./docs/setup/LINUX_SETUP.md)

## Run the project

1. Install dependencies

```bash
   pnpm i
```

2. Generate native modules (android/ios folders)

```bash
   pnpm prebuild
```

3. Start the app on respective OS locally

```bash
    pnpm android|ios
```

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Running unit test

```bash
 pnpm test
```

## Running e2e test

- First install [maestro](https://maestro.mobile.dev/getting-started/installing-maestro) (tested with version 1.39.7)

- Have an instance of an iPhone simulator or android emulator running with the app installed then run :

```bash
maestro start-device --platform android
```

or

```bash
maestro start-device --platform ios
```

- then run:

```bash
 pnpm e2e
```

# Development workflow

## Adding module

```bash
pnpm i $(package_name)
```

## Updating component UI

Update test snapshot with:

```bash
pnpm test-update
```

## Targeting element for e2e test

You can get element id using:

```bash
maestro studio
```

## Build app

with eas:

```bash
pnpm build-android|ios
```

without eas (android only):

```bash
cd android && ./gradlew assembleRelease
```

## CocktailDB

Link to the [cocktailDB](https://www.thecocktaildb.com/api.php) API documentation

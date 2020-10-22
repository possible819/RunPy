# RunPy

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Python runner

# Scripts for running application

```sh
# Build render process via webpack with watch on it & launch electron
$ yarn start

# Clean dist directory
$ yarn clean

# Build render process sources via webpack for production env
$ yarn build

# Build render process sources via webpack for development env
$ yarn build:dev
```

# Scripts for pacakging application

```sh
# Packaging for MacOS
$ yarn packaging:mac

# Packaging for Windows
$ yarn packaging:win

# Packaging for Linux
$ yarn packaging:linux

# Clean up packages directory
$ yarn packaging:clean
```

> Above scripts will generate each pacakges under ./packages

# Scripts for creating installer

```sh
# Creating installer for MacOS
$ yarn installer:dmg

# Creating installer for Windows
$ yarn installer:win

# Creating installer for Debian
$ yarn installer:debian
```

> Above scripts will generate each installers under ./installers

# Authors

**Jay Lee <jaylee.possible@gmail.com> [:house:](https://possible819.github.io)**

**Gincheong <gincheong2@gmail.com> [:house:](https://gincheong.github.io)**

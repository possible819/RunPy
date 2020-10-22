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

> Above scripts will generate each pacakges under ./packages

# Scripts for creating installer via electron-forge

```sh
$ yarn make
```

> The script will generate an installer based on platform of running this script. Electron-forge will detect what current running platform is.

# Configure packaging

```json
{
  ...
  "config": {
    "forge": {
      "packagerConfig": {
        "asar": true
      },
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-dmg",
          "config": {
            "format": "ULFO"
          }
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        }
      ]
    }
  },
  ...
}
```

By editing config block inside of `package.json`, you can customize packaging configuration.

`pacakgeConfig` is block to customize `electron-package` step all the options are passed to `electron-package` task. (FYI out (distribution path) can't be overriden cause electron-forge is specifying the path inner side of sources)

# Authors

**Jay Lee <jaylee.possible@gmail.com> [:house:](https://possible819.github.io)**

**Gincheong <gincheong2@gmail.com> [:house:](https://gincheong.github.io)**

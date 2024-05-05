# fnirsi-wav-viewer

This is an web application for viewing oscilloscope files models FNIRSI1013D, FNIRSI1014D.
See https://igor-kor.github.io/Fnirsi-Wav-Viewer/

![simple](other\simple.bmp)

Credits to Robert Tidey who decoded the 1013D .wav file format:
https://github.com/roberttidey/FNISR1013DScope

## Environment
This app developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

push subtree for github pages
```sh
git subtree push --prefix dist origin gh-pages
```

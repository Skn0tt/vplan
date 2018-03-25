/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "3025a9e8c564ee1b7da23c815a1bc13e.js",
    revision: "598ce216e6e8a5255389022e802c45c2"
  },
  {
    url: "ba5772886b00a23dc4ac554e574de3fe.js",
    revision: "30499f5d51a997f0eb56bf1d9d1b4df2"
  },
  {
    url: "c102b87e39ede1f518e1a970356c50ef.js",
    revision: "fd62018f56ea48e86cf261ed274aecde"
  },
  {
    url: "d178e6d00600173a9449dcaecef0d07b.js",
    revision: "d76d84f257658f4841feb700188e70f5"
  },
  {
    url: "eed4cdda1039ebdc8b351fa53ce1b67a.js",
    revision: "02c51e61da36066a6d4d998f0e2c8fac"
  },
  {
    url: "f217af92f918eb3b5aecdcd2de3fdc4f.js",
    revision: "3f6ff6ca073e97dc5b526db8382a5320"
  },
  {
    url: "fc02a21bcceb6638e694cb5122f0debb.js",
    revision: "25c20044941b2aaeef2b187f9ce58a69"
  },
  {
    url: "index.html",
    revision: "06735e0f11bd916832d3291f463271ca"
  },
  {
    url: "service-worker.js",
    revision: "584a68e50dc9e1ce5ac1c56f7a5dac50"
  },
  {
    url: "vplan-ui.html",
    revision: "716904734c232cd08419bb0b26539fa9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

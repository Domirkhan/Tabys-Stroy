/**
 * Copyright 2018 Google Inc.
 * All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (!self.define) {
  let registry = {};
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      new Promise(resolve => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = { module: { uri }, exports, require };
    registry[uri] = Promise.all(depsNames.map(depName => specialDeps[depName] || require(depName)))
      .then(deps => {
        factory(...deps);
        return exports;
      });
  };
}

define(['./workbox-54d0af47'], (function (workbox) { 'use strict';

  // Принудительное обновление сервис-воркера
  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * Кэширование и маршрутизация
   */
  workbox.precacheAndRoute([
    {
      "url": "index.html",
      "revision": "0.kpa6ohkukto" // Убедитесь, что revision обновляется при каждой сборке
    },
    {
      "url": "main.js",
      "revision": "1" // Добавьте сюда все важные файлы
    },
    {
      "url": "style.css",
      "revision": "1"
    }
  ]);

  // Удаление устаревших кэшей
  workbox.cleanupOutdatedCaches();

  // Обработка навигации
  workbox.registerRoute(
    new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"))
  );

}));
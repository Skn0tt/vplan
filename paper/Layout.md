---
title: "Layout vPlan"
output: pdf_document
---

> Besondere Lernleistung, Simon Knott, Ernst-Moritz-Arndt-Gymnasium 2018

# Einleitung

## Problem

* Vertretungsplan muss an Schüler ausgeliefert werden
* Untis (Stundenplantool) ist
  * nicht schön
  * nicht für Pausenhalle geeignet
  * nicht mobilfähig
  * &rarr; Keine gute UX

## Lösungsansatz

* Webservice zur Auslieferung des Untis-Exports in schön
* Clients:
  * App
    * Push-Benachrichtigungen
    * iOS, Android
  * Website
    * Pausenhalle
    * Lehrer
    * Schüler
    * Admin
* Screenshots vom fertigen Produkt

# Hauptteil

## Architektur

* Stateless
  * siehe Facharbeit
* API / Client bzw. Server-Viewer

## Tools

### Javascript / Typescript

* Wieso ist JS das richtige Tool?
* Cross-Platform (Browser, App, Server)
* Geschichte JS

#### Betrachtung: Dynamische Typisierung gut/schlecht?

* gut:
  * kleinere bundles
  * rapid development
* schlecht:
  * hohe fehleranfälligkeit
  * slow development
  * schlechtes tooling
* Typescript als Retter

#### Betrachtung: JS everywhere

* Gut nutzbar ja / nein?
* Gut:
  * Massives Ökosystem
  * Super Tooling (Babel, TSC, Closure, Prepack)
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen
* Schlecht:
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen

#### Betrachtung: Functional Javascript

* Was geht gut?
  * Array functions (seit ES6)
  * First-Class Functions
* Was fehlt?
  * Typisierung
  * Funktionale Typen (Mondas, Monoids, Applicatives etc...)

### Docker

* Was ist Docker?
  * Vergleich zu VMs
  * IBM-Studie?
* Was bringt Docker?
  * Unified Environment (Dev, Test, Deploy)
* Ausblick Cluster (Kubernetes):
  * Rolling Deployments
  * High Avalability

### React

* React

  * DOM Diffing
  * Redux
  * Component-based

* React Native
  * React on mobile
  * Dynamically Transpiled? Precompiled? what is it? TODO: find out!

### Misc

* Monorepo

  * Lerna
  * Yarn
  * Code sharing

* CI

  * Gitlab
  * Advantages:
    * CI, CD

* TDD / BDD:
  * Anwendung parser
  * Snapshot testing
  * Beispiel TDD

## Umsetzung / Beispiele

* Parser

  * Explain Functional approaches (clean up code beforehand)

* UI

  * Explain Component Structure (Types, Helpers, Component, Component Lifecycle)

* App
  * Explain antoher Component Structure (Types, Helpers, Component, Component Lifecycle)
  * Show that it's little difference to web react (div vs View etc)

| RN    | RCT       |
| ----- | --------- |
| div   | View      |
| input | TextInput |

* Redux

  * Show Reducer flow with example (e.g. "entries")

* API
  * Redis
  * Express (Explain routes)

# Schluss

* Gutes projekt
* Schönes beispiel für simple web-apps

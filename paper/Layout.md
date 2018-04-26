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

> 1 Seite

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
  > 1 Seite

# Hauptteil

## Architektur

* Stateless
  * siehe Facharbeit
* API / Client bzw. Server-Viewer

> 2 Seiten

## Tools

### Javascript / Typescript

* Wieso ist JS das richtige Tool?
* Cross-Platform (Browser, App, Server)
* Geschichte JS

> 1 Seite

#### Betrachtung: Dynamische Typisierung gut/schlecht?

* gut:
  * kleinere bundles
  * rapid development
* schlecht:
  * hohe fehleranfälligkeit
  * slow development
  * schlechtes tooling
* Typescript als Retter
* Kurze Einführung in Typescript

> 2 Seiten

#### Betrachtung: JS everywhere

* Gut nutzbar ja / nein?
* Gut:
  * Massives Ökosystem
  * Super Tooling (Babel, TSC, Closure, Prepack)
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen
* Schlecht:
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen

> 1.5 Seiten

#### Betrachtung: Functional Javascript

* Was geht gut?
  * Array functions (seit ES6)
  * First-Class Functions
* Was fehlt?
  * Typisierung
  * Funktionale Typen (Mondas, Monoids, Applicatives etc...)
* Beispiele (Vergleich Imperativ / Funktional)

> 2 Seiten

### Docker

* Was ist Docker?
  * Vergleich zu VMs
  * IBM-Studie?
* Was bringt Docker?
  * Unified Environment (Dev, Test, Deploy)
* Ausblick Cluster (Kubernetes):
  * Rolling Deployments
  * High Avalability

> 1 Seite

### React

* React

  * DOM Diffing
  * Component-based
  * Code-Beispiel
    > 1 Seite

* Redux

  * Code-Beispiel
    > 1 Seite

* React Native
  * React on mobile
  * Dynamically Transpiled? Precompiled? what is it? TODO: find out!
  * Code-Beispiel
    > 1 Seite

### Misc

* Monorepo

  * Lerna
  * Yarn
  * Code sharing

> 1 Seite

* CI

  * Gitlab
  * Advantages:
    * CI, CD

> 1 Seite

* TDD / BDD:
  * Anwendung parser
  * Snapshot testing
  * Beispiel TDD

> 1 Seite

## Umsetzung / Beispiele

* Parser
  * Explain Functional approaches (clean up code beforehand)

> 2 Seiten

* UI
  * Explain Component Structure (Types, Helpers, Component, Component Lifecycle)

> 2 Seiten

* App
  * Explain antoher Component Structure (Types, Helpers, Component, Component Lifecycle)
  * Show that it's little difference to web react (div vs View etc)

| RN    | RCT       |
| ----- | --------- |
| div   | View      |
| input | TextInput |

* Push-Notifications (Problem: min 15 minutes, "Pull"-Notification)

> 2 Seiten

* Redux
  * Show Reducer flow with example (e.g. "entries")

> 1 Seite

* API
  * Redis
  * Express (Explain routes)

> 2 Seiten

# Schluss

* Gutes projekt
* Schönes beispiel für simple web-apps

> 2 Seiten

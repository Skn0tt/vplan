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
* Anforderungen:
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
* Kurzer Einstieg in JS-Syntax

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

#### Betrachtung: JS everywhere

* Gut nutzbar ja / nein?
* Gut:
  * Massives Ökosystem
  * Super Tooling (Babel, TSC, Closure, Prepack)
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen
* Schlecht:
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen
* Beispiel:
  * Shared Code (`vplan-types`, `vplan-util`) in vPlan

#### Betrachtung: Functional Javascript

* Was geht gut?
  * First-Class Functions
* Was fehlt?
  * Typisierung
  * Funktionale Typen (Mondas, Monoids, Applicatives etc...)
  * Immutability (Immutable.js)
* allgemeine Beispiele (Vergleich Imperativ / Funktional)
* Beispiele:
  * `vplan-parser`
  * `entries.filter(isFutureEntry)`

### Docker

* Was ist Docker?
  * Vergleich zu VMs
  * IBM-Studie?
* Was bringt Docker?
  * Unified Environment (Dev, Test, Deploy)
* Beispiel:
  * Dockerfiles vPlan
  * Docker-Compose-File vPlan
* Ausblick Cluster (Kubernetes):
  * Rolling Deployments
  * High Avalability
    * Diagram der Nodes!
  * Managed Kubernetes

### React

* React

  * DOM Diffing
  * Component-based
  * Explain Component Structure (Types, Helpers, Component, Component Lifecycle)
  * Code-Beispiel
  * Beispiel:
    * 1 UI-Component von `vplan-ui`

* Redux

  * Konzept
  * Probleme, die Redux lösen möchte
  * Probleme, die Redux schafft
  * Show Reducer flow with example (e.g. "entries")

* React Native
  * React on mobile
  * Dynamically Transpiled? Precompiled? what is it? TODO: find out!
  * Show that it's little difference to web react (div vs View etc)

| RN    | RCT       |
| ----- | --------- |
| div   | View      |
| input | TextInput |

* Code-Beispiel
  * 1 UI-Component von `vplan-app`
* Push-Notifications (Problem: min 15 minutes, "Pull"-Notification)
  * Eventual Problem: Too much traffic
    * Possible Solution: Dynamic poll scaling by varying poll interval on serverside, clients syncing to that
    * Needs central coordinator (complex)

### API

* Redis
* Express (Explain routes)
* Multer

### Tooling

* OpenAPI

  * Workflow: Design &rarr; Implement
  * Stub Generators exist

* Monorepo

  * Einstieg
    * Monorepo vs Multirepo
    * Vorteile / Nachteile
    * Prominente Beispiele (Wer nutzt was? (google, facebook: Monorepo, netflix: multirepo (?)))
  * Lerna, Yarn
  * Code sharing
  * Beispiel: Struktur vPlan

* CI, CD

  * Einstieg
    * Automatisiert Workflow
    * Erleichtert Arbeit
  * vplan: Gitlab
  * Beispiel:
    * .gitlab-ci.yml
    * Screenshot Pipelines

* TDD / BDD:
  * Einstieg:
    * Was ist TDD?
    * Wie sieht der entwicklungszyklus aus? (Write tests &rarr; See tests fail &rarr; write code to pass tests &rarr; refactor)
  * Anwendung parser
  * Snapshot testing
  * Beispiel TDD
  * Beispiel:
    * TDD in `vplan-parser`

# Schluss

* Gutes projekt
* Schönes beispiel für simple web-apps

---
title: "Layout vPlan"
output: pdf_document
---

> Besondere Lernleistung, Simon Knott, Ernst-Moritz-Arndt-Gymnasium 2018

# Einleitung

## Problemstellung (2 Seiten)

* Vertretungsplan muss an Schüler ausgeliefert werden
* Untis (Stundenplantool) ist
  * nicht schön
  * nicht für Pausenhalle geeignet
  * nicht mobilfähig
  * &rarr; Keine gute UX

## Lösungsansatz (2 Seiten)

* Webservice zur Auslieferung des Untis-Exports "in schön"
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

### Typescript (2 Seiten)

* Gesamtes Projekt wurde in Typescript geschrieben
* Kurzer Einstieg in Typescript-Syntax

# Hauptteil

## Architektur (2 Seiten)

* Stateless
  * siehe Facharbeit
* API / Client bzw. Server-Viewer

## Implementierung

### Parser
- Problem: HTML --> JSON (0.5 Seiten)
- Erläuterung des Codes (1.5 Seiten)

### API
- Express (4 Seiten)
  - Was ist Express? (Einführung in Middlewares) (1 Seite)
  - Beispiele aus Code (zB Setup, `PUT /entries`, `GET /entries`) (2 Seiten)
  - Redis
  - Verwendung von Umgebungsvariablen als Konfiguration

### Website
- React (6 Seiten)
  - Was ist React? (Einführung in Components, State & Props, Component Lifecycle, DOM-Diffing, JSX) (2 Seiten)
  - Beispiele aus Code (zB einzelne Routen) (4 Seiten)

- Redux (4 Seiten)
  - Was ist Redux? (State-Management, Standard Actions, One-Way-Dataflow, Pure Reducers) (2 Seiten)
  - Wie geht man mit Async-Code um? (Redux-Saga, Iterators) (1 Seite)
  - Beispiels aus Code (zB Anfrage der Einträge)

- Hosting (1 Seiten)
  - Nginx, Docker
  - Runtime Config (über `/config.js` oder Cookie)

### App
- React Native (4 Seiten)
  - Wie unterscheidet sich React Native von React? (Keine DOM, Nativer Code, JS-Runtime) (1 Seite)
  - Beispiele aus Code (Home-Screen, Push-Notifications) (3 Seiten)

## JS everywhere
* Gut nutzbar ja / nein?
* Gut: (3 Seiten)
  * Massives Ökosystem (1/2 Seiten)
  * Super Tooling (Babel, TSC, Closure, Prepack; inkl kurzer Vorstellung) (1.5 Seite)
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen (Beispiele) (1 Seite)
* Schlecht:
  * Sprache lässt viel Freiraum, ermöglicht viele Paradigmen
* Beispiel:
  * Shared Code (`vplan-types`, `vplan-util`) in vPlan

## Functional Javascript

* Was geht gut? (2 Seiten)
  * First-Class Functions, Higher-Order-Functions, Function Composition
* Was fehlt? (2 Seiten)
  * Typisierung
  * Funktionale Typen (Mondas, Monoids, Applicatives etc...)
  * Immutability (ergänzt durch zB Immutable.js)
* allgemeine Beispiele (Vergleich Imperativ / Funktional) (2 Seiten)

## Tooling

* Docker (3 Seiten)
  * Was ist Docker?
    * Vergleich zu VMs
    * IBM-Studie?
  * Was bringt Docker?
    * Unified Environment (Dev, Test, Deploy)
  * Beispiele aus Code:
    * Dockerfiles vPlan
    * Docker-Compose-File vPlan
    * Beispiel: Struktur vPlan

* CI, CD (2 Seiten)
  * Einstieg
    * Automatisiert Workflow
    * Erleichtert Arbeit
  * vplan: Gitlab
  * Beispiel:
    * .gitlab-ci.yml
    * Screenshot Pipelines

* TDD / BDD: (3 Seiten)
  * Einstieg:
    * Was ist TDD?
    * Wie sieht der entwicklungszyklus aus? (Write tests &rarr; See tests fail &rarr; write code to pass tests &rarr; refactor)
  * Anwendung parser
  * Snapshot testing
  * Beispiel TDD
  * Beispiel:
    * TDD in `vplan-parser`

# Schluss (1 Seite)

* Gutes projekt
* Schönes beispiel für simple web-apps mit Backend

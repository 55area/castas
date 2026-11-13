# PRODUCT

## Purpose and users

Castas presents an informational 40-question affective-polarization test to people who want to reflect on emotional and social attitudes toward opposing political groups. The Android app should reproduce the behaviors and content of the Castas web project while using native Android screens.

## Canonical requirements

Behavioral requirements are maintained in [the OpenSpec capability](../openspec/specs/affective-polarization-test/spec.md). This file does not duplicate that contract.

## Evidence and scope

Reference evidence: `../web/src/`, `artifacts/wireframes/`, and `artifacts/documents/`, inspected 2026-11-07. The app includes the home, test, result, about, political fanatic, terms, and privacy experiences; PT-BR, English, and Spanish.

## Decision note

The web About wireframe, Likert document, and executable scoring function now agree on 3/2/1/0. The Android About screen derives its labels from its scoring function. Existing Android scores use the same scale.

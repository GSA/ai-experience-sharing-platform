---
title: Clause Recommendations for Contracts
date: 2020-07-15T17:44:54.634Z
participant: David Gill
techniques:
  - Recommendation
  - Personalization
  - Classification Modeling
benefits:
  - Decrease Cycle Time
  - Increase Accuracy
  - Increase Compliance
  - ""
tags:
  - In Production
  - IRS
  - Contract Classification
featured: false
---
Contract clauses implement many critical contracting policies in areas such as security, background investigations, invoice payment, and tax compliance. Inserting clauses with traditional contract writing information systems is time consuming because users must manually select each clause that is applicable to a solicitation or contract. Due to difficultly identifying all clauses applicable to a specific acquisition - many contracts were being awarded with legal drafting errors.

## Data

The traits of an acquisition are extracted from a user-uploaded solicitation or contract document. The traits of a specific contract action (e.g. staff-like access, funding agency, etc.) and logic from the Federal Acquisition Regulations. The user receives a report with recommended clause language corrections. Clause statistics for each document are aggregated into an interactive dashboard displaying policy compliance across the organization.

## Tools and Technology

FedRAMP certified cloud infrastructure enabled the small business vendor to rapidly deploy a web application for a modest cost. Employees could simply upload solicitation or contract documents to the web application and receive instant clause recommendations. Since deployment in 2017, over 26,000 clause errors have been identified and corrected.

The acquisition trait classification models work as follows. Components are designed as a configurable algorithms. Classification algorithms are customized for each agency or component. An entry contains the name of the rule, an unlimited, variable-length list of highly customized regular expressions (regexes) for finding relevant text in the document, and a minimum threshold of unique matches to be met before the classification is deemed true.

## Lessons Learned

Use technology that can be rapidly deployed in your agency's IT environment.

Provide a simple, intuitive user experience.

Use data-driven marketing to maximize usage.

## Specifications

Business Function - Contract Classification

Production Status - In production

Agency - Internal Revenue Service

POC Name - David Gill

POC Email - David.I.Gill@irs.gov

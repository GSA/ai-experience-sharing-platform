---
title: Misconduct Identification
date: 2020-07-21T17:43:14.076Z
featured: false
---
Better understand and identify trading-based market misconduct, specifically insider trading. ARTEMIS aims to identify serial cheaters while ATLAS evaluates the data for first-time offenders.

## Data Approach

Data collected from submitted forms, manual generation of “bluesheet” (aggregated data) and database of all previous “bluesheets”.

## Tools and Technology

1. Identification of suspected offenders. Use of NLP tool (bag of words) to analyze submitted 8-K forms to classify documents according to significance of an event, language changes in the disclosures, scheduled/unscheduled earnings announcements and events not related to earnings. Output = labeled data (continued below).
2. Supervised learning model: identify trigger events and market changes that may warrant investigation. 
3. Human examiner reviews the results--supports basis for investigation.

## Lessons Learned

Getting enough labeled data to train a supervised learning model is a challenge.

A model doesn’t just solve the problem. There are many steps, some human and some automated that are continuously and iteratively trained and refined to make achieve the desired outcome.

Once a model is trained and deployed, there is still a heavy burden both technically and in terms of human capital to monitor, evaluate and maintain the model to ensure that it is operating as intended and continues to provide valuable and meaningful output and insight.

## Specifications

Business Function - Pattern Classification

Production Status - In Pilot

Agency - Securities and Exchange Commission

POC Name - ACUS: Government by Algorithm: Artificial Intelligence in Federal Administrative Agencies

POC Email - krista.kinnard@gsa.gov
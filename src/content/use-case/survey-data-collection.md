---
title: Survey Data Collection
date: 2020-07-15T17:27:12.799Z
participant: Brandon Kopp
patterns:
  - Intelligent Automation
  - Text Classification
  - Text Recognition
solutions:
  - Decrease Cycle Time
  - Increase Accuracy
  - Increase Outputs
  - New Service Capability
tags:
  - In Design
  - DOL
  - Survey Processing
featured: false
---
## Data

The data that will be used is Summary of Benefits and Coverage (SBC) documents in PDF format along with tabular data of the contents of those documents collected through the National Compensation Survey. Currently, in exploratory research, we are using publically available SBC documents and tabular data downloaded from data.healthcare.gov. Data management, at this point, consists of folder storage on a shared drive.

## Tools and Technology

The purpose of this project is to automate the extraction and classification of items from Summary of Benefits and Coverage PDF documents relevant to data collection in the National Compensation Survey. We are exploring a number of technical approaches, including rule-based classification systems and simple, explainable machine learning models like Logistic Regression for labeling more complicated items. All work thus far has been done on laptops in Python, using the scikit-learn package.

## Specifications

Business Function - Survey Processing

Production Status - In design

Agency - Department of Labor, Bureau of Labor Statistics / Office of Survey Methods Research

POC Name - Brandon Kopp

POC Email - kopp.brandon@bls.gov
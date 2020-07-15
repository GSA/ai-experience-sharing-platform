---
title: Emerging Safety Data Processing
date: 2020-07-15T17:57:38.321Z
participant: ACUS
patterns:
  - Text Mining
  - Neuro-Linguistic Programming
solutions:
  - Decrease Cycle Time
  - Increase Outputs
  - Improve Customer Service
  - Increase Compliance
tags:
  - In Pilot
  - FDA
  - Reports Data Processing
featured: false
---
FDA is piloting of AI/ML techniques to identify emerging safety concerns in reports made to its Federal Adverse Event Reporting System (FAERS). Because preapproval studies cannot identify all possible side effects or problems with a drug or therapeutic biological product, the FDA maintains a system of postmarket surveillance and risk assessment centered on analysis of a growing pool of data about adverse events and medication error reports.

## Data Approach

The Federal Adverse Event Reporting System (FAERS) database contains “adverse event reports, medication error reports and product quality complaints resulting in adverse events that were submitted to FDA.” Given the sheer volume of data contained in FAERS, and the varied types of data—both structured and unstructured—the FDA has sought more efficient ways to extract and use this information.

## Tools and Technology

FDA did a number of experiments. 1) Use of NLP (text mining and topic modeling) to model relationships between drugs and a single medical condition, hepatic (i.e., liver) failure. 2) Use of text-based rules, decision trees using text clustering inputs, and a simple neural network to predict serious drug related adverse outcomes. 3) Use of structured features and expert derived terms from unstructured text to predict these ground truth labels. Then trained various supervised models (RF & SVM).

## Lessons Learned

Data limitations (including the nature of the data and reporting on a negative outcome) can make it difficult to uncover a causal relationship.

NLP algorithms are continually improving. However, as NLP technology currently stands, without some expert input, it may not be well-suited to critical tasks in which inaccurate predictions could have severe life-or-death consequences. NLP’s shortcomings are almost certain to be magnified in an environment where the text is both unstructured and highly technical and where precision and expertise are at an absolute premium. Ultimately, the models did not generate outputs accurate enough for deployment.

## Specifications

Business Function - Reports Data Processing

Production Status - In Pilot

Agency - Food and Drug Administration

POC Name - ACUS: Government by Algorithm: Artificial Intelligence in Federal Administrative Agencies

POC Email - krista.kinnard@gsa.gov
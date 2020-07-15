---
title: Patent and Trademark Categorization
date: 2020-07-15T19:12:05.007Z
participant: ACUS
patterns:
  - Pattern Detection
  - Anomaly Detection
  - Predictive Analytics
  - Decision Making
solutions:
  - Decrease Cycle Time
  - Increase Accuracy
  - Increase Outputs
  - Improve Customer Service
tags:
  - SEC
  - In Production
  - Pattern Classification
featured: false
---
The United States Patent and Trademark Office (USPTO) employs 8,185 patent examiners and 579 trademark attorneys in 2018. The USPTO has a substantive backlog receiving 100’s of thousands of patent and trademark applications annually with an average turnaround time for patents from receipt to first action of 15.8 months (more the .4 months greater than target). In 2018, The Patent and Trademark Office received 643,349 patent files and 638,847 trademark filings in 2018.

## Data

There are different types of data used in the USPTO models. The models all use applicants data that can be in unstructured and structured data as well as images and terms. For the patents and trademarks, USPTO uses classification codes to identify categories of patents and trademarks based on specifications, claims and drawing. The deep learning models use visual depictions as inputs and search through databases of historical images compares the images to generate a list of similar images.

## Tools and Technology

For the classification (CPC codes), USPTO uses “human-in-the-loop” supervised machine learning process using uses images of trademarks as inputs with an output of applicable design codes. The deep learning image classifier uses Google’s Tensorflow framework including a neural network that applies several transformations to an image generating a dense image vector which are useful for identifying design codes. The unsupervised models use deep learning to output a list of visually similar images.

## Lessons Learned

Deep learning tools could potentially improve patent classification. Deep learning models can be used to classify each claim separately and then tag the application using the most confidently identified codes.

Neural Networks could improve efficiency and quality of search. They learn dense vectors for words appearing in large collections of documents including words in similar context enabling faster and more efficient searches and relevancy.

Issues surfaced with trademarks and images have included class imbalance, duplicates, and text identification. Marks may not easily fall into a single category making proper identification by machine learning difficult.

## Specifications

Business Function - Pattern Category Classification

Production Status - In Production

Agency - Securities and Exchange Commission

POC Name - ACUS: Government by Algorithm: Artificial Intelligence in Federal Administrative Agencies

POC Email - krista.kinnard@gsa.gov
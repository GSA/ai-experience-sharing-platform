---
title: Injury Survey Processing
date: 2020-07-21T17:42:30.645Z
featured: false
---
## Data Approach

The data consists of hundreds of thousands of written narratives describing work related injuries and illnesses in the U.S. These narratives are copied from OSHA record keeping logs and contain text fields describing: job title, what the worker was doing, what happened, what was injured, and what was the object or substance that caused the injury. Each of these is assigned 6 codes indicating various characteristics of the incident. The data is stored in an Oracle database.

## Tools and Technology

The current technical solution is a deep neural network with character-level convolutions, followed by a bidirectional LSTM with separate attention layers in 6 output modules, one for each coding task. The solution is implemented in tensorflow keras and trained using an NVIDIA Titxan X Pascal GPU. During inference the model is run on a large server with dozens of cores and more than 100 GB of RAM. Source code is available at [Github](https://github.com/USDepartmentofLabor/soii_neural_autocoder). 

## Specifications

Business Function - Survey Processing

Production Status - In production

Agency - Department of Labor, Bureau of Labor Statistics

POC Name - Alex Measure

POC Email - measure.alex@bls.gov
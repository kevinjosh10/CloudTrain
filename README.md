# 🔥 CloudTrain Studio

<p align="center">
  <em>Personal Serverless MLOps Platform for Training, Governing, Versioning, Monitoring, and Serving Machine Learning Models.</em>
</p>

<p align="center">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/kevinjosh10/CloudTrain/deploy.yml?style=for-the-badge">
  <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img alt="Python" src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
</p>

---

## 🌟 Overview

**CloudTrain Studio** is an end-to-end, serverless Machine Learning Operations (MLOps) platform built entirely on the AWS Free Tier. It provides a beautiful, self-service dashboard to manage machine learning projects, trigger automated training pipelines, enforce model governance, and serve real-time predictions.

This project was built from the ground up to demonstrate production-grade **Cloud Engineering**, **Event-Driven Architecture**, and **Modern Full-Stack Development**.

### Interview Pitch
> "CloudTrain Studio is a personal serverless MLOps platform that allows me to create machine learning projects, upload datasets, automatically train models through event-driven AWS infrastructure, compare performance before promotion, track model history in Firebase, handle failures through SQS DLQs, and serve predictions through low-latency serverless APIs. The platform includes a modern React frontend, GitHub Actions CI/CD, observability, governance, and production-style architecture while remaining free-tier friendly."

## ✨ Features

- **Event-Driven Training Pipeline**: Uploading a CSV to S3 automatically triggers a serverless ML training pipeline using AWS Lambda and Scikit-Learn.
- **Model Governance Engine**: Automatically evaluates new models against the current production version. Promotes the model only if accuracy/R2 improves.
- **Serverless Inference API**: Blazing fast `/predict` REST API powered by API Gateway and Lambda, utilizing execution context caching to eliminate cold-start latency on repeated calls.
- **Dead Letter Queue (DLQ)**: Robust error handling using Amazon SQS to capture failed training runs, bad data, or timeouts.
- **Modern React Dashboard**: A dark-mode first, glassmorphic UI built with Vite, React, Tailwind CSS v4, and Framer Motion.
- **CI/CD Automation**: Fully automated deployment to AWS and GitHub Pages via GitHub Actions.

## 🏗️ Architecture

The platform architecture follows best practices for scalable, serverless microservices:

1. **Frontend**: React (Vite) hosted on GitHub Pages.
2. **API Gateway**: REST API for serving predictions.
3. **AWS Lambda (Inference)**: Caches models in memory and returns real-time predictions.
4. **AWS Lambda (Training)**: Triggered by S3. Cleans data, trains models (Random Forest, Logistic Regression, etc.), and uploads artifacts.
5. **Amazon S3**: Stores raw CSV datasets and compiled `.joblib` models.
6. **Amazon SQS (DLQ)**: Captures any failed events from the Training Lambda.
7. **Firebase Firestore**: Stores project metadata, training run history, metrics, and inference logs.

## 🚀 Deployment

The infrastructure is defined using **AWS Serverless Application Model (SAM)**.

1. Configure the following GitHub Secrets in your repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `FIREBASE_SERVICE_ACCOUNT` (JSON string)
2. Push your code to the `main` branch.
3. GitHub Actions will automatically:
   - Build and deploy the AWS SAM stack.
   - Build and deploy the React frontend to GitHub Pages.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, React Router.
- **Backend**: Python 3.12, Scikit-Learn, Pandas, Boto3, Pydantic, Firebase Admin.
- **AWS**: Lambda, API Gateway, S3, SQS, CloudWatch, IAM, SAM.
- **Database**: Firebase Firestore.

## 📈 Future Roadmap
- Model Drift Detection
- A/B Testing for deployed models
- Support for larger datasets via AWS Step Functions

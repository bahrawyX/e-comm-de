# =====================
# Project and GCP Services
# =====================

# Get the current GCP project data
data "google_project" "project" {}

# Enable required Google Cloud APIs
resource "google_project_service" "services" {
  for_each = toset([
    "run.googleapis.com",                 # Cloud Run
    "artifactregistry.googleapis.com",    # Artifact Registry for container images
    "apigateway.googleapis.com",          # API Gateway
    "servicemanagement.googleapis.com",   # Service Management (required for API Gateway)
    "servicecontrol.googleapis.com",      # Service Control (required for API Gateway)
    "cloudbuild.googleapis.com",          # Cloud Build for CI/CD
    "iam.googleapis.com",                 # Identity and Access Management
    "cloudresourcemanager.googleapis.com", # Resource Manager
    "compute.googleapis.com",             # Compute Engine (for networking)
    "firebase.googleapis.com",            # Firebase
    "firebaserules.googleapis.com",       # Firebase Rules
    "firebasehosting.googleapis.com",     # Firebase Hosting
    "identitytoolkit.googleapis.com",     # Firebase Auth / Identity Toolkit
    "vpcaccess.googleapis.com",           # VPC Access (for Cloud Run to VPC connectivity)
    "servicenetworking.googleapis.com",   # Service Networking (for private Cloud SQL)
    "sqladmin.googleapis.com",            # Cloud SQL Admin API
  ])
  project                    = var.project_id
  service                    = each.key
  disable_on_destroy         = false
  disable_dependent_services = false
}
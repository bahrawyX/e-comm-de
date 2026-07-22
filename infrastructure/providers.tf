terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 6.11.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = ">= 6.11.0"
    }
  }


  backend "gcs" {
    bucket = "nse-gcp-ema-tt-575be-sbx-1-state-bucket"
    #TODO: Update prefix with team name
    prefix = 
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

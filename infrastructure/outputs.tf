output "cloud_run_url" {
  description = "URL of the Cloud Run backend service (use this with /api suffix for backend_url variable in second deployment)"
  value       = google_cloud_run_v2_service.backend.uri
}

output "api_gateway_default_hostname" {
  description = "Default hostname of the API Gateway"
  value       = google_api_gateway_gateway.gateway.default_hostname
}

output "firebase_site_id" {
  description = "Firebase Hosting site ID"
  value       = google_firebase_hosting_site.site.site_id
}

output "firebase_web_app_id" {
  description = "Firebase Web App ID"
  value       = google_firebase_web_app.frontend.app_id
}

output "artifact_registry_repository" {
  description = "Artifact Registry repository ID"
  value       = google_artifact_registry_repository.docker_repo.repository_id
}

output "cloud_run_service_name" {
  description = "Cloud Run service name"
  value       = google_cloud_run_v2_service.backend.name
}

output "gcp_region" {
  description = "GCP region"
  value       = var.region
}

output "gcp_project_id" {
  description = "GCP project ID"
  value       = var.project_id
}
# =====================
# Firebase Resources
# =====================

# Random suffix for Firebase Hosting site ID to ensure uniqueness
resource "random_string" "site_suffix" {
  length  = 5
  lower   = true
  upper   = false
  numeric = true
  special = false
}

# Initialize Firebase for the project
resource "google_firebase_project" "firebase" {
  provider   = google-beta
  project    = var.project_id
  depends_on = [google_project_service.services]
}

# Firebase Hosting site (deployment handled via CI)
resource "google_firebase_hosting_site" "site" {
  provider   = google-beta
  project    = var.project_id
  site_id    = "${var.team_name}-${random_string.site_suffix.result}"
  depends_on = [google_firebase_project.firebase]
}

# Firebase Web App for frontend (used for Firebase Auth / Google Sign-In configuration)
resource "google_firebase_web_app" "frontend" {
  provider     = google-beta
  project      = var.project_id
  display_name = "${var.team_name} - Frontend Web App"
  depends_on   = [google_firebase_project.firebase]
}

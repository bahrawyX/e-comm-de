# =====================
# Service Accounts
# =====================

# Service account for Cloud Run execution
resource "google_service_account" "run_exec" {
  account_id   = "${var.team_name}-crun-exec"
  display_name = "${var.team_name} - Cloud Run Runtime"
}

# =====================
# IAM Permissions
# =====================

# Grant Cloud Run service account permission to write logs
resource "google_project_iam_member" "run_sa_logs" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.run_exec.email}"
}

# Grant Cloud Run service account permission to write metrics
resource "google_project_iam_member" "run_sa_metric" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.run_exec.email}"
}

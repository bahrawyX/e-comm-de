# =====================
# API Gateway
# =====================

# API Gateway API definition
resource "google_api_gateway_api" "api" {
  provider   = google-beta
  api_id     = "${var.team_name}-${var.api_gateway_id}"
  depends_on = [google_project_service.services]
}

# Get identity token for authenticating to Cloud Run using the API Gateway caller SA
data "google_service_account_id_token" "oidc" {
  target_audience        = google_cloud_run_v2_service.backend.uri
  target_service_account = var.api_service_account_email
  delegates              = []
}

# Fetch the auto-generated OpenAPI spec from the running backend
data "http" "openapi_spec" {
  url   = "${google_cloud_run_v2_service.backend.uri}/api/openapi.json"

  request_headers = {
    Accept        = "application/json"
    Authorization = "Bearer ${data.google_service_account_id_token.oidc.id_token}"
  }

  depends_on = [
    google_cloud_run_v2_service.backend
  ]
}

# API Gateway configuration using the auto-generated spec
resource "google_api_gateway_api_config" "config" {
  provider      = google-beta
  api           = google_api_gateway_api.api.api_id
  api_config_id = var.api_config_version

  openapi_documents {
    document {
      path     = "openapi.json"
      # Use the backend-generated spec directly
      contents = base64encode(data.http.openapi_spec.response_body)
    }
  }

  depends_on = [
    google_project_service.services,
    google_cloud_run_v2_service.backend,
    data.http.openapi_spec,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway endpoint
resource "google_api_gateway_gateway" "gateway" {
  provider   = google-beta
  gateway_id = "${var.team_name}-${var.api_gateway_id}"
  api_config = google_api_gateway_api_config.config.id
  region     = var.region
}

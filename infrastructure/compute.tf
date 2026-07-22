# =====================
# Cloud Run Service
# =====================

# Cloud Run (Gen2) backend service
resource "google_cloud_run_v2_service" "backend" {
  name                = "${var.team_name}-${var.run_service_name}"
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    service_account = google_service_account.run_exec.email

    # Attach Serverless VPC Access connector to reach Cloud SQL via private IP
    vpc_access {
      egress = "PRIVATE_RANGES_ONLY"
      network_interfaces {
        network    = google_compute_network.vpc.id
        subnetwork = google_compute_subnetwork.subnet.id
      }
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.repository_id}/${var.run_service_name}:${var.run_image_tag}"
      ports {
        container_port = 8080
      }

      # Inject DB env vars and API Gateway configuration
      dynamic "env" {
        for_each = merge(
          var.run_env,
          {
            SPRING_DATASOURCE_URL                 = "jdbc:postgresql://${google_sql_database_instance.db.private_ip_address}:5432/${var.db_name}"
            SPRING_DATASOURCE_USERNAME            = var.db_user
            SPRING_DATASOURCE_PASSWORD            = var.db_password
            "gcp.api-gateway.backend-url"         = "https://${var.team_name}-${var.run_service_name}-${data.google_project.project.number}.${var.region}.run.app"
            "gcp.api-gateway.gateway-sa"          = var.api_service_account_email
            "gcp.api-gateway.firebase-project-id" = var.project_id
          }
        )
        content {
          name  = env.key
          value = env.value
        }
      }

      resources {
        limits = {
          "cpu"    = "1"
          "memory" = "512Mi"
        }
      }
    }
    scaling {
      min_instance_count = 1
      max_instance_count = 1
    }
  }

  lifecycle {
    create_before_destroy = false
  }

  client = "terraform"
  depends_on = [
    google_project_service.services,
    google_artifact_registry_repository.docker_repo,
    null_resource.build_and_push_image
  ]
}

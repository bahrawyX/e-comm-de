# =====================
# Cloud SQL (PostgreSQL)
# =====================
# These resources are only created when Cloud SQL is enabled (var.enable_cloudsql = true)

# Cloud SQL instance with private IP
resource "google_sql_database_instance" "db" {
  name                = "${var.team_name}-${var.db_instance_name}"
  database_version    = "POSTGRES_14"
  region              = var.region
  deletion_protection = false

  settings {
    tier = var.db_tier

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc.self_link
    }
  }

  depends_on = [google_service_networking_connection.private_vpc_connection]
}

# Database within the Cloud SQL instance
resource "google_sql_database" "db" {
  name     = var.db_name
  instance = google_sql_database_instance.db.name
}

# Database user with password
resource "google_sql_user" "db_user" {
  name     = var.db_user
  instance = google_sql_database_instance.db.name
  password = var.db_password
}

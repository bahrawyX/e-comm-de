# =====================
# VPC and Networking
# =====================
# These resources are only created when Cloud SQL is enabled (var.enable_cloudsql = true)

# VPC network for private Cloud SQL connectivity
resource "google_compute_network" "vpc" {
  name                    = "${var.team_name}-${var.vpc_name}"
  auto_create_subnetworks = false
}

# Subnet for the VPC
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.team_name}-${var.subnet_name}"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.vpc.self_link
}

# Allocate an IP range for private service networking (for Cloud SQL private IP)
resource "google_compute_global_address" "private_range" {
  name          = "${var.team_name}-${var.allocated_range_name}"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.vpc.self_link
}

# Establish private service networking connection
resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_range.name]
  depends_on              = [google_project_service.services]
}

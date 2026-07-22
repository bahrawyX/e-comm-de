
variable "team_name" {
  description = "Team name for resource naming. Used to create unique resource names for different teams deploying the same infrastructure."
  type        = string
  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.team_name))
    error_message = "Team name must contain only lowercase letters, numbers, and hyphens."
  }
}

variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "Default region for resources"
  type        = string
}

variable "run_service_name" {
  description = "Cloud Run service name (will be prefixed with team name)"
  type        = string
  default     = "backend-api"
}

variable "run_env" {
  description = "Environment variables for the backend service"
  type        = map(string)
  default     = {}
}

variable "run_image_tag" {
  description = "Container image tag for Cloud Run deployment (e.g., v1, v2). Must change to trigger new deployments with updated images."
  type        = string
}

variable "api_gateway_id" {
  description = "API Gateway ID (will be prefixed with team name)"
  type        = string
  default     = "backend-gateway"
}

variable "api_config_version" {
  description = "API Gateway ApiConfig version ID (e.g., v1, v2). Must change to create a new config; enables zero-downtime switch and avoids 'config is in use' deletes."
  type        = string
  default     = "v1"
}

variable "api_service_account_email" {
  description = "Email of the service account used by API Gateway to call Cloud Run (leave empty for first deployment, then set to the caller SA email from outputs)"
  type        = string
}

variable "backend_url" {
  description = "Backend Cloud Run URL (leave empty for first deployment, then set to the backend URL from outputs)"
  type        = string
  default     = ""
}

variable "firebase_site_id" {
  description = "Firebase Hosting site ID"
  type        = string
  default     = "frontend-site"
}

# ==== Cloud SQL (always provisioned) ====

variable "vpc_name" {
  description = "Name of the VPC network (will be prefixed with team name)"
  type        = string
  default     = "aip-vpc"
}

variable "subnet_name" {
  description = "Name of the subnetwork (will be prefixed with team name)"
  type        = string
  default     = "aip-subnet"
}

variable "subnet_cidr" {
  description = "CIDR range for the subnetwork"
  type        = string
  default     = "10.10.0.0/24"
}

variable "allocated_range_name" {
  description = "Name of the allocated IP range (will be prefixed with team name)"
  type        = string
  default     = "aip-private-range"
}

variable "db_instance_name" {
  description = "Cloud SQL instance name (will be prefixed with team name)"
  type        = string
  default     = "aip-postgres"
}

variable "db_tier" {
  description = "Cloud SQL machine tier (e.g., db-f1-micro or db-custom-1-3840)"
  type        = string
  default     = "db-f1-micro"
}

variable "db_name" {
  description = "Database name to create"
  type        = string
  default     = "appdb"
}

variable "db_user" {
  description = "Database user name"
  type        = string
  default     = "appuser"
}

variable "db_password" {
  description = "Database user password"
  type        = string
  sensitive   = true
  default     = ""
}

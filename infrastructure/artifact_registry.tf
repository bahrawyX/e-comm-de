# =====================
# Artifact Registry
# =====================

# TODO: Add Terraform code to create Artifact Registry repository for Docker images
# Note: terraform resource name should be "docker_repo" but the actual artifact registry repository name can be whatever you want

# Build and push Docker image after registry is created
resource "null_resource" "build_and_push_image" {
  # Trigger rebuild when image tag changes
  triggers = {
    image_tag = var.run_image_tag
  }

  provisioner "local-exec" {
    command     = "cd ../api; docker build -t ${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.repository_id}/${var.run_service_name}:${var.run_image_tag} .; docker push ${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.repository_id}/${var.run_service_name}:${var.run_image_tag}"
    interpreter = ["sh", "-c"]
  }

  depends_on = [google_artifact_registry_repository.docker_repo]
}

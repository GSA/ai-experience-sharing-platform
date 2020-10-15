output "backend_url" {
  value = "https://${var.strapi_hostname}.${data.cloudfoundry_domain.app.name}"
}

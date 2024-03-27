packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}

source "googlecompute" "centos_packer_build" {
  project_id            = var.gcp_project_id
  source_image_family   = var.source_image_family
  ssh_username          = var.ssh_username
  zone                  = var.gcp_zone
  service_account_email = "832118508210-compute@developer.gserviceaccount.com"
  image_name            = "my-custom-image-2"
}


build {
  sources = ["googlecompute.centos_packer_build"]
  provisioner "shell" {
    scripts = [
      #      "packer/mysql_install.sh",
      "packer/node_install.sh",
      "packer/unzip_install.sh"
    ]
  }

  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    scripts = [
      "packer/unzip-service.sh"
    ]
  }

  provisioner "shell" {
    scripts = [
      "packer/ops.sh"
    ]
  }

}
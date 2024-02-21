packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}

source "googlecompute" "centos_packer_build" {
  project_id          = var.gcp_project_id
  source_image_family = var.source_image_family
  ssh_username        = var.ssh_username
  zone                = var.gcp_zone
}

build {
  sources = ["googlecompute.centos_packer_build"]
  provisioner "shell" {
    scripts = [
      "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/packer/mysql_install.sh",
      "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/packer/node_install.sh",
      "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/packer/unzip_install.sh"
    ]
  }
}
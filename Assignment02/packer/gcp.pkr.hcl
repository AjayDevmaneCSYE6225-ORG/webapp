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

// we need a file provisioner here 

build {
  sources = ["googlecompute.centos_packer_build"]
  provisioner "shell" {
    scripts = [
      "~/mysql_install.sh",
      "~/node_install.sh",
      "~/unzip_install.sh"
    ]
  }

  provisioner "file" {
    source      = "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/.env"
    destination = "/path/to/destination/on/vm.txt"
  }

  provisioner "file" {
    source      = "webapp.zip"
    destination = "/path/to/destination/on/vm.txt"
  }

  provisioner "file" {
    source      = "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/csye6225.service"
    destination = "/etc/systemd/system"
  }


}
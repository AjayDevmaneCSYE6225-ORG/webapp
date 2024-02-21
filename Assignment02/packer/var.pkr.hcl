variable "gcp_project_id" {
  type    = string
  default = "csye6225-414121"
}

variable "gcp_zone" {
  type    = string
  default = "us-central1-a"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "source_image_family" {
  type    = string
  default = "centos-stream-8"
}

variable "credential_file" {
  type    = string
  default = "/Users/ajaysubashdevmane/CSYE6225/Assignments/webapp-FORK/Assignment02/packer/csye6225-414121-a73e9b99acb6.json"
}
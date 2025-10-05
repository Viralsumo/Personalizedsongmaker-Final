#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# The following command was for the initial setup. It is now commented out
# to prevent wiping the database on every new deployment.
# flask init-db
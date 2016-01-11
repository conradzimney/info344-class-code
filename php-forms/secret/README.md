# Secrets Directory

Use this directory for files containing things that should not be added to your repository (credentials, secret keys, etc.).

The `.gitignore` file in the project root will exclude everything in this directory except files ending in `.md` or `.template`. This allows you to include explanatory markdown files (like this one), and templates for configuration files. 

## Database Credentials

Copy the `db-credentials.php.template` to `db-credentials.php` and fill out the various values for your local database instance. The PHP app will include `secret/db-credentials.php` to get these values at runtime.

# Config Templates

This directory contains safe configuration examples for EX-EL deployments.

## Rules
- Never commit real credentials.
- Copy these files outside version control for real deployments.
- Use the Maven `-Denv=` build flow documented in `docs/DEPLOYMENT_HARDENING.md`.
- Treat any historical credentials that appeared in tracked files as compromised and rotate them.

## Suggested mapping
- `local-config.properties.example` -> developer workstation
- create separate non-tracked files for staging and production
- inject secrets during CI/CD or deployment

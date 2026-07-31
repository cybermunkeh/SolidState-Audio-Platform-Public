# Business and OEM Plan

## Product positioning

SolidState Audio Platform is a raw PCM transport layer for OEMs that need
networked audio without codec latency, DSP coloration, or hidden sample
conversion. The product value is trustworthy bit-perfect transport,
embeddable firmware, receiver reference software, diagnostics, and integration
support.

## Target customers

- Hi-fi manufacturers adding network audio to existing products.
- Pro-audio hardware vendors needing low-latency local PCM transport.
- Embedded Linux device makers needing an ESP32-S3 USB Audio bridge.
- Industrial or installation-audio vendors that value deterministic diagnostics
  over consumer streaming features.

## Initial offer

- Firmware reference for ESP32-S3 USB Audio to UDP PCM.
- Linux/Raspberry Pi receiver reference implementation.
- Protocol specification and compatibility policy.
- OEM integration guide.
- Evaluation kit with reproducible bit-perfect test procedure.

## Differentiators

- Raw PCM only by design.
- No resampling, DSP, or volume manipulation in the transport core.
- Transparent metadata and diagnostics.
- Small embedded footprint.
- Clear OEM integration boundary instead of a closed consumer stack.

## Commercial questions to resolve

- License model: per-unit royalty, source license, support subscription, or
  hybrid.
- Support tiers: evaluation, integration, production, long-term maintenance.
- Certification needs: Wi-Fi, USB, EMC, customer-specific audio validation.
- Hardware scope: firmware-only, reference board, or full module.
- Protocol openness: public spec, partner spec, or dual-track model.

## Business risks

- Wi-Fi reliability expectations may exceed what best-effort UDP can guarantee
  without receiver buffering and feedback.
- ESP32-S3 USB bandwidth and CPU limits may cap high-rate product claims.
- OEMs may require 192 kHz or multichannel before the platform is validated for
  those profiles.
- A raw PCM product competes on trust and evidence, so missing test reports
  directly weaken sales credibility.

## Near-term business assets

- One-page technical brief: [Product brief](PRODUCT_BRIEF.md).
- Evaluation kit checklist.
- Integration architecture diagram.
- Test evidence template.
- Pilot customer questionnaire.
- Public-safe GitHub release package: [publish/public-safe-release/README.md](../publish/public-safe-release/README.md).
- Public-safe export script: [publish/public-safe-release/export-public-safe.ps1](../publish/public-safe-release/export-public-safe.ps1).
- Public disclosure policy: [docs/PUBLIC_DISCLOSURE_POLICY.md](PUBLIC_DISCLOSURE_POLICY.md).
- Public-safe GitHub Actions workflow: [/.github/workflows/public-safe-export.yml](../.github/workflows/public-safe-export.yml).
- GitHub publication guide: [docs/GITHUB_PUBLICATION_GUIDE.md](GITHUB_PUBLICATION_GUIDE.md).
- Contributing guide and PR template for public-safe collaboration.
- Changelog for public GitHub readiness: [CHANGELOG.md](../CHANGELOG.md).
- GitHub issue templates for public-safe feedback and feature requests.
- Security policy for public-safe reporting: [SECURITY.md](../SECURITY.md).
- Code of conduct for public collaboration: [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).

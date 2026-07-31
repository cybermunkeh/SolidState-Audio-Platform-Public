# Public Release Log

This log summarizes public-facing changes that are safe to show without exposing
the transport core.

## 2026-06-30

- Added a public disclosure policy with public, partner-only, and private
  tiers.
- Added a public release boundary that defines the export slice.
- Added a public repository index for the public GitHub cut.
- Added a public release checklist for the export and publish flow.
- Added a public GitHub QA note for post-export verification.
- Added a public release map that groups the public docs by purpose.
- Added a public GitHub section to the website for visitor navigation.
- Added a public-safe release package and exporter for the public slice.
- Added an evaluation bundle as the quickest public start for evaluators.
- Added a short public signal-chain result snapshot for the verified ESP-to-LP10 proof.
- Added a filled release evidence example that mirrors the verified proof data.
- Added a release evidence index to centralize the proof trail for releases.
- Added a compact website evidence trail for the public release docs.
- Added a quick evaluation path in the README and public-safe package.
- Added a first recorded Linux reference evidence page for the built and
  executed reference tools.
- Added Linux reference evidence links to the public website and public
  navigation pages.
- Added an ALSA mirror-path validation note for the Linux reference tools.
- Refreshed the public evaluation and status docs so the public cut matches the
  current verification posture.
- Added an explicit 192 kHz preference check to the packet-flow simulation and
  reflected that coverage in the public evaluation bundle.
- Surfaced the public repository index directly in the website hero so the
  public GitHub entry point is visible immediately.
- Added a public-safe export workflow check for the website hero and public
  repository index entry point.
- Added a reusable public-safe export verifier script for local and CI checks.
- Added the reusable verifier to the public release map for easier discovery.
- Exported the public-safe package README and file lists alongside the verifier.
- Linked the public repository index directly to the public-safe package file lists.
- Added a GitHub publish-readiness helper that reports branch and remote setup.
- Added the publish-readiness helper to the public release map and checklist.
- Added a GitHub publish-target helper that binds the current branch to a remote.
- Added an explicit publish example and remote URL validation for the setup helper.
- Made the publish-readiness helper fail closed when no Git remote exists.
- Added a short GitHub publish handoff page that collects the remaining steps.
- Added the branch push step to the publication guide, checklist, and handoff.
- Made the publish-target helper handle first-time branch publication cleanly.
- Added placeholder URL validation to the publish-target helper.
- Clarified that the publish-target helper supports a first push on a new remote branch.
- Added a single publish orchestrator that chains readiness, export, verification, and optional push.

## Rule

Do not add implementation internals, packet layout details, or private tools to
this log.

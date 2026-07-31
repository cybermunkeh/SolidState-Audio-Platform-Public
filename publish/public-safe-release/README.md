# Public-Safe GitHub Release Package

This package is a publication boundary for a public GitHub repository or a
public-facing branch. It intentionally contains only positioning, evidence,
roadmap, and evaluation material that can be shown without exposing the core
transport implementation.

For the formal visibility tiers and the recommended public/private split, see
`docs/PUBLIC_DISCLOSURE_POLICY.md`, `docs/PUBLIC_RELEASE_BOUNDARY.md`, and
`docs/PUBLIC_REPO_INDEX.md`.

## Safe to publish

- `README.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `publish/public-safe-release/README.md`
- `publish/public-safe-release/PUBLIC_FILE_LIST.md`
- `publish/public-safe-release/PUBLIC_FILE_LIST.txt`
- `/.github/workflows/public-safe-export.yml`
- `/.github/PULL_REQUEST_TEMPLATE.md`
- `/.github/ISSUE_TEMPLATE/bug_report.yml`
- `/.github/ISSUE_TEMPLATE/feature_request.yml`
- `/.github/ISSUE_TEMPLATE/config.yml`
- `docs/PRODUCT_BRIEF.md`
- `docs/BUSINESS.md`
- `docs/ROADMAP.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/TEST_STRATEGY.md`
- `docs/PUBLIC_REPO_INDEX.md`
- `docs/PUBLIC_RELEASE_CHECKLIST.md`
- `docs/PUBLIC_GITHUB_QA.md`
- `docs/PUBLIC_RELEASE_LOG.md`
- `docs/PUBLIC_RELEASE_MAP.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/RELEASE_EVIDENCE_TEMPLATE.md`
- `docs/RELEASE_EVIDENCE_INDEX.md`
- `docs/RELEASE_EVIDENCE_EXAMPLE.md`
- `docs/ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md`
- `docs/ESP_TO_LP10_SIGNALCHAIN_RESULT.md`
- `docs/LINUX_REFERENCE_EVIDENCE.md`
- `docs/PUBLIC_DISCLOSURE_POLICY.md`
- `docs/PUBLIC_RELEASE_BOUNDARY.md`
- `docs/GITHUB_PUBLICATION_GUIDE.md`
- `verify-public-safe-export.ps1`
- `website/`

## Keep private

- `main/`
- `components/`
- `examples/linux/`
- protocol serializers and packetizer internals
- test fixtures that reveal transport structure or exact packet layout
- release notes that disclose customer-specific integration details

## Suggested GitHub structure

1. Publish the documentation and website first.
2. Keep the implementation repository private.
3. Link the public site back to evaluation and contact paths.
4. Share exact code and reference tools only under NDA or partner access.

## Quick evaluation path

1. Open `docs/EVALUATION_BUNDLE.md`.
2. Follow `docs/EVALUATION_RUNBOOK.md`.
3. Use `docs/RELEASE_EVIDENCE_INDEX.md` for the proof trail.

## Export

Run the exporter to create a copy of the public-safe repository slice:

```powershell
.\export-public-safe.ps1
```

The export is driven by `PUBLIC_FILE_LIST.txt` and writes to
`%TEMP%\public-safe-github` by default so the repository tree stays clean.

`PUBLIC_FILE_LIST.md` mirrors the same public cut in a human-readable form.

The repository also includes a GitHub Actions workflow at
`.github/workflows/public-safe-export.yml` that runs the exporter and checks the
resulting public-safe file set on Windows.

The reusable verifier at `verify-public-safe-export.ps1` checks the exported
file set and the public entry points used by the website hero and README.

The readiness helper at `check-github-publish-readiness.ps1` prints the current
branch and configured remotes before a publish attempt.

The setup helper at `configure-github-publish-target.ps1` can point the current
branch at a chosen Git remote and set the upstream tracking branch.
If the remote branch is new, the first push can create it.

The orchestrator at `publish-public-safe.ps1` can run the publish sequence in
order and optionally push the current branch when a remote URL is supplied.

The short handoff at `docs/GITHUB_PUBLISH_HANDOFF.md` collects the exact
publish sequence and the remaining external input in one place.

## Why this works

Public release can still show:

- the product name,
- the changelog,
- the raw-PCM-only policy,
- the evaluation process,
- the evidence template,
- the roadmap and business framing,
- the implementation status,
- the evaluation bundle,
- the evaluation runbook,
- the release evidence example,
- the release evidence index,
- the verified signal-chain proof,
- the short signal-chain result snapshot,
- the Linux reference evidence for the first recorded build-and-run result,
- the disclosure policy that explains what stays public, partner-only, or
  private.
- the public repository index that gives visitors the first public entry
  point.
- the public-safe package README and file list that explain the export slice.
- the short publish handoff page that collects the remaining external input.
- the GitHub workflow that verifies the public-safe export.
- the GitHub publication guide that explains how to publish the public cut.
- the public release log that summarizes safe public-facing changes.
- the public release map that groups the public docs by purpose.
- the contributor guide and PR template for public-safe collaboration.
- the issue templates for public-safe feedback and feature requests.
- the security policy for public-safe reporting.
- the code of conduct for public collaboration.

That gives prospects a credible public footprint without handing over the
transport core.

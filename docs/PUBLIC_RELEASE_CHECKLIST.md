# Public Release Checklist

Use this checklist when publishing the public GitHub cut of the project.

## Before publishing

- Review `docs/PUBLIC_DISCLOSURE_POLICY.md`.
- Review `docs/PUBLIC_RELEASE_BOUNDARY.md`.
- Review `docs/PUBLIC_REPO_INDEX.md`.
- Review `docs/GITHUB_PUBLICATION_GUIDE.md`.
- Review `docs/GITHUB_PUBLISH_HANDOFF.md`.
- Confirm the target Git remote and branch are configured for the public cut.
- If needed, run `publish/public-safe-release/configure-github-publish-target.ps1`
  with the target Git remote URL.
- Run `publish/public-safe-release/check-github-publish-readiness.ps1` and
  treat a nonzero exit as a missing-remote preflight failure.
- Run `publish/public-safe-release/export-public-safe.ps1`.
- Inspect `%TEMP%\public-safe-github`.
- Run `publish/public-safe-release/verify-public-safe-export.ps1` against the
  exported slice.
- Confirm the export contains only the approved public file set.
- Confirm the export does not contain `main/`, `components/`, or `examples/linux/`.

## Publish

- Publish the exported slice as the public GitHub repository or public branch.
- For a branch-based publish, run `git push -u origin codex/public-github-cut`.
  If the remote branch does not exist yet, the push will create it.
- For a single-command run, use `publish/public-safe-release/publish-public-safe.ps1`
  with the target Git remote URL and `-Push`.
- Keep the private implementation repository as the source of truth.
- Keep the public site linked to the public docs and boundary pages.

## After publishing

- Verify the public repository homepage points to the public repository index.
- Verify the public release boundary is easy to find from the website and README.
- Verify the public release map is easy to find from the website, README, and index.
- Review new public issues and route private details to partner or private channels.

# GitHub Publication Guide

This guide describes the recommended way to publish the SolidState Audio
Platform without exposing the transport core.

## Recommended split

- Private repository: full firmware, reference tools, protocol internals, test
  fixtures, and integration work.
- Public repository or public branch: documentation, website, evidence, policy,
  roadmap, and the public-safe export workflow.

## Publish flow

1. Review `docs/PUBLIC_DISCLOSURE_POLICY.md`.
2. Review `docs/PUBLIC_RELEASE_BOUNDARY.md`.
3. Review `docs/PUBLIC_REPO_INDEX.md`.
4. Review `docs/PUBLIC_RELEASE_CHECKLIST.md`.
5. Review `docs/PUBLIC_GITHUB_QA.md`.
6. Review `docs/PUBLIC_RELEASE_LOG.md`.
7. Review `docs/PUBLIC_RELEASE_MAP.md`.
8. Review `docs/RELEASE_EVIDENCE_INDEX.md`.
9. Review `docs/IMPLEMENTATION_STATUS.md`.
10. Confirm that the target Git remote and branch are configured for the
    public GitHub cut.
11. If no remote is configured yet, supply the target Git remote URL first and
    then run `publish/public-safe-release/configure-github-publish-target.ps1`.
    Example:

```powershell
.\publish\public-safe-release\configure-github-publish-target.ps1 -RemoteUrl https://github.com/<owner>/<repo>.git
```

12. Run `publish/public-safe-release/check-github-publish-readiness.ps1` to
    confirm the current branch and remote setup. The helper exits with a
    nonzero status until a Git remote is configured.
13. Run the public-safe exporter:

```powershell
.\publish\public-safe-release\export-public-safe.ps1
```

14. Inspect the export in `%TEMP%\public-safe-github`.
15. Run `publish/public-safe-release/verify-public-safe-export.ps1` against the
    exported slice.
16. Publish that export as the public GitHub repository or mirror it into a
   public branch. For a branch-based publish:

```powershell
git push -u origin codex/public-github-cut
```

If the branch does not exist on the remote yet, the first push will create it
and set the upstream tracking branch.

For a single command that runs the sequence in order, use:

```powershell
.\publish\public-safe-release\publish-public-safe.ps1 -RemoteUrl https://github.com/<owner>/<repo>.git -Push
```

You can also set `GITHUB_REMOTE_URL` or `PUBLISH_REMOTE_URL` and omit the
`-RemoteUrl` argument when running the orchestrator.

17. Keep the private repository as the source of truth for implementation work.

## What the public cut should include

- Product brief and business positioning.
- Evaluation bundle.
- Evaluation runbook.
- Public disclosure policy.
- Roadmap and implementation status.
- Release checklist and evidence template.
- Release evidence index.
- Release evidence example.
- Verified signal-chain evidence.
- Short signal-chain result snapshot.
- Public website.
- The GitHub workflow that verifies the public-safe export.

## What stays private

- `main/`
- `components/`
- `examples/linux/`
- exact packet layout and serialization internals,
- test fixtures that reveal hidden transport structure,
- customer-specific integration notes.

## Optional GitHub hosting

If you want the public website to be easier to browse, host `website/` from
GitHub Pages in the public repository and keep the implementation repository
private.

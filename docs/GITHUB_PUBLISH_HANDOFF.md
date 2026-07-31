# GitHub Publish Handoff

This page is the short handoff for turning the public-safe export into a real
GitHub publication.

## Current state

- Working branch: `codex/public-github-cut`
- Public-safe export and verifier are implemented and passing locally.
- The only missing external input is the target Git remote URL.

## What to do next

1. Supply the GitHub remote URL for the public cut.
2. Bind the current branch to that remote:

```powershell
.\publish\public-safe-release\configure-github-publish-target.ps1 -RemoteUrl https://github.com/<owner>/<repo>.git
```

Replace the placeholder with the real GitHub repository URL before running it.
The helper does not require the remote branch to exist yet; the first push can
create it.

If you prefer, set `GITHUB_REMOTE_URL` or `PUBLISH_REMOTE_URL` and call the
orchestrator without a `-RemoteUrl` argument.

3. Run the readiness check:

```powershell
.\publish\public-safe-release\check-github-publish-readiness.ps1 -RepositoryRoot .
```

4. Re-export and verify the public-safe package:

```powershell
.\publish\public-safe-release\export-public-safe.ps1
.\publish\public-safe-release\verify-public-safe-export.ps1 -SourceRoot . -ExportRoot $env:TEMP\public-safe-github -ManifestPath .\publish\public-safe-release\PUBLIC_FILE_LIST.txt
```

5. Publish the exported slice as the public GitHub repository or mirror it
   into a public branch.

For a single command that runs the sequence in order, use:

```powershell
.\publish\public-safe-release\publish-public-safe.ps1 -RemoteUrl https://github.com/<owner>/<repo>.git -Push
```

Or rely on `GITHUB_REMOTE_URL` / `PUBLISH_REMOTE_URL` and run the same script
without `-RemoteUrl`.

If the remote exists but the branch does not, the helper will tell you to use
the first push to create it:

```powershell
git push -u origin codex/public-github-cut
```

## Keep in mind

- Do not publish the private implementation tree.
- Keep the public website and public docs in sync with the exported slice.
- If the readiness check fails, fix the remote configuration before publishing.

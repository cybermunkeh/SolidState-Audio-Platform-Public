[CmdletBinding()]
param(
    [string]$RepositoryRoot
)

$ErrorActionPreference = 'Stop'

if (-not $RepositoryRoot) {
    $RepositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
}

Push-Location $RepositoryRoot
try {
    $branch = (git branch --show-current).Trim()
    $remotes = @(git remote)

    Write-Host "Repository root: $RepositoryRoot"
    Write-Host "Current branch:   $branch"
    if ($remotes.Count -eq 0) {
        Write-Warning "No Git remotes are configured yet."
        exit 1
    } else {
        Write-Host "Remotes:"
        $remotes | ForEach-Object { Write-Host "  - $_" }
    }

    if ($branch -notmatch '^codex/') {
        Write-Warning "Consider publishing from a dedicated codex/* branch."
    }
}
finally {
    Pop-Location
}

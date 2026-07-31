[CmdletBinding()]
param(
    [string]$SourceRoot,

    [string]$ExportRoot,

    [string]$ManifestPath,

    [string]$RemoteUrl,

    [string]$RemoteName = 'origin',

    [string]$BranchName,

    [switch]$Push
)

$ErrorActionPreference = 'Stop'

$scriptRoot = if ($PSScriptRoot) {
    $PSScriptRoot
} else {
    Split-Path -Parent $MyInvocation.MyCommand.Path
}

if (-not $SourceRoot) {
    $SourceRoot = (Resolve-Path (Join-Path $scriptRoot '..\..')).Path
}
if (-not $ExportRoot) {
    $ExportRoot = Join-Path $env:TEMP 'public-safe-github'
}
if (-not $ManifestPath) {
    $ManifestPath = Join-Path $scriptRoot 'PUBLIC_FILE_LIST.txt'
}
if (-not $RemoteUrl) {
    if (-not [string]::IsNullOrWhiteSpace($env:GITHUB_REMOTE_URL)) {
        $RemoteUrl = $env:GITHUB_REMOTE_URL
    } elseif (-not [string]::IsNullOrWhiteSpace($env:PUBLISH_REMOTE_URL)) {
        $RemoteUrl = $env:PUBLISH_REMOTE_URL
    }
}

if ($RemoteUrl) {
    & (Join-Path $scriptRoot 'configure-github-publish-target.ps1') `
        -RemoteUrl $RemoteUrl `
        -RemoteName $RemoteName `
        -BranchName $BranchName

    & (Join-Path $scriptRoot 'check-github-publish-readiness.ps1') -RepositoryRoot $SourceRoot
} else {
    Write-Host "No remote URL supplied; running export and verification only."
}

& (Join-Path $scriptRoot 'export-public-safe.ps1') `
    -SourceRoot $SourceRoot `
    -OutputRoot $ExportRoot `
    -ManifestPath $ManifestPath

& (Join-Path $scriptRoot 'verify-public-safe-export.ps1') `
    -SourceRoot $SourceRoot `
    -ExportRoot $ExportRoot `
    -ManifestPath $ManifestPath

if ($Push) {
    if (-not $RemoteUrl) {
        throw "Cannot push without a remote URL."
    }

    if (-not $BranchName) {
        $BranchName = (git branch --show-current).Trim()
    }

    git push -u $RemoteName $BranchName
    Write-Host "Pushed $BranchName to $RemoteName."
}

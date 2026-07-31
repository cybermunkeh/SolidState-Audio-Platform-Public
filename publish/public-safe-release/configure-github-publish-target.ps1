[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$RemoteUrl,

    [string]$RemoteName = 'origin',

    [string]$BranchName
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RemoteUrl)) {
    throw "Remote URL is required."
}
if ($RemoteUrl -match '[<>]') {
    throw "Remote URL must be a real Git URL, not a placeholder."
}

if (-not $BranchName) {
    $BranchName = (git branch --show-current).Trim()
}

if ([string]::IsNullOrWhiteSpace($BranchName)) {
    throw "Branch name could not be determined."
}

$existingRemote = @(git remote)
if ($existingRemote -contains $RemoteName) {
    git remote set-url $RemoteName $RemoteUrl | Out-Null
} else {
    git remote add $RemoteName $RemoteUrl | Out-Null
}

try {
    $remoteBranchExists = @(git ls-remote --heads $RemoteName $BranchName 2>$null)
} catch {
    $remoteBranchExists = @()
}

Write-Host "Configured $RemoteName for $BranchName -> $RemoteUrl"
if ($remoteBranchExists.Count -gt 0) {
    git branch --set-upstream-to="$RemoteName/$BranchName" $BranchName | Out-Null
    Write-Host "Upstream set to $RemoteName/$BranchName."
} else {
    Write-Host "Remote branch $RemoteName/$BranchName does not exist yet or could not be checked."
    Write-Host "Use: git push -u $RemoteName $BranchName"
}

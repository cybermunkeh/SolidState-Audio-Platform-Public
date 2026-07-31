[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$SourceRoot,

    [Parameter(Mandatory = $true)]
    [string]$ExportRoot,

    [Parameter(Mandatory = $true)]
    [string]$ManifestPath
)

$ErrorActionPreference = 'Stop'

function Get-ExportPaths {
    param(
        [Parameter(Mandatory = $true)][string]$Root
    )

    Get-ChildItem -LiteralPath $Root -Recurse -File |
        ForEach-Object {
            $full = [System.IO.Path]::GetFullPath($_.FullName)
            $base = [System.IO.Path]::GetFullPath($Root)
            $relative = $full.Substring($base.Length).TrimStart('\', '/')
            $relative.Replace('\', '/')
        } |
        Sort-Object
}

function Get-ManifestPaths {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Root
    )

    $entries = New-Object System.Collections.Generic.List[string]
    Get-Content -LiteralPath $Path | ForEach-Object {
        $entry = $_.Trim()
        if ([string]::IsNullOrWhiteSpace($entry) -or $entry.StartsWith('#')) {
            return
        }

        $fullPath = [System.IO.Path]::GetFullPath((Join-Path $Root $entry))
        if (Test-Path -LiteralPath $fullPath -PathType Container) {
            Get-ChildItem -LiteralPath $fullPath -Recurse -File | ForEach-Object {
                $filePath = [System.IO.Path]::GetFullPath($_.FullName)
                $relative = $filePath.Substring([System.IO.Path]::GetFullPath($Root).Length).TrimStart('\', '/')
                $entries.Add($relative.Replace('\', '/'))
            }
        } else {
            $entries.Add($entry.Replace('\', '/'))
        }
    }

    $entries | Sort-Object -Unique
}

if (-not (Test-Path -LiteralPath $ExportRoot)) {
    throw "Export root not found: $ExportRoot"
}
if (-not (Test-Path -LiteralPath $ManifestPath)) {
    throw "Manifest not found: $ManifestPath"
}
if (-not (Test-Path -LiteralPath $SourceRoot)) {
    throw "Source root not found: $SourceRoot"
}

$expected = Get-ManifestPaths -Path $ManifestPath -Root $SourceRoot
$actual = Get-ExportPaths -Root $ExportRoot

if ($actual.Count -ne $expected.Count) {
    throw "Unexpected export count. Expected $($expected.Count), got $($actual.Count)."
}

for ($i = 0; $i -lt $expected.Count; $i++) {
    if ($actual[$i] -ne $expected[$i]) {
        throw "Export mismatch at index $i. Expected '$($expected[$i])' but found '$($actual[$i])'."
    }
}

if ($actual -match '^main/' -or $actual -match '^components/' -or $actual -match '^examples/linux/') {
    throw "Private implementation files leaked into the public-safe export."
}

$readme = Get-Content -LiteralPath (Join-Path $ExportRoot 'README.md') -Raw
$website = Get-Content -LiteralPath (Join-Path $ExportRoot 'website\index.html') -Raw

if ($readme -notmatch 'docs/PUBLIC_REPO_INDEX\.md') {
    throw "Public repository index is missing from the public README."
}

if ($website -notmatch 'href="\.\./docs/PUBLIC_REPO_INDEX\.md">Public Repo Index<') {
    throw "Website hero does not expose the public repository index."
}

Write-Host "Public-safe export verified at $ExportRoot"

param(
    [string]$Repository = 'yannickhuchard/enterprise-morphogenesis'
)

$ErrorActionPreference = 'Stop'
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw 'GitHub CLI is required. Install it and authenticate with gh auth login.'
}

# Do not print credentials or change repository visibility. Existing settings are
# preserved when Pages already publishes main:/docs with HTTPS enforcement.
$repoInfo = & gh api "repos/$Repository" | ConvertFrom-Json
if ($LASTEXITCODE -ne 0) { throw "Unable to access $Repository." }
if ($repoInfo.default_branch -ne 'main') { throw 'Expected the existing main branch. Check the repository before changing its publication source.' }

$rawPages = & gh api "repos/$Repository/pages" 2>$null
if ($LASTEXITCODE -eq 0) {
    $pages = $rawPages | ConvertFrom-Json
    if ($pages.build_type -ne 'legacy' -or $pages.source.branch -ne 'main' -or $pages.source.path -ne '/docs') {
        & gh api --method PUT "repos/$Repository/pages" -f 'build_type=legacy' -f 'source[branch]=main' -f 'source[path]=/docs' | Out-Null
        if ($LASTEXITCODE -ne 0) { throw 'Unable to update the Pages publication source.' }
    }
} else {
    & gh api --method POST "repos/$Repository/pages" -f 'build_type=legacy' -f 'source[branch]=main' -f 'source[path]=/docs' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Unable to enable GitHub Pages. Verify repository permissions and availability.' }
}

$pages = & gh api "repos/$Repository/pages" | ConvertFrom-Json
if ($LASTEXITCODE -ne 0) { throw 'Unable to verify the Pages configuration.' }
if (-not $pages.https_enforced) {
    & gh api --method PUT "repos/$Repository/pages" -F 'https_enforced=true' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Unable to enforce HTTPS.' }
}
& gh api "repos/$Repository/pages" --jq '{url: .html_url, status, build_type, source, https_enforced}'
if ($LASTEXITCODE -ne 0) { throw 'Final configuration verification failed.' }

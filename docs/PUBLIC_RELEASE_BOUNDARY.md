# Public Release Boundary

This document defines what may be published in a public GitHub repository and
what must remain private or partner-only.

## Public cut

The public cut is the exported slice from
`publish/public-safe-release/export-public-safe.ps1`.

It may include:

- product brief and positioning,
- evaluation bundle,
- evaluation runbook,
- generic public evaluation evidence and result snapshots,
- business and OEM framing,
- roadmap and implementation status,
- release checklist and evidence templates,
- release evidence index,
- release evidence example,
- public release checklist,
- public GitHub QA,
- public release log,
- public release map,
- verified signal-chain evidence,
- short signal-chain result snapshot,
- public website,
- public repository index,
- contributor, security, and conduct policies,
- GitHub templates and the public-safe export workflow.

Device-specific lab notes and internal testbed details stay partner-only or
private unless they are rewritten into a public-safe summary.

## Partner-only material

Share this only with NDA-bound OEMs, evaluators, or integration partners when
the discussion needs more technical depth than the public cut provides.

- selected architecture details,
- integration notes,
- limited reference scripts,
- implementation status details that would otherwise reveal core behavior.

## Private material

Keep the transport core and any exact implementation detail private until a
deliberate release decision is made.

- `main/`
- `components/`
- `examples/linux/`
- protocol serializers and packetizer internals
- test fixtures that expose transport structure
- customer-specific release evidence

## Operating rule

Do not publish the repository root directly as a public GitHub project.
Publish the exported public-safe slice instead, and treat the private
repository as the source of truth for implementation work.

## Inference rule

The public cut is intentionally shaped to prevent reliable reconstruction of
the transport core from the public files alone.

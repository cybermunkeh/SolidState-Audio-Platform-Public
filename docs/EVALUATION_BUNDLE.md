# Evaluation Bundle

This page is the shortest public starting point for an OEM or integrator who
wants to review the current evidence trail without reading the full repository.

## Read this first

1. [`docs/PRODUCT_BRIEF.md`](PRODUCT_BRIEF.md)
2. [`docs/RELEASE_EVIDENCE_INDEX.md`](RELEASE_EVIDENCE_INDEX.md)
3. [`docs/RELEASE_EVIDENCE_EXAMPLE.md`](RELEASE_EVIDENCE_EXAMPLE.md)
4. [`docs/ESP_TO_LP10_SIGNALCHAIN_RESULT.md`](ESP_TO_LP10_SIGNALCHAIN_RESULT.md)

## What to expect

- Result: `Passed`
- Hash match: yes
- Payload bytes: `2880`
- Sample rate in the current proof fixture: `48000`
- Transport target: `192000`
- Packet-flow simulation keeps 192 kHz as the preferred shared rate when both
  sides advertise it.
- The proof fixture is conservative; the 192 kHz PCM target remains the
  broader product goal.

## Then check

- [`docs/ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md`](ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md)
- [`docs/PUBLIC_RELEASE_BOUNDARY.md`](PUBLIC_RELEASE_BOUNDARY.md)
- [`docs/PUBLIC_GITHUB_QA.md`](PUBLIC_GITHUB_QA.md)
- [`docs/PUBLIC_RELEASE_CHECKLIST.md`](PUBLIC_RELEASE_CHECKLIST.md)
- [`docs/EVALUATION_RUNBOOK.md`](EVALUATION_RUNBOOK.md)

## What this bundle gives you

- the product summary,
- the evidence navigation trail,
- a filled example with the verified public proof data,
- the short bit-perfect result snapshot,
- the detailed proof record,
- the public release boundary and QA checks.

## What it does not give you

- the transport core,
- packetizer internals,
- private reference tools,
- customer-specific integration details.

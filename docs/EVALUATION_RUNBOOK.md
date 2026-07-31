# Evaluation Runbook

This is the short procedure for a public evaluator who wants to verify the
current release evidence without reading the full repository.

## Step 1

Open [`docs/EVALUATION_BUNDLE.md`](EVALUATION_BUNDLE.md) and confirm the
expected result block:

- Result: `Passed`
- Hash match: yes
- Payload bytes: `2880`
- Sample rate in the current proof fixture: `48000`
- Transport target: `192000`
- The proof fixture is only the current verification baseline; 192 kHz
  remains the target for the broader PCM transport.

## Step 2

Open the proof trail in this order:

1. [`docs/RELEASE_EVIDENCE_INDEX.md`](RELEASE_EVIDENCE_INDEX.md)
2. [`docs/RELEASE_EVIDENCE_EXAMPLE.md`](RELEASE_EVIDENCE_EXAMPLE.md)
3. [`docs/ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md`](ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md)
4. [`docs/ESP_TO_LP10_SIGNALCHAIN_RESULT.md`](ESP_TO_LP10_SIGNALCHAIN_RESULT.md)

## Step 3

Confirm the public boundary:

- [`docs/PUBLIC_RELEASE_BOUNDARY.md`](PUBLIC_RELEASE_BOUNDARY.md)
- [`docs/PUBLIC_DISCLOSURE_POLICY.md`](PUBLIC_DISCLOSURE_POLICY.md)
- [`docs/PUBLIC_GITHUB_QA.md`](PUBLIC_GITHUB_QA.md)

## Step 4

Use the evidence only for the current verified proof snapshot:

- LP10 proof target: private LAN evaluation target (endpoint redacted)
- Result: `Passed`
- Local SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`
- Remote SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`

## If anything is missing

If a required file is missing from the public-safe export, treat the release
candidate as incomplete and return to the public documentation rather than
guessing.

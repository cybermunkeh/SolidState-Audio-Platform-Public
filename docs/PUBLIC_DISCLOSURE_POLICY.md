# Public Disclosure Policy

This repository can be shared in three visibility tiers.

## Public

Publish only material that helps a technical buyer understand the product,
evaluate fit, and trust the current state without exposing the implementation
core.

Typical public material:

- product brief,
- evaluation bundle,
- evaluation runbook,
- business and OEM framing,
- roadmap,
- test strategy,
- release checklist and evidence templates,
- release evidence index,
- release evidence example,
- verified signal-chain evidence,
- short signal-chain result snapshot,
- marketing website.

## Partner

Share with NDA-bound OEMs, evaluators, or integration partners when a deeper
technical conversation is needed but the full code base is still not required.

Typical partner material:

- selected architecture details,
- receiver and discovery behavior notes,
- implementation status,
- integration guides,
- limited reference scripts.

## Private

Keep the transport core, reference implementations, and exact packet/layout
details private until a deliberate release decision is made.

Typical private material:

- `main/`,
- `components/`,
- `examples/linux/`,
- serializer and packetizer internals,
- test fixtures that expose transport structure,
- customer-specific release evidence.

## Rule of thumb

If a file lets someone re-implement the core transport or exact evaluation
mechanics without the rest of the commercial relationship, keep it out of the
public tier.

## Public inference note

The public cut is intentionally incomplete. It is meant to help a reader
understand the product, the market framing, and the publication boundary, not to
reconstruct the transport core from public documentation alone.

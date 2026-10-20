# Voxgig SDK Generator - Task 1 Report

## Scope

- **API:** IncidentLens AMD, a small MIT-licensed API I maintain
- **API deployment:** <https://incidentlens-amd.vercel.app>
- **OpenAPI:** 3.0.3, retained in both `incidentlens-openapi.yaml` and `.sdk/def/`
- **Generator:** `@voxgig/sdkgen` 4.35.0
- **Generated target:** TypeScript
- **License:** MIT

I selected a project I control so I could exercise every public operation without
creating another third-party account or exposing a credential. The public deployment
uses its disclosed deterministic evaluation path; the SDK is independent of the
server's optional AMD TokenFactory credential.

## What I did

```powershell
npx --yes @voxgig/create-sdkgen@latest incidentlens-amd `
  -d .\incidentlens-openapi.yaml -o . -t ts -f test
cd .sdk
npm run generate
cd ..\ts
npm install
npm test
cd ..
node examples/live-smoke.mjs
```

The generator mapped three paths and three methods to three semantic entities:

| Entity | Operation | HTTP route |
| --- | --- | --- |
| `Health` | `load` | `GET /health` |
| `Preset` | `list` | `GET /api/presets` |
| `Analyze` | `create` | `POST /api/analyze` |

## Verification

- Generation completed without an error and reported entity/path/method recall of 1.0.
- The generated TypeScript build passed.
- The generated suite completed with **229 tests: 218 passed, 0 failed, 11 skipped**.
  Each skip named the optional feature that was not generated.
- `npm audit` reported zero vulnerabilities for both the scaffold and generated target.
- The live smoke test called all three public operations through the generated SDK:
  health returned `ok`, three presets were listed, and `retry-storm` analysis returned
  `success: true` with valid citations.
- An intentionally empty analysis request produced a typed SDK error with
  `status === 400`, which is useful for programmatic handling.

## Developer-experience observations

### What worked well

1. The scaffold-to-generated-client path was short and deterministic. The OpenAPI
   mapping selected sensible entity operations without manual guide edits.
2. Repository, author, publisher, and npm package metadata could be expressed in the
   persistent `project.aontu` overlay instead of patching generated files.
3. The generated offline transport and documentation-example tests are unusually
   thorough. Regeneration did not require live credentials, while a separate smoke
   test could still verify the real service.
4. HTTP failures retained structured status information (`error.status`), rather
   than forcing consumers to parse the message.

### Friction and suggested improvements

1. **Generated live-looking examples can violate the OpenAPI schema.** The generated
   `Analyze().create` example supplies `events: []` even though `minItems: 1`, and
   supplies `presetId: 'example'` despite the declared enum. It passes because README
   examples run against test mode, but copying it into a live program returns 400.
   Example generation should prefer an OpenAPI example and honor enum/minimum/minItems
   constraints.
2. **The non-affiliation disclaimer is unconditional.** Even after configuring the
   SDK publisher and repository as the same person who owns the upstream API, generated
   metadata still says the SDK is unofficial and unaffiliated. A project-level switch
   for first-party SDKs would make the generated package description, README, license
   notice, and security policy accurate.
3. **Proper-noun casing is lost in the exported class name.** `IncidentLens` becomes
   `IncidentlensAmdSDK`. The text overlay fixes headings but not identifiers. An
   explicit class-name/model-name override would improve ergonomics for branded APIs.

## Timebox

The human-guided portion stayed within the requested 30-minute limit; scaffolding,
generation, dependency installation, the generated test suite, and live verification
were automated. No generated source file was hand-edited.

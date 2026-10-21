# Jostraca gets the second run right, until its baseline disappears

Most code generators impress on an empty directory. That is the easy case. The harder question is what happens six weeks later, after a developer has edited the generated files and the schema changes.

[Jostraca](https://jostraca.org/) is unusually direct about this problem. It builds a proposed file tree in memory, then applies a policy to files already on disk: overwrite, preserve, present, diff, or three-way merge. I used Jostraca indirectly while generating a TypeScript SDK with Voxgig, then tested the library itself with the TypeScript release documented by its website, `0.36.6`.

My short verdict: the core idea is excellent and the merge works, but teams should add a fail-closed wrapper before trusting it with hand-edited output.

## The useful part is small enough to understand

Jostraca uses ordinary JavaScript functions instead of inventing a template control language. A generator declares a tree of `Project`, `Folder`, `File`, and `Content` components:

```js
import { appendFile } from 'node:fs/promises'
import { Jostraca, Project, File, Content } from 'jostraca'

const jostraca = Jostraca({
  existing: { txt: { write: true, merge: true } },
})

const generate = body => jostraca.generate({ folder: './out' }, () => {
  Project({}, () => {
    File({ name: 'config.txt' }, () => Content(body))
  })
})

await generate('PORT=8080\nHOST=localhost\n')
await appendFile('./out/config.txt', 'DEBUG=1\n')
await generate('PORT=9090\nHOST=localhost\n')
```

I ran that example. The result was what a developer would hope for:

```text
PORT=9090
HOST=localhost
DEBUG=1
```

The generator changed `PORT`; the manual `DEBUG` line survived. Jostraca could distinguish those edits because the first run stored its generated version under `out/.jostraca/generated/`. That prior output becomes the common ancestor for the next three-way merge.

This model is much better than sprinkling "generated section" comments through every target language. Jostraca can also consume normal template files through `Fragment`, so an HTML, Go, or SQL template remains valid input for the language's usual formatter and editor. Loops and conditions stay in JavaScript. There is less syntax to teach and less custom tooling to maintain.

The output report is another good decision. `generate()` separates written, merged, conflicted, unchanged, preserved, and presented files. Unchanged files are not rewritten, which avoids unnecessary watcher and build churn. A generator can turn conflicts into a hard CI failure instead of searching emitted text afterward.

## The merge has a dangerous dependency

The same baseline that enables the merge is its largest operational risk. Jostraca's [options reference](https://jostraca.org/docs/reference-options) says that when the baseline is absent, merge mode degrades to an overwrite with no error or warning. The baseline is absent on a fresh checkout unless it is retained separately; `.jostraca` is gitignored by default. It can also be disabled or unavailable for output paths outside the configured folder.

That is the wrong failure direction for a feature whose purpose is preserving human work. A missing ancestor should produce a distinct result or stop the run. Silent overwrite may be convenient for a first run, but first-run and lost-state scenarios are not equivalent.

Until the library changes that behavior, I would put a guard in every generator that permits manual edits:

```js
import { existsSync } from 'node:fs'

const baseline = './out/.jostraca/generated'
if (!existsSync(baseline)) {
  throw new Error('Refusing regeneration: Jostraca merge baseline is missing')
}

const result = await generate(nextSource)
if (result.files.conflicted.length > 0) {
  throw new Error(`Resolve generated conflicts: ${result.files.conflicted.join(', ')}`)
}
```

A real wrapper needs a separate first-run flag, but making that state explicit is precisely the point. I would also archive or version the baseline in CI rather than assume a workspace will persist.

## Configuration is honest, but too surprising

The documentation deserves credit for describing behavior that many projects would hide. It also reveals several sharp edges:

- `present: true` does nothing unless `write` is explicitly `false`.
- `diff` wins over `merge` when both are enabled.
- Global `build`, `control`, and `exclude` values are silently ignored unless repeated on `generate()`.
- Several validated naming options currently have no implementation.

Documentation reduces discovery time, but it cannot make these semantics safe. Mutually exclusive modes would be clearer as one enum. A validated option that has no effect should be rejected or marked experimental. Global values that cannot apply should fail validation instead of looking accepted.

There is also a version-confidence problem. At the time of this review, npm reports `0.40.0` as current, while the website's `versions.json`, install command, and executed documentation examples identify `0.36.6`. Tested documentation is a strong practice; readers still need a clear banner when it describes an older release.

Finally, three-way merge is difficult to present correctly in editors. The project's open [issue #79](https://github.com/jostraca/jostraca/issues/79) reports that conflict labels and VS Code's “current/incoming” actions can point users toward the opposite side from what they expect. That does not invalidate the merge engine, but it shows why generator-specific conflict instructions matter.

## Where I would use it

Jostraca fits SDKs, project scaffolds, and policy-generated configuration where output is checked in and regeneration is a normal maintenance action. It is especially attractive when target templates should remain valid source files and when TypeScript and Go generators need the same behavior; the project maintains both implementations against a shared corpus.

I would not yet let it rewrite hand-maintained files in an ephemeral CI checkout without additional controls. My minimum setup would include a baseline-presence check, `result.files.conflicted` enforcement, a clean-regeneration comparison that detects stale files no longer emitted by the generator, and a documented escape hatch using `JOSTRACA_PROTECT`. I tested that marker too: the subsequent run left the protected file untouched.

The important achievement is not that Jostraca can write files. It gives regeneration an explicit model and makes the second run a first-class operation. The remaining work is to make loss of that model loud. With a fail-closed wrapper, I would use it; without one, its most valuable feature can silently become the overwrite behavior it was designed to replace.

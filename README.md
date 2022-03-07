# ple

A streamlined plist editor.

[![npm-version]][npm-url]
[![npm-downloads]][npm-url]

[npm-version]: https://badgen.net/npm/v/ple
[npm-downloads]: https://badgen.net/npm/dt/ple
[npm-url]: https://npmjs.org/package/ple

## Install

```bash
npm i -g ple
```

## Use

### CLI

```bash
ple Info.plist # parse and print content
ple Info.plist --json # parse and print content in JSON
ple Info.plist version # parse and print a value of `version`
ple Info.plist version v1.0.0 # rewrite a value of `version`
```

### Node.js

#### `readPlist`

```js
import { readPlist } from "ple";

const plistValue = readPlist(plistPath, key);
```

#### `rewritePlist`

```js
import { rewritePlist } from "ple";

rewritePlist(plistPath, key, value);
```

## Contribute

See [Contribution Guide](./CONTRIBUTING.md)

### Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://uechi.io/"><img src="https://avatars0.githubusercontent.com/u/431808?v=4?s=100" width="100px;" alt=""/><br /><sub><b>uetchy</b></sub></a><br /><a href="https://github.com/uetchy/ple/commits?author=uetchy" title="Code">💻</a> <a href="https://github.com/uetchy/ple/commits?author=uetchy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://pocztarski.com/"><img src="https://avatars2.githubusercontent.com/u/119231?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafał Pocztarski</b></sub></a><br /><a href="#platform-rsp" title="Packaging/porting to new platform">📦</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

**Special thanks:**

- [Rafał Pocztarski](https://github.com/rsp) for donating package name `ple`.

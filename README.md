# remark-license

[**remark**][remark] plugin to add a [license][section] section to your readme.

## Install

```sh
yarn add @fox-land/remark-license
```

## Use

Say we have the following file, `example.md`:

```markdown
## License

Something nondescript.
```

Now, running `node example` yields:

```markdown
## License

licensed under [MIT](LICENSE) by [First Last](https://example.com)
```

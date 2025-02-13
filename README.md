# passgen

Simple password generator with zero dependencies.

## Usage

```
./passgen.sh <args>
```

## Args

```
Options:
  -l, --length <number>    length of the password (default: 64)
  -r, --allow-repeats      allow repeating characters in the password (default: false)
  -h, --help               display help message
```

## Alias

To alias this command, add the following to your `.bashprofile` or `.zprofile`:

```
alias passgen="/absolute/path/to/passgen.sh $@"
```

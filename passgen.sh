#!/bin/bash

output=$(node ./passgen.js "$@")
exit_code=$?

if [ $exit_code -eq 1 ]
then
    echo $output
    echo "❌ Error: Password generation failed";
    exit 1;
fi

# --help
if [ $exit_code -eq 2 ]
then
    echo "$output"
    exit 2;
fi

# copy to clipboard, strip newlines
echo $output | tr -d '\n' | pbcopy
echo "✅ New password copied to clipboard"

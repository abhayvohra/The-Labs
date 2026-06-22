#!/bin/bash
cd "/Users/abhayvohra/Documents/The-Labs"
git add -A
git commit -m "${1:-Update site}"
git push

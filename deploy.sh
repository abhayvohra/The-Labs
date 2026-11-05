#!/bin/bash
cd "/Users/abhayvohra/Documents/Deployments/The-Labs"
git add -A
git commit -m "${1:-Update site}"
git push

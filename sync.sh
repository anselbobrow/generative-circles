#!/bin/bash

echo "Copying files to anselbobrow.github.io..."
cp /Users/ansel/Documents/generative_circles/dist/* /Users/ansel/Documents/anselbobrow.github.io/generative-circles/

echo "Pushing updates to github pages..."
cd /Users/ansel/Documents/anselbobrow.github.io/
git commit -am "automated update of generative_circles assets"
git push origin master
cd -

echo "Done."

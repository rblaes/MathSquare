echo "Deleting www/*"
rm -r www/*
echo "Copying files.." 
cp -r ~/WebstormProjects/Memory/* www/
echo "Moving content from files in www/js/custom to www/js/min.js"
cat www/js/custom/*js > www/js/min.js

echo "Deleting www/js/custom"
rm -r www/js/custom
echo "Adjusting imports in index.html"
cat www/index.html | grep -v custom > www/index.html.bak
mv www/index.html.bak www/index.html

echo "Compacting.."

#files=`find /Users/bauer/Development/cordova/MathSquare/www/js/custom  -name "*.js"`
#for js in $files;
#do
# echo $js
# java -jar compiler.jar --js $js --js_output_file $js.min
# mv $js.min $js
#done
#adv="--compilation_level ADVANCED_OPTIMIZATIONS" 

echo "Closure Compiler Level is: $adv"

java -jar compiler.jar $adv --js www/js/min.js --js_output_file www/js/min.js.bak
mv www/js/min.js.bak www/js/min.js


echo "Building ios"
cordova build ios
echo "Building android"
cordova build android

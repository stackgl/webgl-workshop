PATH := $(PWD)/node_modules/.bin:$(PATH)
APPNAME := WebGL\ Workshop
OSXDEST := build/osx/$(APPNAME).app
OSXFILE := $(OSXDEST)/Contents/Resources/app.nw
NWVERSION := 0.11.0

.PHONY: build/osx clean pack publish

pack:
	npm run clean
	npm install
	npm dedupe
	cp package.json _package.json
	node lib/pack
	find -L . -type file \
		| grep -v ./app/ \
		| grep -v ./.git/ \
		| grep -v ./docs/ \
		| grep -v ./build/ \
		| grep -v ./answers/ \
		| grep -v ./lessons/ \
		| grep -v ./workshop/ \
		| grep -v ./exercises/ \
		| grep -v ./_package.json \
		| grep -v ./Makefile \
		| grep -v workshop.tar.gz \
		| grep -Ev "./node_modules/[^@]" \
		| tar -cvzf workshop.tar.gz -T -
	mv _package.json package.json

publish: pack
	npm publish ./workshop.tar.gz

purge: clean
	rm -rf node_modules; true
	rm -rf build; true

clean:
	rm -rf build/osx; true

optimize:
	rm -rf node_modules
	npm install --production
	npm dedupe

build: build/osx
build/osx: $(OSXFILE)

build/downloads/osx.zip:
	mkdir -p build/downloads
	test -f build/downloads/osx.zip || \
	(nw-download build/downloads/osx.zip -p osx -r $(NWVERSION)); true

$(OSXDEST): build/downloads/osx.zip
	mkdir -p build/osx
	unzip -qo -d build/osx build/downloads/osx.zip
	cp -R build/osx/node-webkit-v*-ia32/node-webkit.app $(OSXDEST)

build/osx/app.icns:
	mkdir -p build/osx
	which iconutil
	iconutil --convert icns --output build/osx/app.icns app/app.iconset

$(OSXFILE): build/osx/app.icns $(OSXDEST)
	mkdir -p $(OSXFILE)
	rm -rf $(OSXFILE)/node_modules 2> /dev/null; true
	cp -R node_modules $(OSXFILE)/node_modules
	cp -R app/* $(OSXFILE)/
	mv $(OSXFILE)/Info.plist $(OSXDEST)/Contents/Info.plist
	rm -rf $(OSXFILE)/node_modules/nw-download
	cp build/osx/app.icns $(OSXFILE)/../nw.icns
	cp exercises.json $(OSXFILE)/exercises.json

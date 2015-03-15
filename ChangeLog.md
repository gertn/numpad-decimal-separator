## Changes in version 1.1.4 (18/12/2011) ##
Refactored tests to BDD jasmine, removed qunit tests.

## Changes in version 1.1.2 (28/04/2011) ##
Added static function mergeDefaults.

Added predifined variables (SPACE and COMMA).

## Changes in version 1.0.1 ##
Minor changes to js code.
Refactored project to use eclipse with:
  * m2eclipse plugin (maven)
  * jsTestDriver plugin
  * Subclipse plugin (svn)

The project has a fully automated maven build.

The build runs on windows 7.

The tests are run in ie, firefox, chrome, opera en safari.

The jsTestDriver tests are run during the build.

The jsTestDriver tests are found in the folder src/test/resources.

The QUnit tests are still located in the tests folder.
They are not run during the build.

Refactored the demo page.

## version 1.0.0 ##
Initial version.
This project is tested with QUnit, these are located in the tests folder of the zip.
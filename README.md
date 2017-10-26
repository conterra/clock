# Clock Bundle
This bundle allows to display the user's current time and day of the month in map.apps. There are two representations available that can be selected via live configuration. The default is an analog clock which can be changed to a digital clock.

Sample App
------------------
http://www.mapapps.de/mapapps/resources/apps/downloads_clock/index.html

![Screenshot clock](https://github.com/conterra/mapapps-clock/blob/master/clock.JPG)

Installation Guide
------------------
No further Configuration is needed for your app to make this bundle work.

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`


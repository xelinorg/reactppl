#### This is a people directory crafted in react powered by uinames and duckduckgo public APIs.

The installation of the required packages for development and build is not wired to any npm script and thus has to be run manually in order to run or build the application.

The main entities are the gender and the person. The first one has the static values of Men => male, Women => female for the UI and the uinames API call.

The person is composed of the master and detail properties. The master property holds the data of a single item from the primary source list to fill the table with all the people.

When the user clicks a person from the list the name, or the surname if the former is empty, is used to make the call to the secondary source of information that is the duckduckgo API. If on the response is something that we find usable according to a selection of the Topic we dispay the extra information on the person detail card.

On the background there is an array that we push all the person entities we create with this process. The memory is checked before each call to duckduckgo for a locally stored person with uniqueness criteria the name, surname. gender and region keys of the person master property. Whatever details from secondary source are store on the detail property of the person. The collection is capped to 128 entries.

A typical sequence of action would be the following

```
# cd devdir
# git clone https://gitlab.com/ale3/reactppl.git
# cd reactppl
# npm install
# npm run start:dev
```

If the default port is available you should be able to visit the app on http://localhost:8080/. The app is not build, but instead is served from the source directory with the use of webpack-dev-server supporting live reload for the development.

Some other options are to run a build of the app and serve as a static from dist directory with the following npm script. This should serve the build on http://localhost:5000

```
# npm run start:serve
```

Enable some experimental futures with the following

With http://localhost:8080/?debug=1 some internal information gets displayed under the main content. The memory use and the http call success and fail count.

With http://localhost:8080/?pageSize=20 the amount of names to fetch from uinames is set to 20 per call.

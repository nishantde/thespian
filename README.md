# Thespian

***Please note**: The project has not been deployed yet*

Thespian - a React web app to stream content online

Not all titles are available to watch at the moment, currently being limited at the source itself

List of bugs/issues currently present and being looked at (this list will keep getting updated as more bugs pop up):
- [x] Loading component not working as intended (was not showing up for initial search)
- [ ] Custom font shenanigans (minor)
- [ ] Video source shenanigans (minor)

To-do:
- [x] Better loading animation
- [x] TV details shown on cards
- [ ] Other title types (might hide result - depending on available information)
- [ ] TV show streaming
- [x] Pagination
- [ ] Implement TV titles in the 'Known for' section
- [ ] Different loading styling for different elements
- [ ] User accounts (future update)

Pages to finish:
- [x] Attributions Page
- [x] Actor Page
- [x] Movie Streaming Page
- [ ] TV Streaming Page
- [ ] About Page
- [ ] Privacy Policy

To work on a local copy of the project 

1. Set up your local version of the app by cloning the repository with the following command:

```
$ git clone https://github.com/nishantde/thespian.git
```

2. If you don't already have Node.js installed, you can do so from [their official website](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs). You can check that the installation has been successful when it shows the version upon entering the following in your terminal:

```
$ node -v
```

3. Request API keys from [The Open Movie Database (OMDB)](https://www.omdbapi.com/) and [The Movie Database (TMDB)](https://www.themoviedb.org/).

4. Create a ```.env``` file in the root folder of the cloned repository folder (not the ```src/``` folder) and add the following three lines in the file:

```
REACT_APP_TMDB_API_KEY = '<YOUR_TMDB_API_KEY>'
REACT_APP_TMDB_API_READ_ACCESS_TOKEN = '<YOUR_TMDB_API_READ_ACCESS_TOKEN>'
REACT_APP_OMDB_API_KEY = '<YOUR_OMDB_API_KEY>'
```

It is **crucial** that your environment variables start with ```REACT_APP_``` so that React can read them into your app accurately.

The source files have already been configured to read the keys, so you need to *substitute* the keys and the token in the ```.env``` file with the values you have received.

5. Once you have entered the right values, navigate to the folder where you cloned the repository and start the developmental server by typing the following in your terminal:

```
$ npm run start
```

A browser window should open at port 3000 (```localhost:3000```) showing you the webpage.

If you encounter any other bugs, please [reach out to me](https://nishant.work/contact-me). Happy streaming!
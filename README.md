
![Thespian Logo](./src/assets/logos/thespian-logo-v2.png)

***Please note**: The project has not been deployed yet*

Thespian - a React web app to stream content online

Not all titles are available to watch at the moment, currently being limited at the source itself

![Thespian Primary Colour Scheme](./src/assets/misc/thespian-primary-colour-scheme.png)

### List of bugs/issues currently present and being looked at (this list will keep getting updated as more bugs pop up):
- [x] Loading component not working as intended
    - Was not showing up for initial search
- [ ] Custom font shenanigans (minor)
    - Multiple font weights not showing up properly
- [x] Video source shenanigans (minor)
- [x] All TV page details do not show up when visited via the 'Known for' section on an actor page
    - Was working initially but then gave error of too many re-renders
- [x] The input bar for the TV season and episode selectors do not reflect accurately
    - The media player does update accordingly (on initial load when the episode is selected, the dropdown defaulted to the number set through the code but did not reflect until the episode selected was clicked again)
- [x] TV season synopses do not properly show up if no season before the first one exists
    - Additionally, TV shows where only one season has been released do not work properly (unable to access certain parameters from within the data obtained)
- [x] Full-screen media playback still maintains the scroll gutter
    - Now removed
- [x] Requests are being continuously sent over the network for the top rated titles page
    - Currently a workaround has been applied to prevent titles from appearing twice
- [x] An extra black bar appears at the bottom of some of the pages where additional whitespace has been added
    - Added additional padding to the cards section itself so that manual whitespace does not need to be added

### To-do:
- [x] Better loading animation
- [x] TV details shown on cards
- [ ] Other title types (might hide result - depending on available information)
- [x] Interactive TV show streaming (currently this is preliminary - only shows the pilot episode)
- [x] Pagination
- [x] Implement TV titles in the 'Known for' section
- [x] Implement a different placeholder image
- [ ] Different loading styling for different elements
- [ ] Better styling of the interactive TV season and episode selector elements
- [x] Full-screen playback of video player
- [x] Stable scroll bar for pages
- [x] Full-width title display on cards (rating position to be shifted)
- [ ] Overhaul of the colour schemes used in some of the pages (Trending, Popular, etc)
- [ ] Better file/folder structuring (future update)
- [ ] Refactoring and optimizing the code (future update)
- [ ] User accounts (future update)

### Pages to finish:
- [x] Attributions Page
- [x] Actor Page
- [x] Movie Streaming Page
- [x] TV Streaming Page
- [x] Top Rated Titles Page
- [x] Popular Titles Page
- [x] Trending Titles Page
- [ ] About Page
- [ ] Privacy Policy Page
- [x] Genre Page

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
# Art View
Art View is a frontend only app made with React. The app integrates with the Reddit API using the Axios library, allowing it to fetch the latest images from the /r/pics subreddit. 


## Tech Stack : 
1) React : Offers component-based development -> easier to build complex UIs and manage states
2) Axios : Works better with React and does more work with less code (with help of named functions)
3) HTML
4) CSS
5) JavaScript
6) BootStrap : Speeds up styling process
7) React Icons : Easy integration and scalability

## External Dependencies
0) It is expected that React is installed in your system
1) Axios :  
``` 
npm install axios
```
2) React Icons :
```
npm install react-icons
```

## How does it work?
### 1) Initialization
a) When the app loads, it initializes the necessary states using the useState hook. 

b) These states include 'imageURLs' to store fetched image data, 'query' for search query, 'error' to handle any errors, 'isFullScreen' to track the full-screen mode and 'currentIndex' to keep track of the current image.

### 2) Data Fetching
a) When the app is initialized, the useEffect hook is used to fetch data from the Reddit API. It makes an asynchronous request using Axios to retrieve the JSON data from the URL: https://www.reddit.com/r/pics.json

b) The response data is then parsed through to extract the image URLs, titles and authors, which are stored in the 'imageURLs' state. If there is an error during the data fetching process, it is stored in 'error' state.

**ISSUE: The image doesn't load when the URL isn't a link to a .png file. This happens when the Reddit User has posted multiple images in the same post. I tried fixing it, but encountered errors on errors.**

### 3) Search Functionality
a) The app allows the user to give a query through a search bar to filter images by the title or author's name.

b) The 'query' state is updated with the entered value, and the 'filteredItems' function is called to filter the images based on the query. The 'getFilteredItems' function compares the lowercase query with the lowercase title and author of each image and returns the matching results.

### 4) Displaying Images
a) The images are displayed in a grid layout using CSS Grid. The 'filteredItems' array is used to generate image items. 

b) Each image item consists of an image tag, displaying the image itself, along with a caption containing the title and author. Clicking on an image triggers the 'handleImageClick' function, which sets the current index and enters full-screen mode.

### 5) Full-Screen Mode
a) When an image is clicked, the app enters full-screen mode. In full-screen mode, the selected image is displayed along with navigation buttons to navigate through the images. 

b) Clicking the navigation buttons updates the currentIndex state accordingly, allowing users to view the previous and next images. Clicking the back button (top-left) exits the full-screen mode. 

 
***This project was made by a complete beginner who just started web development so if you encounter any issue, I'm sorry in advance :)***

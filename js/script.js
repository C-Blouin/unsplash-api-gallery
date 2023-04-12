/*
JavaScript Assignment 4 - APIs

Christopher Blouin

Here is the documentation for the Random Image Unsplash API: https://unsplash.com/documentation#get-a-random-photo
*/

// Declare variables hold the selected HTML DOM elements that are being targeted.
const detailSection = document.querySelector("section");
const photoHeading = document.querySelector("h1");
const generatedImage = document.querySelector("#generatedImage");
const imageLink = document.querySelector("#imageLink");
const photoDesc = document.querySelector("#desc");
const photographer = document.querySelector("#photographer");
const unsplash = document.querySelector("#unsplash");
const change = document.querySelector("#changeImage");
/* 

Declaring variables to the selected li html elements.

Photo Detail Selectors for the unordered list elements in the HTML. There are a total of 9 li elements, so I needed a selector for each of the elements in the ul element, so I can inject specific JSON data to each of the li elements. 

*/
const photoLocation = document.querySelector("#imageDetails ul li:nth-of-type(1)");
const photographerName = document.querySelector("#imageDetails ul li:nth-of-type(2)");
const photographerUsername = document.querySelector("#imageDetails ul li:nth-of-type(3)");
const photoLikes = document.querySelector("#imageDetails ul li:nth-of-type(4)");
const totalPhotos = document.querySelector("#imageDetails ul li:nth-of-type(5)");
const instagram = document.querySelector("#imageDetails ul li:nth-of-type(6)");
const twitter = document.querySelector("#imageDetails ul li:nth-of-type(7)");
const porfolio = document.querySelector("#imageDetails ul li:nth-of-type(8)");
const photographersLocation = document.querySelector("#imageDetails ul li:nth-of-type(9)");

// Create a new anchor element for the photographers portfolio link, I am then appeding the link as a child to the 8th li element so it's clickable.
const portfolioAnchor = document.createElement("a");
porfolio.appendChild(portfolioAnchor);
// Set the inner text to a string with the value "Portfolio", this way the link is clearly labeled.
portfolioAnchor.innerText = `Portfolio`;

// Create two variables to inject into the Unsplash API url, these variables will allow for specific query results. In this cause I and searching for landscape photos, and the photo orientation is set to landscape.
const searchTerm = "landscape";
const photoOrientation = "landscape";
/* 
Declare API authorization variables.

Declare my access key to use the Unsplash API to be injected into the API url when I go to fetch the request.
*/
const accessKey = `hjx4ShB7FpCbGICGz1U5RuwG_6oNmqrsqyW67GtwfC0`;

/* 
- Set the APIs base url to a variable, with the client id equal to my accessKey.
- Inject query variables to limit the amount of returned image results by filtering for images of "landscapes" at landscape orientation.
- Since I am using the Unsplash random photo API, I need to specify in the url path the keyword "random" after photos.
*/
let url = `https://api.unsplash.com/photos/random?query=${searchTerm}&orientation=${photoOrientation}&client_id=${accessKey}`;

// Make a request using the fetch() method, passing in the APIs url I am attempting to make a fetch request to.
function changeImage() {
  fetch(url)
    // Returning the requested response as a JSON object.
    .then((response) => response.json())
    // Acessing the retrieved JSON data.
    .then((data) => {
      // Log the JSON data object to the console.
      console.log(data);

      /* 
      Set the source of the generated image to the primary url of the image. JSON object > url object > regular url within the url object.
      This allows the img element in the html to dynamically change it's image source based on the randomly generated image retrieved from the API
      */
      generatedImage.src = data.urls.regular;
      imageLink.setAttribute("href", data.links.html);
      imageLink.target = "_blank";

      /* 
      Set the href attributes for the photo credit anchor element within the html credit paragraph, setting the href for both the photographers portfolio url, and the original unsplash image url..

      I also attached a target attribute to each of the anchors to allow the url to open in a new tab.
      */
      photographer.setAttribute("href", data.user.portfolio_url);
      photographer.target = `_blank`;
      unsplash.setAttribute("href", data.links.html);
      unsplash.target = `_blank`;

      /*
      Collection of IF / ELSE statements that will determine what to display as the innerText for each of the li elements of the unordered list.

      IF the JSON object location > name data is empty (null), the text will let the user know there is no photo location provided
      
      ELSE, the innerText will display the retrieved data if present.
      */
      if (data.location.name == null) {
        photoLocation.innerText = `Photo Location Unknown`;
      } else {
        photoLocation.innerText = data.location.name;
      }

      /* 
      IF the photo description in the json object is null, display the innerText as a string letting the user know there is no description for the current image.

      ELSE display the json object data as the photoDesc innerText.
      */
      if (data.description === null) {
        photoDesc.innerText = `There is no photo description for the current image.`;
      } else {
        photoDesc.innerText = data.description;
      }

      /* 
      IF the photographers name in the json object is null, set the innerText to "Photographer's Name: Not Provided".

      ELSE display the corresponding json object data as the photographersName innerText.
      */
      if (data.user.name === null) {
        photographerName.innerText = `Photographer's Name: Not Provided`;
      } else {
        photographerName.innerText = `Photographer's Name: ${data.user.name}`;
      }

      /*
      IF the username object data is null in the retrieved JSON object, display the innerText as "Unsplash Username: Not Provided".

      ELSE, there is likely successfully retrieved data of the photographers username of current image, so display the retrieved JSON data for the photgraphers username.
      */
      if (data.user.username === null) {
        photographerUsername.innerText = `Unsplash Username: Not Provided`;
      } else {
        photographerUsername.innerText = `Unsplash Username: ${data.user.username}`;
      }

      /*
      IF the JSON object user total likes is null, display the innerText as "Total Likes: No Likes".

      ELSE, display the retrieved total likes JSON data as the innerText.
      */
      if (data.user.total_likes === null) {
        photoLikes.innerText = `Total Likes: No Likes`;
      } else {
        photoLikes.innerText = `Total Likes: ${data.user.total_likes}`;
      }

      /*
      IF the JSON object user total_photos is null, display the innerText as "Total Photos In Collection: No Photos".

      ELSE, display the retrieved total photos JSON data as the innerText.
      */
      if (data.user.total_photos === null) {
        totalPhotos.innerText = `Total Photos In Collection: No Photos`;
      } else {
        totalPhotos.innerText = `Total Photos In Collection: ${data.user.total_photos}`;
      }

      /*
      IF there is no instragram username attached to the currently displayed image, display in the li innerText "Instagram: No Instagram";

      ELSE, show the retrieved instagram username as the innerText
      */
      if (data.user.instagram_username === null) {
        instagram.innerText = `Instagram: No Instagram`;
      } else {
        instagram.innerText = `Instagram: ${data.user.instagram_username}`;
      }

      /*
      IF the twitter username is empty in the JSON object, display the innerText to "Twitter: No Twitter"
    
      ELSE, display inside the twitter li element the retrieved JSON twitter username as innerText.
      */
      if (data.user.twitter_username === null) {
        twitter.innerText = `Twitter: No Twitter`;
      } else {
        twitter.innerText = `Twitter: ${data.user.twitter_username}`;
      }

      /*
      IF the JSON data > user > location is null, set the photographersLocation li element innerText to "Photographer's Location: Not Provided" 
    
      ELSE display the photographersLocation li element innerText to the JSON data > user > location retrieved.
      */
      if (data.user.location === null) {
        photographersLocation.innerText = `Photographer's Location: Not Provided`;
      } else {
        photographersLocation.innerText = `Photographer's Location: ${data.user.location}`;
      }

      // Set the innerText of the HTML anchor element to the Photograpers name from the user object and targetting the name object.
      if (data.user.name === null) {
        // IF the name variable is empty in the user object, display the innerText of the photographer li to "Unknown Photographer" and set the href to an empty link.
        photographer.innerText = `Unknown Photographer`;
        photographer.setAttribute("href", "#");
      } else {
        // ELSE the data was retrived correctly to display the innerText as the retrieved JSON data, and set the target of the porfolio anchor to _blank to open the photographers portfolio in a new tab.
        photographer.innerText = data.user.name;
        portfolioAnchor.target = `_blank`;
      }

      // IF the portfolio URL is not retrieved for the displayed image, set the href to an empthy link and change the text content to let the user know it's not a valid link anymore.
      if (data.user.portfolio_url === null) {
        portfolioAnchor.innerText = `No Portfolio Found`;
        portfolioAnchor.href = `#`;
        // Take away the textDecoration so the user doesn't assume the element is clickable. ONLY if the portfolio url is null.
        portfolioAnchor.style.textDecoration = `none`;
      } else {
        portfolioAnchor.href = data.user.portfolio_url;
      }

      // Set the photoHeading h1 elements textContent to "UNSPLASH"
      photoHeading.textContent = `UNSPLASH`;
      // Using the style cssText property, I am injecting the data.url of the currently active random image, this image has a clipping mask applied to it to create a dynamic background text for each image
      photoHeading.style.cssText = `
      background: url(${data.urls.regular});
      background-size: cover;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      `;
    })
    // IF there are any errors with the request to the API or retrieving JSON data, catch and display the error to the screen with the corresponding error message. eg, 404 Not Found, 403 Forbidden.
    .catch((error) =>
      console.error(`Data Could Not Be Retrieved! ${error.message}.`)
    );
}

// I'm using the event listener on the window object, waiting for the "load" to occur, it will then call the changeImage function, which then fetches JSON data to displayed to the screen.
window.addEventListener("load", function () {
  // Here the window.eventListener function will invoke the changeImage function, so that an image and the descriptive content will immediately load.
  changeImage();
});

/* 
The above window event listening will execute an initial image and descriptive content, and the change button event listener will allow content to dynamically change based on each additional click. 

Attach a click event to the change variable which is the HTML button. On click it will invoke the changeImage function, which will return a new set of fetched information from the retrieved API JSON object.
*/
change.addEventListener("click", changeImage);

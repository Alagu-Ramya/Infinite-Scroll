const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready=false;
let imagesLoaded = 0;
totalImages= 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = "iT1k2XsnPcCQBgg9kyKywm5cXJT9hrY29POYEYsfWbY";
//TTnqs8znt9DOXVJKCAuMljnYDyMqAWVa6RIQEoTXxc8
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
   // console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
     //   console.log('ready =', ready);
    }
}

//Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for Links & photos,Add to DOM
 function displayPhotos() {
  try {
      imagesLoaded = 0;
      totalImages= photosArray.length;
     // console.log('total images', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo, index) => {
      //Create <a> to link to Unsplash
      const item = document.createElement("a");
      setAttributes(item, {
        href: photo.links.html,
        target: "_blank",
      });
      //Create <img> for photo
      const img = document.createElement("img");
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      // Event Listener, check when each is finished loading
      img.addEventListener('load', imageLoaded);

      //Put <img> inside <a>, then put both inside imageContainer element
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  } catch (error) {
    console.error(error);
  }
}

//Check to see if scrolling near bottom page, Load more photos
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        ready=false;
        getPhotos();
        
    }
    
});

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error
  }
}

//On Load
getPhotos();

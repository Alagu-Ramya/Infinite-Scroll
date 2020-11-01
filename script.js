const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'Tr2LPl21xuIeFfh1ZHJjT8yu5ckLxSYuUd61kG2dM0A';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for Links & photos,Add to DOM
function displayPhotos(){
    //Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        console.log(photo);
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href, photo.links.html');
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.url.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        console.log(img);
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

});
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
        
    } catch (error) {
        //Catch error
    }
}

//On Load
getPhotos();
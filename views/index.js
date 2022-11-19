let image64;
let image = [];

async function getImageData(){
var image_response = await fetch('user/upload');
const image_data = await image_response.json();
console.log(image_data[0].imagename);
for (let i = 0; i < image_data.length; i++) {
    image[i] = image_data[i].imagename;
}
displayimages();

}
getImageData();

function displayimages(){
    var image_new_element = [];
    for (let i = 0; i < image.length; i++) {
    image_new_element[i] = document.createElement("img");
    image_new_element[i].classList.add('images_style');
    image_new_element[i].src = image[i];
    var button_submit_location = document.querySelector('.ci');
    button_submit_location.appendChild(image_new_element[i]);
    }
}
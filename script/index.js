function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");

  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // 1.  fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   2. convert promise to json
    .then((res) => res.json())
    // 3. send data to display
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      
      displayVideos(data.videos);
    });
}
//
//     "category_id": "1001",
//     "category": "Music"
//

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");
      console.log(clickedBtn);

      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // Loop operation on array of object
  for (let cat of categories) {
    // console.log(cat);
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = ` 
        
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>             
        
        `;
    // append the element
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col justify-center items-center py-20">
    <img class="w-[120px]" src="./assets/Icon.png" alt="">
    <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
  </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
<div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover "
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white text-sm bg-black rounded px-2 ">3hrs 56 min ago</span>
            </figure>
            <div class="py-5 flex gap-3 px-0">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm flex gap-1 text-gray-400">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views}views</p>
              </div>
            </div>
          </div>

            `;
    videoContainer.append(videoCard);
  });
};

loadCategories();

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

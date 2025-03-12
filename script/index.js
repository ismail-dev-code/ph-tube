const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};

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

function loadVideos(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");

      displayVideos(data.videos);
    });
}

function loadVideoDetails(videoId) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
                            <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  `;
};

const loadCategoryVideos = (id) => {
  showLoader();
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
    hideLoader();
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
                <p class="text-sm flex gap-1 text-gray-400">${
                  video.authors[0].profile_name
                } ${
      video.authors[0].verified == true
        ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">`
        : ``
    } </p>
                <p class="text-sm text-gray-400">${video.others.views}views</p>
              </div>
            </div>
            <button onclick="loadVideoDetails('${
              video.video_id
            }')" class="btn btn-block">Show Details</button>
          </div>

            `;
    videoContainer.append(videoCard);
  });
  hideLoader();
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
});

loadCategories();

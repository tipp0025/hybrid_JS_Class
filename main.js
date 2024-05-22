console.log("Script Linked");
let cacheName = "testCache";
const url = "https://picsum.photos/v2/list";
const headers = new Headers({
  "Cache-Control": "max-age=3600",
});

// Fetch image from Lorem Picsum and store in cache

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    let data = response.json();
    return data;
  })
  .then((data) => {
    console.log(data);
    let arrayUrls = data.map((item) => item.download_url);
    console.log(arrayUrls);
    return arrayUrls;
  })
  //blob for multiple images
  .then((arrayUrls) => {
    arrayUrls.forEach((blobUrl) => {
      console.log(blobUrl);
      fetch(blobUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          let newResponse = new Response(blob);
          caches.open(cacheName).then((cache) => {
            cache.put(blobUrl, newResponse);
            console.log("Blobs stored in cache");
            document.getElementById("image").src = URL.createObjectURL(blob);
          });
        })
        .catch((error) => {
          console.error("An error occured:", error);
        });
    });
  })
  // Blob for single image
  /*
  .then((blob) => {
    console.log("Blob created:", blob);
    let newResponse = new Response(blob);
    caches.open(cacheName).then((cache) => {
      cache.put(URL, newResponse);
      headers: headers;
      console.log("Blob stored in cache");
      document.getElementById("image").src = URL;
    });
  })*/
  .catch((error) => {
    console.error("An error occured:", error);
  });

// Retrieve image from cache

// Store Response as blob in cache

// Retrieve image from cache

// Handle Cache Expiration, ensure outdated images are refreshed

//Provide error handling for network/cache issues

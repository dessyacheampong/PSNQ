document.addEventListener("DOMContentLoaded", () => {
   const gallery = document.getElementById("gallery");

   // Fetch images from the server
   fetch("fetch_images.php")
      .then(response => response.json())
      .then(images => {
         images.forEach(image => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";
            col.innerHTML = `
               <div class="card">
                  <img src="${image.image_path}" class="card-img-top" alt="Image">
                  <div class="card-body text-center">
                     <button class="btn btn-outline-primary like-btn" data-id="${image.id}">
                        Like <span class="badge bg-primary">${image.likes}</span>
                     </button>
                  </div>
               </div>
            `;
            gallery.appendChild(col);
         });

         // Like button functionality
         document.querySelectorAll(".like-btn").forEach(btn => {
            btn.addEventListener("click", () => {
               const id = btn.getAttribute("data-id");
               fetch("like.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: `id=${id}`
               }).then(() => {
                  const badge = btn.querySelector(".badge");
                  badge.textContent = parseInt(badge.textContent) + 1;
               });
            });
         });
      });
});

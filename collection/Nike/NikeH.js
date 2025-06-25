document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.getElementById('product-list-NikeH');
  let allProducts = [];

  fetch('collection/Nike/NikeH.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;

      data.products.forEach((product, index) => {
        const productCardHTML = `
  <div class="swiper-slide">
    <div class="best_shoes" style="border: 1px solid #ddd; padding: 15px;">
      <p class="best_text"><strong>${product.name}</strong></p>
      <div class="shoes_icon">
        <img src="${product.image_url}" alt="${product.name}" class="img-responsive" style="max-height: 180px;">
      </div>
      <div class="star_text d-flex justify-content-between">
        <div>
          ${'<img src="images/star-icon.png" style="width:16px;">'.repeat(product.rating)}
        </div>
        <div class="shoes_price">Price: <span style="color:#ff4e5b;">$${product.price}</span></div>
      </div>
      <div class="text-center mt-2">
        <button class="btn btn-success" onclick="showProductDetail(${index})">View Detail</button>
      </div>
    </div>
  </div>
        `;
        productContainer.innerHTML += productCardHTML;
      });
    });

  window.showProductDetail = function (index) {
    const product = allProducts[index];
    const modalBody = document.getElementById('modal-content');

    const generateThumbnailGallery = (images) => {
      const mainImgId = `main-img-${Date.now()}`;
      const thumbsHTML = images.map(img => `
        <img src="${img}" class="img-thumbnail m-1 thumb-img" style="width: 70px; cursor: pointer;" onclick="document.getElementById('${mainImgId}').src='${img}'">
      `).join('');

      return `
        <div class="text-center">
          <img id="${mainImgId}" src="${images[0]}" class="img-fluid mb-2" style="max-height: 300px;">
          <div class="d-flex justify-content-center flex-wrap">${thumbsHTML}</div>
        </div>
      `;
    };

    const colorOptions = product.colors.map((c, i) => `<option value="${i}">${c.color}</option>`).join('');
    const sizeOptions = (product.sizes || ["8US", "9US", "10US"]).map(size => `<option value="${size}">${size}</option>`).join('');
    const selectedColor = product.colors[0];
    const galleryHTML = generateThumbnailGallery(selectedColor.images);

    modalBody.innerHTML = `
      <div class="row">
        <div class="col-sm-6 image-gallery">${galleryHTML}</div>
        <div class="col-sm-6">
          <h3>${product.name}</h3>
          <p><strong>Price:</strong> $${product.price}</p>
          <div class="form-group">
            <label>Color:</label>
            <select class="form-control" id="color-select">${colorOptions}</select>
          </div>
          <div class="form-group">
            <label>Size:</label>
            <select class="form-control" id="size-select">${sizeOptions}</select>
          </div>
          <button class="btn btn-success mt-2" onclick="addToCart(${index})">Add to cart</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      document.getElementById('color-select').addEventListener('change', (e) => {
        const colorIndex = parseInt(e.target.value);
        const newImages = product.colors[colorIndex].images;
        document.querySelector('.image-gallery').innerHTML = generateThumbnailGallery(newImages);
      });
    }, 0);

    $('#productModal').modal('show');
  };

  window.addToCart = function (index) {
    const product = allProducts[index];
    const selectedColorIndex = document.getElementById('color-select')?.value;
    const selectedSize = document.getElementById('size-select')?.value;

    if (!selectedColorIndex || !selectedSize) {
      alert("Select color or size");
      return;
    }

    const selectedColor = product.colors[selectedColorIndex];
    const cartItem = {
      name: product.name,
      price: product.price,
      color: selectedColor.color,
      size: selectedSize,
      image_url: selectedColor.images[0]
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Add to cart Successful!");
    $('#productModal').modal('hide');
  };
});

new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    }
  }
});

new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loop: true,
});
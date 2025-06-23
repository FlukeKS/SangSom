document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.getElementById('product-list-container');
  let allProducts = [];

  fetch('product.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;

      data.products.forEach((product, index) => {
        const productCardHTML = `
          <div class="col-sm-4">
            <div class="best_shoes" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
              <p class="best_text"><strong>${product.name}</strong></p>
              <div class="shoes_icon">
                <img src="${product.image_url}" alt="${product.name}" class="img-responsive">
              </div>
              <div class="star_text">
                <div class="left_part">
                  <ul style="list-style: none; padding-left: 0;">
                    ${'<li style="display:inline;"><img src="images/star-icon.png" alt="star"></li>'.repeat(product.rating)}
                  </ul>
                </div>
                <div class="right_part">
                  <div class="shoes_price">Price: $<span style="color: #ff4e5b;">${product.price}</span></div>
                </div>
              </div>
              <div class="text-center" style="margin-top: 10px;">
                <button class="btn" style="background-color: green; color: white;" onclick="showProductDetail(${index})">View Detail</button>

              </div>
            </div>
          </div>
        `;
        productContainer.innerHTML += productCardHTML;
      });
    });

  window.showProductDetail = function(index) {
    const product = allProducts[index];
    const modalBody = document.getElementById('modal-content');

    modalBody.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <img src="${product.image_url}" alt="${product.name}" class="img-responsive">
        </div>
        <div class="col-sm-6">
          <h3>${product.name}</h3>
          <p><strong>Price:</strong> $${product.price}</p>
          <p>${product.detail || "No Detail"}</p>
          <button class="btn btn-success" style="background-color: green; color: white;" onclick="addToCart(${index})">Add to cart</button>
        </div>
      </div>
    `;

    $('#productModal').modal('show');
  };

  window.addToCart = function(index) {
    const product = allProducts[index];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Add to cart Successful!");
    $('#productModal').modal('hide');
  };
});

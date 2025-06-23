document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('product-list-container');
  
    fetch('product.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('ไม่สามารถโหลด product.json ได้: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const products = data.products;
  
        products.forEach(product => {
          const productCardHTML = `
            <div class="col-sm-4">
              <div class="best_shoes">
                <p class="best_text">${product.name}</p>
                <div class="shoes_icon">
                  <img src="${product.image_url}" alt="${product.name}">
                </div>
                <div class="star_text">
                  <div class="left_part">
                    <ul>
                      ${'<li><a href="#"><img src="images/star-icon.png" alt="star"></a></li>'.repeat(product.rating)}
                    </ul>
                  </div>
                  <div class="right_part">
                    <div class="shoes_price">$ <span style="color: #ff4e5b;">${product.price}</span></div>
                  </div>
                </div>
                <div style="text-align:center; margin-top: 10px;">
                  <a href="detail.html?name=${encodeURIComponent(product.name)}" class="btn btn-primary">ดูรายละเอียด</a>
                </div>
              </div>
            </div>
          `;
          productContainer.innerHTML += productCardHTML;
        });
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
        productContainer.innerHTML = '<p style="text-align: center;">เกิดปัญหาในการโหลดข้อมูลสินค้า</p>';
      });
  });
  
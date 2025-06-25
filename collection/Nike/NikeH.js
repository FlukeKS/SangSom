let allProducts = []; // ต้องอยู่นอก fetch!

document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.getElementById('product-list-NikeH');

  fetch('collection/Nike/NikeH.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;

      data.products.forEach((product, index) => {
        const productCardHTML = `
          <div class="swiper-slide">
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
                <button class="btn view-detail-btn" data-index="${index}" style="background-color: green; color: white;">View Detail</button>
              </div>
            </div>
          </div>
        `;
        productContainer.innerHTML += productCardHTML;
      });

      // ❗ ต้อง init Swiper หลังจากเพิ่ม slide เข้า DOM แล้ว
      new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
        // ป้องกันการรบกวน click ปุ่ม
        touchStartPreventDefault: false,
      });

      // ✅ แก้ปัญหาปุ่ม View Detail กดไม่ติด + Swiper เลื่อนเอง
      document.querySelectorAll('.view-detail-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
          e.stopPropagation(); // สำคัญมาก
          const index = this.getAttribute('data-index');
          showProductDetail(index);
        });
      });
    });
});
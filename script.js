// รอให้เอกสาร HTML โหลดเสร็จสมบูรณ์ก่อนเริ่มทำงาน
document.addEventListener('DOMContentLoaded', function() {

    // ระบุตำแหน่งที่เราจะนำสินค้าไปแสดง (จาก id ที่เราตั้งไว้ใน HTML)
    const productContainer = document.getElementById('product-list-container');

    // เริ่มกระบวนการดึงข้อมูลจากไฟล์ products.json
    fetch('product.json')
        .then(response => {
            // ตรวจสอบว่าการร้องขอสำเร็จหรือไม่
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // แปลงข้อมูลที่ได้รับ (response) ให้เป็น JSON object
            return response.json();
        })
        .then(data => {
            // ตอนนี้ data คือ object ที่มี key 'products' เป็น array ของสินค้า
            const products = data.products;

            // วนลูปสินค้าแต่ละชิ้นใน array
            products.forEach(product => {
                // สร้างโค้ด HTML สำหรับสินค้า 1 ชิ้น โดยใช้ข้อมูลจาก object 'product'
                // ใช้ backticks (`) เพื่อสร้าง string ที่มีหลายบรรทัดและแทรกตัวแปรได้ง่าย
                const productCardHTML = `
                    <div class="col-sm-4">
                        <div class="best_shoes">
                            <p class="best_text">${product.name}</p>
                            <div class="shoes_icon"><img src="${product.image_url}" alt="${product.name}"></div>
                            <div class="star_text">
                                <div class="left_part">
                                    <ul>
                                        <li><a href="#"><img src="images/star-icon.png"></a></li>
                                        <li><a href="#"><img src="images/star-icon.png"></a></li>
                                        <li><a href="#"><img src="images/star-icon.png"></a></li>
                                        <li><a href="#"><img src="images/star-icon.png"></a></li>
                                        <li><a href="#"><img src="images/star-icon.png"></a></li>
                                    </ul>
                                </div>
                                <div class="right_part">
                                    <div class="shoes_price">$ <span style="color: #ff4e5b;">${product.price}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // นำโค้ด HTML ของการ์ดสินค้าที่สร้างเสร็จ ไปแทรกต่อท้ายใน container
                productContainer.innerHTML += productCardHTML;
            });
        })
        .catch(error => {
            // แสดงข้อผิดพลาดใน Console ของเบราว์เซอร์ หากมีปัญหาเกิดขึ้น
            console.error('There has been a problem with your fetch operation:', error);
            // แสดงข้อความบอกผู้ใช้บนหน้าเว็บ
            productContainer.innerHTML = '<p style="text-align: center; width: 100%;">เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า กรุณาลองใหม่อีกครั้ง</p>';
        });
});
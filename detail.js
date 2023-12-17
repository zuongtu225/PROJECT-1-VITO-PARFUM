// ---------------------_____________LOCAL _____________----------------------begin
const authUser = JSON.parse(localStorage.getItem("authUser"));
const usersAccounts = JSON.parse(localStorage.getItem("usersAccounts")) || [];
const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts")) || [];
const userLogin = usersAccounts.find((user) => user.id === authUser?.id);

// ---------------------_____________LOCAL _____________----------------------end
// ---------------------_____________CHUYỂN TRANG _____________----------------------begin
const login = document.querySelector(".account");
login.addEventListener("click", () => {
  window.location.href = "../Page/login.html";
});

const goToCart = document.getElementById("addCart");
goToCart.addEventListener("click", () => {
  window.location.href = "./Page/cart.html";
});
const logoutUser = document.querySelector(".logout");
logoutUser.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  window.location.href = "./Page/login.html";
});
// ---------------------_____________CHUYỂN TRANG  _____________----------------------end

if (authUser) {
  render_user();
}
//render user
function render_user() {
  const user = document.querySelector("#nameUser");
  user.innerHTML = authUser.name;
  const loginAccount = document.querySelector("#loginAccount");
  loginAccount.style.display = "none";
  const iconLogout = document.querySelector(".logout");
  iconLogout.style.display = "inline-block";
  iconLogout.style.color = "red";
}

//lấy id sản phẩm cần detail_______________________
const productDetail = JSON.parse(localStorage.getItem("productDetail"));
renderDetail();
function renderDetail() {
  const print = document.querySelector(".card-wrapper");
  let content = `   
  <div class="card">
    <!-- cart left> -->
    <div class="product-imgs">
      <div class="img-display">
        <div class="img-showcase">
          <img src="./img/${productDetail.img}" alt="" />
          <img src="../img/${productDetail.imgDetail}" alt="" />
        
        </div>
      </div>
      <div class="img-select">
        <div class="img-item">
          <a href="#" data-id="1">
            <!-- Thuộc tính "data-id" là một thuộc tính không tiêu chuẩn 
            và được tạo ra để lưu trữ dữ liệu tùy ý cho một phần tử HTML -->
            <img src="./img/${productDetail.img}" alt="show image" />
          </a>
        </div>
        <div class="img-item">
          <a href="#" data-id="2">
            <img src="../img/${productDetail.imgDetail}" alt="show image" />
          </a>
        </div>
      
      
      </div>
    </div>
    <!-- cart main> -->
    <div class="card-content">
      <div class="card-content-top">
        <h3 class="name">${productDetail.name}</h3>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          <p>1 đánh giá</p>
          <p>${productDetail.gender}</p>
        </div>
        <p>Thương hiệu: <b>${productDetail.brand}</b></p>
        <div class="type">
          <p>Eau de Parfum 100ml</p>
          <p class="new">New</p>
          <p class="editon">Limited Edition</p>
        </div>
        <p>Standard Size</p>
        <div class="standard-size">
          <div class="size-ml">
            <img src="./img/${productDetail.imgDetail}" alt="" />
            <p>Eau de Parfum 100ml</p>
          </div>
          <div class="size-ml">
            <img src="./img/${productDetail.imgDetail}" alt="" />
            <p>Eau de Parfum 200ml</p>
          </div>
          <div class="size-ml">
            <img src="./img/${productDetail.imgDetail}" alt="" />
            <p>Eau de Parfum 300ml</p>
          </div>
        </div>
      </div>
      <div class="content-ship">
        <div class="ship">
          <i class="fa-solid fa-truck-fast"></i>
          <p>Freeship toàn quốc</p>
        </div>
        <div class="ship">
          <i class="fa-regular fa-square-check"></i>
          <p>Chính hãng 100%</p>
        </div>
        <div class="ship">
          <i class="bx bx-transfer-alt"></i>
          <p>Đổi trả miễn phí</p>
        </div>
      </div>
      <p class="call">
        Gọi đặt mua <i class="fa-solid fa-phone"></i> 0935 27 61 88
      </p>
    </div>
    <!-- cart right> -->
    ${
      !authUser
        ? `<p>Bạn chưa đăng nhập ko thể mua</p>`
        : `
    <div class="product-shopping">
        <p class="last-price">30.000.000 ₫</p>
        <p class="new-price">27.500.000 ₫</p>
        <p>Tiết kiệm: 10%</p>
        <p>CÒN HÀNG</p>
        <div class="store-near">
          <i class="fa-solid fa-store"></i>
          <p>Cửa hàng gần bạn</p>
        </div>
        <div class="quantity">
          <p>Số lượng:</p>
          <input type="number" min="0" value="1" id="quantityAdd"/>
        </div>
        <button class="addCart" onclick="addCart(${productDetail.id})">Thêm vào giỏ hàng</button>
        <button class="buyNow">Mua ngay</button>
        <button class="favorite hide-tablet">
          <i class="fa-regular fa-heart"></i>
          <p>Yêu thích</p>
        </button>
      </div>
          `
    }
  </div>`;
  print.innerHTML = content;
}
const cartUser = userLogin?.cart;
function addCart(id) {
  const quantityAdd = Number(document.querySelector("#quantityAdd").value);
  const productClick = productsLocal.find((product) => product.id === id);
  let productOder = {};
  console.log(productClick, quantityAdd);
  if (cartUser.length === 0) {
    productOder = {
      ...productClick,
      id: 0,
      orderQty: quantityAdd,
      idUser: authUser.id,
      idClick: productClick.id,
    };
  } else {
    const maxId = Math.max(...cartUser.map((item) => item.id));
    productOder = {
      ...productClick,
      id: maxId + 1,
      orderQty: quantityAdd,
      idUser: authUser.id,
      idClick: productClick.id,
    };
  }
  const productCheck = cartUser.find(
    (product) => product.idClick === productClick.id
  );
  if (productCheck) {
    productCheck.orderQty += quantityAdd;
  } else {
    cartUser.push(productOder);
  }

  localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
  const length = document.querySelector("#length-cart");
  length.innerHTML = cartUser.length;
}

// ---------------------_____________SLIDER_____________----------------------start
const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [...imgs];
let imgId = 1;
imgBtns.forEach((imgItem) => {
  imgItem.addEventListener("click", (e) => {
    e.preventDefault();
    imgId = imgItem.dataset.id;
    slideImage();
  });
});
function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;
  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}
window.addEventListener("resize", slideImage);
// ---------------------_____________SLIDER_____________----------------------end
showNavDetail("detail");
function showNavDetail(type) {
  const containerRender = document.querySelector(".page-product-content-left");
  const aDetail = document.getElementById("aDetail");
  aDetail.style.borderBottom = "5px solid rgb(8, 8, 8)";
  const aComment = document.getElementById("aComment");
  aComment.style.borderBottom = "none";
  if (type == "detail") {
    containerRender.innerHTML = ` 
    <div class="detail-prodcut">
      <div class="product-atribute">
        <ul>
          <li>
            <span>Mã hàng </span>
            <p>110103030202</p>
          </li>
          <li>
            <span>Thương hiệu</span>
            <p>Naciso</p>
          </li>
          <li>
            <span>Xuất xứ </span>
            <p>Pháp</p>
          </li>
          <li>
            <span>Năm phát hành </span>
            <p>2023</p>
          </li>
          <li>
            <span>Nhóm hương</span>
            <p>Xạ Hương, Quảng Hoắc Hương, Hoa Sứ, Hoa Nhài</p>
          </li>
          <li>
            <span>Phong cách </span>
            <p>Thanh lịch, Cuốn hút, Sang trọng</p>
          </li>
        </ul>
        <div class="content-detail-more">
          <img src="./img/${productDetail.imgDetail}">
          <p>
            Hương hoa, với tôi, là "nàng thơ" của ngành thơm. Không chỉ
            bởi vẻ đẹp mỹ miều mà chúng trưng ra, mà còn nằm ở sự đa
            hương, biến hoá khôn lường trong các nốt hương hoa khác
            nhau. Mà trong đó, nhóm Hoa trắng lại được ưu ái khoác lên
            người ngôi vương, chễm chệ ở vị trí độc tôn bởi nét hương
            quyến luyến, nồng nàn đặc trưng. Để mà kể tên thì thế giới
            hương này không thiếu những ấn phẩm chưng cất mùi hương của
            Hoa trắng, từ rất da thịt "đàn bà", cho đến tươi tắn ngây
            ngô, với tôi mà nói thì nét tính cách nào được thể hiện ra
            cũng đều đáng chiêm ngưỡng. Narciso Rodriguez for Her
            Forever là một nét hương thuộc vế sau, Hoa trắng thơm ngát,
            lan toả mãnh liệt nhưng lẫn đâu đấy vẫn còn lại nét trong
            trẻo và hồn nhiên đến lạ.
          </p>

        </div>
      </div>
    </div>`;
  } else {
    const aComment = document.getElementById("aComment");
    aComment.style.borderBottom = "5px solid rgb(8, 8, 8)";
    const aDetail = document.getElementById("aDetail");
    aDetail.style.borderBottom = "none";
    containerRender.innerHTML = ` <div class="comment">
    <div class="preview">
      <h3>Đánh giá sản phẩm</h3>
    </div>
    <div class="comment-header-wrapper">
      <div class="star-wrapper">
        <p>4.5 trên 5</p>
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
      </div>
      <div class="title-comment-warpper">
        <div class="title-item">
          <p>Tất Cả</p>
        </div>
        <div class="title-item">
          <p>5 sao</p>
        </div>
        <div class="title-item">
          <p>4 sao</p>
        </div>
        <div class="title-item">
          <p>3 sao</p>
        </div>
        <div class="title-item">
          <p>2 sao</p>
        </div>
        <div class="title-item">
          <p>1 sao</p>
        </div>
        <div class="title-item">
          <p>Có Bình Luận</p>
        </div>
        <div class="title-item">
          <p>Có Hình Ảnh</p>
        </div>
      </div>
    </div>
    <!-- feedback of customer-->
    <div class="feedback-customer-wrapper">
      <div class="logo-customer">
        <div class="circle-logo">
          <img src="./img/user/user2.jpg" alt="" />
        </div>
      </div>
      <div class="feedback-product">
        <p class="username">vito</p>
        <div class="star-feedback-wrapper">
          <p>4.5 trên 5</p>
          <div class="star-feedback">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div class="time-feed-back">
            <p class="day">9-9-2023</p>
            <p class="hour">09:19</p>
          </div>
          <p class="quality">Chất lượng sản phẩm <span>Tốt</span></p>
          <p class="content-feedback">Rất chi là ok. Thơm vãi ra</p>
          <div class="rating-media-list">
            <video
              autoplay
              controls
              src="./video/videoFeedBack.mp4"
              mute
            ></video>
            <img src="./img/Nam/gucci/detail4.png" alt="" />
            <img src="./img/Nam/gucci/detail10.webp" alt="" />
          </div>
          <div class="rating-action">
            <i class="fa-regular fa-thumbs-up"></i>
            <p class="length-likes">100</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="feedback-customer-wrapper">
      <div class="logo-customer">
        <div class="circle-logo">
          <img src="./img/user/user1.jpeg" alt="" />
        </div>
      </div>
      <div class="feedback-product">
        <p class="username">vito</p>
        <div class="star-feedback-wrapper">
          <p>4.5 trên 5</p>
          <div class="star-feedback">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div class="time-feed-back">
            <p class="day">9-9-2023</p>
            <p class="hour">09:19</p>
          </div>
          <p class="quality">Chất lượng sản phẩm <span>Tốt</span></p>
          <p class="content-feedback">Rất chi là ok. Thơm vãi ra</p>
          <div class="rating-media-list">
            <video
              autoplay
              controls
              src="./video/videoFeedBack.mp4"
              mute
            ></video>
            <img src="./img/Nam/gucci/detail7.jpg" alt="" />
            <img src="./img/Nam/gucci/detail2.jfif" alt="" />
          </div>
          <div class="rating-action">
            <i class="fa-regular fa-thumbs-up"></i>
            <p class="length-likes">100</p>
          </div>
        </div>
      </div>
    </div>
    <div class="feedback-customer-wrapper">
      <div class="logo-customer">
        <div class="circle-logo">
          <img src="./img/user/user2.jpg" alt="" />
        </div>
      </div>
      <div class="feedback-product">
        <p class="username">vito</p>
        <div class="star-feedback-wrapper">
          <p>4.5 trên 5</p>
          <div class="star-feedback">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div class="time-feed-back">
            <p class="day">9-9-2023</p>
            <p class="hour">09:19</p>
          </div>
          <p class="quality">Chất lượng sản phẩm <span>Tốt</span></p>
          <p class="content-feedback">Rất chi là ok. Thơm vãi ra</p>
          <div class="rating-media-list">
            <video
              autoplay
              controls
              src="./video/videoFeedBack.mp4"
              mute
            ></video>
            <img src="./img/Nam/gucci/detail4.png" alt="" />
            <img src="./img/Nam/gucci/detail10.webp" alt="" />
          </div>
          <div class="rating-action">
            <i class="fa-regular fa-thumbs-up"></i>
            <p class="length-likes">100</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}

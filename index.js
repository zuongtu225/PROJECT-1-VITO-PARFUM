const authUser = JSON.parse(localStorage.getItem("authUser"));
const authAdmin = JSON.parse(localStorage.getItem("authAdmin"));

const loginAccount = document.querySelector("#loginAccount");
loginAccount.addEventListener("click", () => {
  window.location.href = "../Page/login.html";
});
const cartRender = document.querySelector("#cartRender");
cartRender.addEventListener("click", () => {
  window.location.href = "./Page/cart.html";
});
//log out user
const logoutUser = document.querySelector(".logout");
logoutUser.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  window.location.href = "./Page/login.html";
});
//log out admin
const logoutAdmin = document.querySelector(".logout");
logoutAdmin.addEventListener("click", () => {
  localStorage.removeItem("authAdmin");
  window.location.href = "./Page/login.html";
});
// chuyển trang_________________________________________________________________________end
if (authUser) {
  render_user();
} else {
  const length = document.querySelector("#length-cart");
  length.innerHTML = 0;
}
//render user
function render_user() {
  const loginAccount = document.querySelector("#loginAccount");
  loginAccount.style.display = "none";
  const profile = document.querySelector("#profile");
  profile.style.display = "flex";
  profile.addEventListener("click", () => {
    window.location.href = "./Page/profileUser.html";
  });

  const user = document.querySelector("#nameUser");
  user.innerHTML = authUser.name;

  const iconLogout = document.querySelector(".logout");
  iconLogout.style.display = "inline-block";
  iconLogout.style.color = "red";
}

//authAdmin admin ở bên login chuyển tới
if (authAdmin) {
  render_admin();
}
//render admin
function render_admin() {
  const loginAccount = document.querySelector("#loginAccount");
  loginAccount.style.display = "none";
  const profile = document.querySelector("#profile");
  profile.style.display = "flex";
  const cart = document.querySelector(".cart");
  const user = document.querySelector("#nameUser");
  const homeAdmin = document.querySelector(".home-admin");

  const iconLogout = document.querySelector(".logout");
  homeAdmin.style.display = "inline-block";
  cart.style.display = "none";
  iconLogout.style.display = "inline-block";
  iconLogout.style.color = "red";
  user.innerHTML = authAdmin.name;
}

// _____SLIDER___BIG_________________________________________________________________start
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let lengthItems = items.length - 1; //vì nó đếm từ 0 mà "ví dụ 0 1 2 số lượng 3 -1 còn 2 item"
next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active += 1;
  }
  reloadSlider();
};
prev.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active -= 1;
  }
  reloadSlider();
};
function reloadSlider() {
  let checkleft = items[active].offsetLeft; //item đang được "active"
  list.style.left = -checkleft + "px"; // di chuyển khung item sang trái
  let lastActiveDot = document.querySelector(".slider .dots li.active");
  //li.active là <li> trỏ tới class "active"
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active"); //thêm active vào dots
  clearInterval(refreshSlider); //dừng hành vi autoplay khi click
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000); //nó chạy sau 3s click
}
dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
let refreshSlider = setInterval(() => {
  next.click();
}, 5000);
// __________________________SLIDER_small_______________________________________________start
sliderSmall();
function sliderSmall() {
  let list = document.querySelector(".slider-small .list-small");
  let items = document.querySelectorAll(
    ".slider-small .list-small .item-small"
  );
  let dots = document.querySelectorAll(".slider-small .dots li");

  let active = 0;
  let lengthItems = items.length - 1;

  function reloadSlider() {
    if (active + 1 > lengthItems) {
      active = 0;
    } else {
      active += 1;
    }

    let checkleft = items[active].offsetLeft;
    list.style.left = -checkleft + "px";

    let lastActiveDot = document.querySelector(".slider-small .dots li.active");
  }
  let refreshSlider = setInterval(() => {
    reloadSlider();
  }, 3000);  
}

const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));

dealFragrant();
function dealFragrant() {
  const print = document.querySelector(".deal-fragrant");
  let content = "";

  const newProducts = productsLocal.filter(
    (item) => item.isDealFragrant === false
  );
  const productsNeed = newProducts.slice(5, 15);
  productsNeed.forEach((product, index) => {
    content += `<div class="product" >
    <div class="buy-now-container">
      <img src="./img/${product.img}" alt="" />
      <button>MUA NGAY</button>
    </div>
    <div class="content-product" >

      <p class="brand-title-product">${product.brand}</p>
      <p class="name-product" onclick="renderDetails('${product.id}')">${
      product.name
    }</p>
      <div class="price-cart-add">
      <p class="price-product">${product.price.toLocaleString()} đ</p>
     ${
       authUser
         ? `<i  onclick="addCart('${product.id}')" class="bx bx-cart-add"></i>`
         : ""
     } 
    </div>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}
newArrivals();
function newArrivals() {
  const print = document.querySelector(".newArrivals");
  let content = "";

  const newProducts = productsLocal.filter((item) => item.isNew === true);
  const productsNeed = newProducts.slice(12, 20);
  productsNeed.forEach((product, index) => {
    content += `<div class="product" >
    <div class="buy-now-container">
      <img src="./img/${product.img}" alt="" />
      <button>MUA NGAY</button>
    </div>
    <div class="content-product" >
      <p class="brand-title-product">${product.brand}</p>
      <p class="name-product" onclick="renderDetails('${product.id}')">${
      product.name
    }</p>
      <div class="price-cart-add">
      <p class="price-product">${product.price.toLocaleString()} đ</p>
     ${
       authUser
         ? `<i  onclick="addCart('${product.id}')" class="bx bx-cart-add"></i>`
         : ""
     } 
    </div>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}
bestSeller();
function bestSeller() {
  const print = document.querySelector(".best-seller");
  let content = "";

  const newProducts = productsLocal.filter(
    (item) => item.isBestSeller === false
  );
  const productsNeed = newProducts.slice(6, 16);
  productsNeed.forEach((product, index) => {
    content += `<div class="product">
    <div class="buy-now-container">
      <img src="./img/${product.img}" alt="" />
      <button>MUA NGAY</button>
    </div>
    <div class="content-product"  >
      <p class="brand-title-product">${product.brand}</p>
      <p class="name-product"onclick="renderDetails('${product.id}')">${
      product.name
    }</p>
      <div class="price-cart-add">
      <p class="price-product">${product.price.toLocaleString()} đ</p>
     ${
       authUser
         ? `<i  onclick="addCart('${product.id}')" class="bx bx-cart-add"></i>`
         : ""
     } 
    </div>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}
miniTravel();
function miniTravel() {
  const print = document.querySelector(".travel-mini");
  let content = "";

  const newProducts = productsLocal.filter((item) => item.isMini === true);
  const productsNeed = newProducts.slice(0, 10);
  productsNeed.forEach((product, index) => {
    content += `<div class="product" >
    <div class="buy-now-container">
      <img src="./img/${product.img}" alt="" />
      <button>MUA NGAY</button>
    </div>
    <div class="content-product" >
      <p class="brand-title-product">${product.brand}</p>
      <p class="name-product"onclick="renderDetails('${product.id}')">${
      product.name
    }</p>
      <div class="price-cart-add">
        <p class="price-product">${product.price.toLocaleString()} đ</p>
       ${
         authUser
           ? `<i  onclick="addCart(${product.id})" class="bx bx-cart-add"></i>`
           : ""
       } 
      </div>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}

const renderDetails = (id) => {
  const productDetail = productsLocal.find((item) => item.id === +id);
  localStorage.setItem("productDetail", JSON.stringify(productDetail));
  window.location.href = "detail.html";
};

const usersAccounts = JSON.parse(localStorage.getItem("usersAccounts")) || [];
const userLogin = usersAccounts.find((user) => user.id === authUser.id);
let cartUser = userLogin?.cart;
function addCart(id) {
  const productClick = productsLocal.find((item) => item.id === +id);
  let productOrder = {};
  console.log(cartUser);
  if (productClick.quantity > 0) {
    if (cartUser.length === 0) {
      productOrder = {
        ...productClick,
        id: 0,  
        orderQty: 1, 
        idUser: authUser.id, 
        idClick: productClick.id,  
      };
      console.log(productOrder);
    } else {
      const maxId = Math.max(...cartUser.map((item) => item.id));
      productOrder = {
        ...productClick,
        id: maxId + 1,
        orderQty: 1,
        idUser: authUser.id,
        idClick: productClick.id,
      };
      console.log(productOrder);
    }
  } else {
    alert("Sản phẩm hết hàng");
  }
  const productOld = cartUser.find(
    (product) => product.idClick === productClick.id
  );
  if (productOld) {
    productOld.orderQty += 1;  
  } else {
    cartUser.push(productOrder);
  }
  localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
  const length = document.querySelector("#length-cart");
  length.innerHTML = cartUser.length;
}

function renderSearch(product) {
  const print = document.querySelector(".form-search-small");
  let content = "";
  product.forEach((item) => {
    content += `<div class="item-search" onclick="searchToDetail(${item.id})">
    <img src="./img/${item.img}" alt="" />
    <div class="item-search-name">
      <p id="name-search">${item.name}</p>
      <p id="price-search">${item.price.toLocaleString()} đ</p>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}

function searchToDetail(id) {
  const productDetail = productsLocal.find((item) => item.id === +id);
  localStorage.setItem("productDetail", JSON.stringify(productDetail));
  window.location.href = "detail.html?id=" + id;
}

const searchTop = document.querySelector("#searchTop");
const formSearch = document.querySelector(".form-search-small");
function isShowFormSearch(){
  if (searchTop.value.length === 0) {
    formSearch.style.display = "none";
  } else {
    formSearch.style.display = "block";
  }
}
isShowFormSearch();

searchTop.addEventListener("input", (e) => {
  isShowFormSearch();
  const productNeed = productsLocal.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  const productSlice = productNeed.slice(0, 7);
  renderSearch(productSlice);

});

const cartRender = document.querySelector(".cart");
cartRender.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
const loginAccount = document.querySelector("#loginAccount");
loginAccount.addEventListener("click", () => {
  window.location.href = "./login.html";
});
// user_________________________________________________start
const authUser = JSON.parse(localStorage.getItem("authUser"));
//auth user ở bên login chuyển tới
if (authUser) {
  render_user(); //log in
  deleteUser(); //log out
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
function deleteUser() {
  const logoutUser = document.querySelector(".logout");
  logoutUser.addEventListener("click", () => {
    localStorage.removeItem("authUser");
    window.location.href = "./login.html";
  });
}

// ______
// admin_________________________________________________start
const authAdmin = JSON.parse(localStorage.getItem("authAdmin"));
//authAdmin admin ở bên login chuyển tới
if (authAdmin) {
  render_admin(); //log in
  deleteAdmin(); //log out
}
//render admin
function render_admin() {
  const cart = document.querySelector(".cart");
  const user = document.querySelector("#nameUser");
  console.log(user);
  // const homeAdmin = document.querySelector(".home-admin");
  const loginAccount = document.querySelector("#loginAccount");
  loginAccount.style.display = "none";
  const iconLogout = document.querySelector(".logout");
  // homeAdmin.style.display = "inline-block";
  cart.style.display = "none";
  iconLogout.style.display = "inline-block";
  iconLogout.style.color = "red";
  user.innerHTML = authAdmin.name;
}
function deleteAdmin() {
  const logoutUser = document.querySelector(".logout");
  logoutUser.addEventListener("click", () => {
    localStorage.removeItem("authAdmin");
    window.location.href = "./login.html";
  });
}
//log out
const logoutAdmin = document.querySelector(".logout");
logoutAdmin.addEventListener("click", () => {
  localStorage.removeItem("authAdmin");
  window.location.href = "./login.html";
});

// ________________RENDER_________________________________start
const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));
const brandsLocal = JSON.parse(localStorage.getItem("Brands"));

let currentPage = 1; // số trang hiện tại //khi lick page 2 sẽ = 2
const itemsPage = 12; //số phần tử trong 1 trang
function renderAllProducts(productsLocal) {
  //phân trang
  const totalPage = Math.ceil(productsLocal.length / itemsPage); //tổng trang là 4
  //Math.ceil() để làm tròn một số lên thành số nguyên gần nhất lớn hơn
  const startIndex = (currentPage - 1) * itemsPage; //vị trí phần tử đầu tiên  của mảng [ 1 trang ]
  // ví dụ click page 2 thì 2 - 1 * 12 = 12 là số bắt đầu
  const endIndex = startIndex + itemsPage; ////vị trí phần tử cuối cùng của mảng [ 1 trang ]
  //mà khi bắt đầu = 12 thì nó + thêm 12 thì = 24
  const itemsToRender = productsLocal.slice(startIndex, endIndex); // lấy các phần tử từ start dến end
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPage; i++) {
    //phải bắt đầu từ 1
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderAllProducts(productsLocal); //gọi lại để render lại trang
    });
    pagination.appendChild(pageButton);
  }

  const print = document.querySelector(".product-content-main");
  let content = "";
  itemsToRender.forEach((product, index) => {
    content += `   <div class="product" >
    <div class="product">
      <div class="buy-now-container">
        <img src="../img/${product.img}" alt="" />
        <button>MUA NGAY</button>
      </div>
      <div class="content-product" >
        <p class="brand-title-product">${product.brand}</p>
        <p class="name-product"onclick="renderDetails('${product.id}')">
        ${product.name}
        </p>
        <div class="price-cart-add">
          <p class="price-product">${product.price.toLocaleString()}</p>
          <i class="bx bx-cart-add"></i>
        </div>
      </div>
    </div>
  </div>`;
  });
  print.innerHTML = content;
}
renderAllBrands();
function renderAllBrands() {
  const print = document.querySelector(".render-allBrands");
  let content = "";
  brandsLocal.forEach((item, index) => {
    content += ` 
    <li>
    <input type="checkbox" class='brand-checkbox' onclick="showBrandProducts()" id="${item.brand}"/>
    <label for="${item.brand}">${item.brand} </label>
  </li>`;
  });
  // khi click vào label, checkbox tương ứng sẽ được chọn.
  print.innerHTML = content;
}

const allCheckBoxBrand = document.querySelectorAll(".brand-checkbox");
//truy vấn tới tất cả ô input
function showBrandProducts() {
  const brandCheck = []; //các Brand được click
  allCheckBoxBrand.forEach((inputCheckBox) => {
    if (inputCheckBox.checked) {
      //type checkbox  là tự động có checked
      brandCheck.push(inputCheckBox.id);
      //truyền id lúc bấy giờ là tên brand vì id bên html ko đặt được số
    }
  });
  const productFilter = productsLocal.filter((item) =>
    brandCheck.includes(item.brand)
  );
  //lọc tất cả product ở local trả về mảng mới các phần tử  bao gồm brand được chọn
  if (brandCheck.length === 0) {
    //nếu ko click thì render mảng cũ
    renderAllProducts(productsLocal);
  } else {
    renderAllProducts(productFilter);
  }
}

//lấy id sản phẩm
const renderDetails = (id) => {
  const fined = productsLocal.find((item) => item.id === +id);
  localStorage.setItem("productDetail", JSON.stringify(fined));
  window.location.href = "/detail.html?id=" + id;
};
// tìm sp
function search() {
  const valueSearch = document.getElementById("searchProducts");
  if (valueSearch.value == "") {
    renderAllProducts(productsLocal);
  } else {
    let productsNeed = productsLocal.filter((item) =>
      item.name.toLowerCase().includes(valueSearch.value.toLowerCase())
    );
    renderAllProducts(productsNeed);
  }
}
search();

// local______________________________________________________________________start
const authUser = JSON.parse(localStorage.getItem("authUser"));
const usersAccounts = JSON.parse(localStorage.getItem("usersAccounts"));
// local______________________________________________________________________end

// chuyển trang_______________________________________________________________________start

const profile = document.querySelector("#profile");
profile.style.display = "flex";
profile.addEventListener("click", () => {
  window.location.href = "../Page/profileUser.html";
});
//log out
const logoutUser = document.querySelector(".logout");
logoutUser.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  window.location.href = "./login.html";
});
const loginAccount = document.querySelector("#loginAccount");
loginAccount.addEventListener("click", () => {
  window.location.href = "./login.html";
});
// chuyển trang_____________________________________________________________________end

if (authUser) {
  render_user();
  const table = document.querySelector("#showTable");
  table.style.display = "none";
  const historyClick = document.querySelector("#historyClick");
  $(historyClick).click(function () {
    renderHistory();
    $(table).toggle(1000);
  });
} else {
  const profile = document.querySelector("#profile");
  profile.style.display = "none";
}
//render user
function render_user() {
  const loginAccount = document.querySelector("#loginAccount");
  loginAccount.style.display = "none";
  const profile = document.querySelector("#profile");
  profile.style.display = "flex";

  const user = document.querySelector("#nameUser");
  user.innerHTML = authUser.name;

  const iconLogout = document.querySelector(".logout");
  iconLogout.style.display = "inline-block";
  iconLogout.style.color = "red";
}
const userLogin = usersAccounts.find((user) => user.id === authUser.id);
const cartUser = userLogin.cart; // gán lại giỏ hàng của user để hiển thị
if (authUser) {
  renderCartUserLeft();
  function renderCartUserLeft() {
    const lengthCartUser = document.querySelector(".cart-item-count");
    lengthCartUser.innerHTML = cartUser.length + " " + "sản phẩm";
    let content = "";
    const print = document.querySelector(".cart-oder-left");
    cartUser.forEach((product, index) => {
      content += `<div class="cart-item">
   <div class="item-img-info">
     <input type="checkbox" />
     <img src="../img/${product.img}" alt="" />
     <div class="detail-product-order">
       <p class="name">${product.name}</p>
     </div>
   </div>

   <div class="price-order hide-mobile">${product.price.toLocaleString()} ₫</div>

   <div class="quantity-parent">
     <button onclick="minus(${
       product.id
     })"><i class="fa-solid fa-minus"></i></button>
     <input type="text" min="0" value="${product.orderQty}" />
     <button onclick="plus(${
       product.id
     })"><i class="fa-solid fa-plus"></i></button>
   </div>   
   <div id="price-after"> ${(
     product.price * product.orderQty
   ).toLocaleString()} ₫</div>
   <i onclick ="deleteOrder(${
     product.id
   })" class="fa-solid fa-xmark delete-order-icon"></i>
 </div>`;
    });
    localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
    print.innerHTML = content;
  }

  function minus(id) {
    const productOder = cartUser.find((product) => product.id === id);
    if (productOder.orderQty > 1) {
      productOder.orderQty -= 1;
    }
    renderCartUserLeft();
    renderCartUserRight();
  }
  function plus(id) {
    const productOder = cartUser.find((product) => product.id === id);
    if (productOder.orderQty >= 0) {
      productOder.orderQty += 1;
    }
    renderCartUserLeft();
    renderCartUserRight();
  }
  // right
  renderCartUserRight();
  function renderCartUserRight() {
    const print = document.querySelector(".cart-oder-right");
    let sum = 0;
    cartUser.forEach((product) => {
      let content = "";
      content = `<div class="pay">
  <div class="total">
    <div class="field-discount">
      <p>Mã giảm giá</p>
      <p id="show-code-free">Nhập mã ></p>
    </div>
    <div id="discount-show">
      <input type="text" placeholder="Mã giảm giá" />
      <button>Sử dụng</button>
    </div>
    <div class="transport">
      <p>Phí vận chuyển:</p>
      <p>Free</p>
    </div>
    <div class="total-price">
      <p>Tổng:</p>
      <p id="printPrice" class="price">${(sum +=
        product.orderQty * product.price).toLocaleString()} đ</p>
     </div>
    <button onclick = "payOder(${sum})" class="pay-tottaly">Thanh toán</button>
  </div>
</div>`;
      print.innerHTML = content;
    });
  }
}
// xóa oder
function deleteOrder(id) {
  const hidePay = document.querySelector(".pay");
  cartUser.forEach((item, index) => {
    if (item.id == id) {
      cartUser.splice(index, 1);
    }
    if (cartUser.length == 0) {
      hidePay.style.display = "none";
    }
  });
  localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
  renderCartUserLeft();
  renderCartUserRight();
}
//thanh toán
function payOder(sum) {
  //sum là tổng số tiền được truyền vào khi click
  const bill = {
    listOrder: cartUser,
    sumMoney: sum,
  };
  localStorage.setItem("billNeedToPay", JSON.stringify(bill));
  window.location.href = "./payBill.html";
}

const historyOrders = JSON.parse(localStorage.getItem("historyOrders"));
function renderHistory() {
  const print = document.querySelector("tbody");
  let content = "";
  historyOrders.forEach((item, index) => {
    if (item.userId === authUser.id) {
      content += `
    <tr class="item-order">
    <td><input type="checkbox" name="" id="" /></td>
    <td> ${item.codeOrder}</td>
    <td>Chuyển khoản</td>
    <td>${new Date(item.date).toLocaleDateString()}</td>
    <td> ${new Date(
      new Date(item.date).getTime() + 259200000
    ).toLocaleDateString()}</td>
    <td>${item.status}${
        item.status === "Processing"
          ? `<button id="btnCancel" onclick = "handleCancel(${item.id})">Cancel</button>`
          : ""
      }</td>
    <td>${item.sumMoney.toLocaleString()} đ</td>
    <td>
      <button><i class="fa-solid fa-eye" onclick = "showProductOrder(${
        item.id
      })"></i></button>
      <button><i class="fa-regular fa-pen-to-square"></i></button>
    </td>
  </tr>`;
    }
  });
  print.innerHTML = content;
}
function handleCancel(id) {
  const productFind = historyOrders.find((item) => item.id === id);
  productFind.status = "Canceled";

  localStorage.setItem("historyOrders", JSON.stringify(historyOrders));
  renderHistory();
}
function showProductOrder(id) {
  const productFind = historyOrders.find((item) => item.id === id);
  console.log(productFind);
}

//show form add
const showForm = document.querySelector(".showForm");
const form = document.querySelector(".formAdd");
form.style.display = "none";
$(showForm).click(function () {
  $(form).toggle(1000);
});
//show form edit
const formUpdate = document.querySelector(".formUpdate");
formUpdate.style.display = "none";

const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));
// renderAllBrands(productsLocal);
function renderAllBrands(products) {
  const print = document.querySelector("tbody");
  let content = "";
  products.forEach((product, index) => {
    content += `    
    <tr class="item-order">
    <td><input type="checkbox" name="" id="" /></td>
    <td><img src="../img/${product.img}" alt="" /></td>
    <td>${product.name}</td>
    <td>${product.type}</td>
    <td>${product.brand}</td>
    <td>${product.quantity}</td>
    <td>  <button>On</button></td>
    <td>${product.price.toLocaleString()} đ</td>
    <td>
      <button class="showFormEdit" onclick="handleEdit(${
        product.id
      })">Sửa</button>
      <button onclick="handleDelete(${product.id})">Xóa</button>
    </td>
  </tr>`;
  });
  // khi click vào label, checkbox tương ứng sẽ được chọn.
  print.innerHTML = content;
}

//add
const btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const productsLocal = JSON.parse(localStorage.getItem("PerfumeProducts"));
  const name = document.querySelector("#name").value;
  const brand = document.querySelector("select").value;
  const price = document.querySelector("#price").value;
  const quantity = document.querySelector("#quantity").value;
  const img = document.querySelector("#img").value;
  const imgDetail = document.querySelector("#imgDetail").value;
  let linkImg = img.slice(12);

  let linkImgDetail = imgDetail.slice(12);
  const description = document.querySelector("#description").value;
  //gọi hàm này để lấy giới tính khi họ click
  const gender = selectedGender;
  const maxId = Math.max(...productsLocal.map((item) => item.id));
  const newProduct = {
    id: maxId + 1,
    name: name,
    brand: brand,
    gender: gender,
    price: +price,
    quantity: +quantity,
    img: gender + "/" + brand.toLowerCase() + "/" + linkImg,
    imgDetail: gender + "/" + brand.toLowerCase() + "/" + linkImgDetail,
    description: description,
    //
    origin: "Ý",
    rating: 5,
    type: "100ml",
    isMini: true,
    isNew: false,
    isBestSeller: false,
    isDealFragrant: true,
  };
  productsLocal.push(newProduct);
  localStorage.setItem("PerfumeProducts", JSON.stringify(productsLocal));
  renderAllBrands(productsLocal);
});
//radio___lấy giới tính
//giới tính được trả về trong hàm getRender()
var selectedGender;
function getGender() {
  const genderRadios = document.getElementsByName("gender");
  // Lặp qua tất cả các nút radio
  genderRadios.forEach((radio) => {
    // Thêm sự kiện 'click' cho mỗi nút radio
    radio.addEventListener("click", () => {
      // Kiểm tra xem nút radio được chọn là nút nào
      if (radio.checked) {
        // Lấy giá trị của nút radio được chọn
        selectedGender = radio.value;
        // Sử dụng giá trị của nút radio ở đây, ví dụ: in ra console
      }
    });
  });
}
getGender();
// tìm sp
function search() {
  const valueSearch = document.getElementById("valueSearch");
  if (valueSearch.value == "") {
    renderAllBrands(productsLocal);
  } else {
    let productsNeed = productsLocal.filter((item) => {
      return item.name.toLowerCase().includes(valueSearch.value.toLowerCase());
    });
    renderAllBrands(productsNeed);
  }
}
search();
//xóa sp
function handleDelete(id) {
  productsLocal.forEach((product, index) => {
    if (id === product.id) {
      productsLocal.splice(index, 1);
      localStorage.setItem("PerfumeProducts", JSON.stringify(productsLocal));
      renderAllBrands(productsLocal);
    }
  });
}

//edit
function handleEdit(id) {
  $(formUpdate).toggle(1000); //show form edit
  let productOld = productsLocal.find((item) => item.id === id);
  const idProductOld = document.querySelector("#idProduct");
  idProductOld.value = id;

  const nameUpdate = document.querySelector("#nameUpdate");
  const priceUpdate = document.querySelector("#priceUpdate");
  const quantityUpdate = document.querySelector("#quantityUpdate");
  const descriptionUpdate = document.querySelector("#descriptionUpdate");
  const imgShowUpdate = document.querySelector("#imgShowUpdate");

  const printBrand = document.querySelector("#choose-brand-edit");
  printBrand.value = productOld.brand;
  nameUpdate.value = productOld.name;
  imgShowUpdate.src = "../img/" + productOld.img;
  priceUpdate.value = productOld.price;
  quantityUpdate.value = productOld.quantity;
  descriptionUpdate.value = productOld.description;

  // const btnUpdate = document.querySelector("#btnUpdate");
  // btnUpdate.setAttribute("onclick", `handleUpdate(${id})`);
}
//update

const btnUpdate = document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  getGender();
  const gender = selectedGender;
  const brandUpdate = document.querySelector("#choose-brand-edit");
  const nameUpdate = document.querySelector("#nameUpdate");
  const priceUpdate = document.querySelector("#priceUpdate");
  const quantityUpdate = document.querySelector("#quantityUpdate");
  const descriptionUpdate = document.querySelector("#descriptionUpdate");
  const idProduct = document.querySelector("#idProduct");
  const imgUpdate = document.querySelector("#imgUpdate").value;
  const imgDetailUpdate = document.querySelector("#imgDetailUpdate").value;
  let linkImg = imgUpdate.slice(12);
  let linkImgDetail = imgDetailUpdate.slice(12);
  const productUpdate = {
    id: Number(idProduct.value),
    brand: brandUpdate.value,
    name: nameUpdate.value,
    gender: gender,
    price: priceUpdate.value,
    quantity: quantityUpdate.value,
    img: gender + "/" + brandUpdate.value.toLowerCase() + "/" + linkImg,
    imgDetail:
      gender + "/" + brandUpdate.value.toLowerCase() + "/" + linkImgDetail,
    description: descriptionUpdate.value,
  };
  // đã lấy dữ liệu cập nhật mới

  productsLocal.forEach((productOld, index) => {
    if (productOld.id === productUpdate.id) {
      const newProduct = { ...productOld, ...productUpdate };
      //ko thay đổi productOld chỉ copy thôi
      //Vì newProduct được tạo ra bằng cách sao chép productOld và ghi đè lên bằng productUpdate
      //nên nếu có các thuộc tính mới trong productUpdate, chúng sẽ được thêm vào newProduct
      productsLocal.splice(index, 1, newProduct);
      //sau đó xóa thèn cũ thay thèn mới
    }
  });
  localStorage.setItem("PerfumeProducts", JSON.stringify(productsLocal));
  renderAllBrands(productsLocal);
});

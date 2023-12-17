const usersAccLocal = JSON.parse(localStorage.getItem("usersAccounts")) || [];
const btnForm = document.querySelector("#btn-form");
btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const infoEmail = document.querySelector("#infoEmail").value;
  const phone = document.querySelector("#phone").value;
  const passWord = document.querySelector("#password").value;
  const confirmPassWord = document.querySelector("#confirmPassWord").value;
  let newAccount = {};
  if (usersAccLocal.length == 0) {
    newAccount = {
      id: 0, //dấu : là [true : false] nếu true thì vế trái nếu false thì vế phải
      name: name,
      phone: phone,
      email: infoEmail,
      passWord: passWord,
      status: true,
      confirmPassWord: confirmPassWord,
      role: "admin",
    };
  } else {
    const maxId = Math.max(...usersAccLocal.map((item) => item.id));
    //tìm id lớn nhất trong mảng các id được trả về
    console.log(maxId);
    newAccount = {
      id: maxId + 1,
      cart: [],
      name: name,
      phone: phone,
      email: infoEmail,
      passWord: passWord,
      status: true,
      confirmPassWord: confirmPassWord,
      role: "user",
    };
  }
  const newError = validate(newAccount);
  //____check tài khoản đã tồn tại hay chưa___
  if (newError.isError == false) {
    const usersAccLocals =
      JSON.parse(localStorage.getItem("usersAccounts")) || [];
    let isDulicate = false; //cờ hiệu có lỗi hay ko
    usersAccLocals.forEach((oldUser) => {
      if (newAccount.email === oldUser.email) {
        isDulicate = true;
        newError.emailMSG = "Email đã tồn tại";
        renderError(newError);
      }

      if (newAccount.phone === oldUser.phone) {
        isDulicate = true;
        newError.phoneMSG = "Số điện thoại đã tồn tại";
        renderError(newError);
      }
    });

    if (isDulicate == false) {
      usersAccLocal.push(newAccount);
      localStorage.setItem("usersAccounts", JSON.stringify(usersAccLocal));
      window.location = "../Page/login.html";
    }
  }
  renderError(newError);
});
function renderError(newError) {
  const nameMSG = document.querySelector("#nameMSG");
  const phoneMSG = document.querySelector("#phoneMSG");
  const emailMSG = document.querySelector("#emailMSG");
  const passwordMSG = document.querySelector("#passwordMSG");
  const confirmPassWordMSG = document.querySelector("#confirmPassWordMSG");
  nameMSG.innerHTML = newError.nameMSG;
  phoneMSG.innerHTML = newError.phoneMSG;
  emailMSG.innerHTML = newError.emailMSG;
  passwordMSG.innerHTML = newError.passwordMSG;
  confirmPassWordMSG.innerHTML = newError.confirmPassWordMSG;
}
function validate(user) {
  const newError = {
    isError: false,
    nameMSG: "",
    phoneMSG: "",
    emailMSG: "",
    passwordMSG: "",
    confirmPassWordMSG: "",
  };
  const regxEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  if (!user.name) {
    newError.isError = true;
    newError.nameMSG = "Tên không được để trống ";
  }

  if (!user.phone.match(regexPhone)) {
    newError.isError = true;
    newError.phoneMSG = " Số điện thoại không đúng định dạng ! ";
  }
  if (!user.email.match(regxEmail)) {
    newError.isError = true;
    newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
  }
  if (user.passWord.length < 8 || user.confirmPassWord.length > 30) {
    newError.isError = true;
    newError.passwordMSG =
      "Vui lòng tạo mật khẩu lớn hơn 8 và nhỏ hơn 30 ký tự";
  }
  if (user.passWord !== user.confirmPassWord) {
    newError.isError = true;
    newError.confirmPassWordMSG = "Mật khẩu không trùng nhau";
  }

  return newError;
}

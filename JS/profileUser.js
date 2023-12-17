const authUser = JSON.parse(localStorage.getItem("authUser"));
const name = document.querySelector("#name");
const infoEmail = document.querySelector("#infoEmail");
const phone = document.querySelector("#phone");
const passWord = document.querySelector("#password");
const confirmPassWord = document.querySelector("#confirmPassWord");
render();
function render() {
  name.value = authUser.name;
  phone.value = authUser.phone;
  infoEmail.value = authUser.email;
}
const usersAccounts = JSON.parse(localStorage.getItem("usersAccounts"));
const userLogin = usersAccounts.find((user) => user.id === authUser.id);
const btnForm = document.querySelector("#btn-form");
btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  const newUpdate = {
    ...userLogin,
    name: name.value,
    email: infoEmail.value,
    phone: phone.value,
    passWord: passWord.value,
    confirmPassWord: confirmPassWord.value,
  };

  const checkError = validate(newUpdate);
  if (checkError.isError === true) {
    renderError(checkError);
  } else {
    const userFinded = userLogin.id;
    usersAccounts.splice(userFinded, 1, newUpdate);
    localStorage.setItem("usersAccounts", JSON.stringify(usersAccounts));
  }
});
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

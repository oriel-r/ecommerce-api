export default {
  //Email checker
  email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  //DNI argentino
  nDni: /^\d{8}$/,
  //yyyy-mm-dd
  birthdate: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  // 8+ characters and a mayor letter and one number
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  // time 09-00 a 16:59
  time: /^(09|1[0-6]):[0-5]\d$/,
  // yyyy-mm-dd
  date: /^(202[4-9]|20[3-9]\d|2[1-9]\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  //Name +3 letters
  name: /^[a-zA-Z]{3,}$/,
  userName: /^[a-zA-Z]{3,}$/,
  id: /^[1-9]\d*$/,
  userid: /^[1-9]\d*$/,
  stock: /^(true|false)$/,
  price: /^(0?\.\d*[1-9]\d*|[1-9]\d*(\.\d+)?)$/,
  imgUrl: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|tiff|svg))$/i,
  description: /^.{10,}$/,
};

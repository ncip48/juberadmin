/* eslint-disable eqeqeq */
import moment from "moment";
import { toast } from "react-toastify";

export const handleFetchError = (e, source) => {
  console.log("error asli", JSON.stringify(e));
  if (!e) return;
  // const alert = useAlert();
  console.log(e);
  let msg = e;
  // if (isArray(e)) e = e[0];
  if (e.msg) msg = e.msg;
  if (typeof msg === "object") msg = JSON.stringify(msg);
  // console.log('asdf', e.message);
  if (e === "reqcanceled") return;
  if (e.message === "Network Error")
    msg = "Network Error atau Jaringan Bermasalah";
  if (e.hasOwnProperty("message")) {
    if (e.message.includes("code 504")) msg = e.name;
    // if (e.name.toLowerCase().includes('error')) msg = 'Error!';
  }

  if (process.env && process.env.NODE_ENV === "development") {
    console.log("error", e);
    console.log("error formatted", JSON.parse(JSON.stringify(e)));
    console.log("error msg", msg);

    if (e.request) console.log("request", e.request);
    if (e.response) console.log("response", e.response);
  }

  // alert('Error: ' + msg + (e.config?.url ? ` | url: ${e.config.url}` : ''));
  toast.error(msg);
  // LocalNotification('Gagal', msg);
};

export const stringifyNumber = (val) =>
  Number(val) < 10 ? "0" + val : "" + val;

// supported format: day, date, month, monthName, year, hour, minute. example: 'day, date month year'
export const formatDate = (val = new Date(), format = "year-month-date") => {
  const days = [
    "Ahad / Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const monthsLess = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  if (typeof val == "string") val = new Date(val);

  let res = format;
  if (format.includes("minute"))
    res = res.replace("minute", stringifyNumber(val.getMinutes()));
  if (format.includes("hour"))
    res = res.replace("hour", stringifyNumber(val.getHours()));
  if (format.includes("day")) res = res.replace("day", days[val.getDay()]);
  if (format.includes("date"))
    res = res.replace("date", stringifyNumber(val.getDate()));
  if (format.includes("monthName"))
    res = res.replace("monthName", months[val.getMonth()]);
  if (format.includes("monthLess"))
    res = res.replace("monthLess", monthsLess[val.getMonth()]);
  else if (format.includes("month"))
    res = res.replace("month", stringifyNumber(parseInt(val.getMonth()) + 1));
  if (format.includes("year")) res = res.replace("year", val.getFullYear());

  return res;
};

export const batasiKata = (str, max = 50, suffix = "...") =>
  str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`;

export const formatRupiah = (angka) => {
  if (angka == null) {
    return "Rp.-";
  }
  angka = parseInt(angka);
  angka = angka.toString();
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return "Rp. " + rupiah;
};

export const cipher = (salt) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return (text) =>
    text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

export const decipher = (salt) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return (encoded) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
};

export const getJenisDok = (id) => {
  switch (id) {
    case "01":
      return "KTP";
    case "02":
      return "SIM";
    case "03":
      return "PASSPORT";
    case "04":
      return "STNK";
    case "05":
      return "BPKB";
    case "06":
      return "SKCK";
    case "07":
      return "SELFIE";
    default:
      return "";
  }
};

export const getStatus = (status) => {
  switch (status) {
    case 0:
      return "Tidak Aktif";
    case 1:
      return "Aktif";
    case 2:
      return "Expired";
    case 3:
      return "Tidak Valid (Ditolak)";
    case 4:
      return "Terverifikasi";
    case 5:
      return "Belum Terverifikasi";
    case 6:
      return "Terblokir";
    default:
      return null;
  }
};

export const isExpired = (date) => {
  var end = moment(new Date()); //todays date
  var now = moment(date); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  if (days < 0) {
    return true;
  } else {
    return false;
  }
};

export const fckingDateDiff = (date) => {
  var end = moment(new Date()); //todays date
  var now = moment(date); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  var month = duration.asMonths();
  if (days <= 0) return "0 Hari";
  if (days > 30) return Math.floor(month) + " Bulan";
  return Math.floor(days) + " Hari";
};

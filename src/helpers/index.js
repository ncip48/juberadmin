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

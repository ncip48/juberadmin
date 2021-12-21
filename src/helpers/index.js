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

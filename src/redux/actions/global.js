import { toast } from "react-toastify";
import { handleFetchError } from "../../helpers";
import { logout } from "./auth";

export const _fetch =
  (request, success = true) =>
  async (dispatch) => {
    try {
      //   if (useLoading) dispatch(setFullscreenLoading(true));
      // console.time('🕑 request ' + timeId + ' time')
      return await toast.promise(
        request
          .then((res) => {
            const data = res.data || res.body;
            // console.log("errdata", data);
            // eslint-disable-next-line eqeqeq
            // if (data?.data?.code != 200) return handleFetchError(data?.data?.msg);
            if (data?.hasOwnProperty("success") && !data?.success) {
              if (data?.hasOwnProperty("msg")) {
                if (data?.msg === "Unauthorize") return dispatch(logout());
                if (data?.msg === "Not Authorize") return dispatch(logout());
                if (data?.msg === "Email tidak terdaftar")
                  return { status: data.success, msg: data.msg };
                handleFetchError(data);
              } else if (data?.data?.hasOwnProperty("reason")) {
                handleFetchError(data.data.reason);
              } else if (data?.hasOwnProperty("message")) {
                handleFetchError(data.message);
              } else handleFetchError(data?.data || data);
              // console.log("URL", res?.url || res?.config?.url);
            } else if (
              data?.data?.hasOwnProperty("success") &&
              !data?.data?.success
            ) {
              if (data?.data?.hasOwnProperty("message")) {
                handleFetchError(data.data.message);
              } else {
                handleFetchError("terjadi kesalahan");
              }
            } else {
              // console.log(res?.url || res?.config?.url, data || res);
              return data || res;
            }
          })
          .catch((err) => {
            // console.log('err beneran', err.message);
            handleFetchError(err.message);
          })
          .finally(() => {
            // console.timeEnd('🕑 request ' + timeId + ' time')
            //   if (useLoading) dispatch(setFullscreenLoading(false));
          }),
        {
          pending: "Loading...",
          success: {
            render({ data }) {
              return success
                ? data?.data?.msg || data?.message || data?.data?.message
                : "Success Fetching API";
            },
            // other options
            // icon: "🟢",
          },
          error: {
            render({ data }) {
              // When the promise reject, data will contains the error
              return data.message;
            },
          },
        }
      );
    } catch (error) {
      handleFetchError(error.message);
    }
  };

import type {AxiosResponse} from "axios";
import type ResultData from "@/interfaces/resultData";
export default class CommonUtil {
  static async response<T>(res: AxiosResponse<ResultData<T>, any>) {
    if (res.data.code === '200') {
      return res.data.data
    } else {
      throw new Error(res.data.message)
    }
  }
}

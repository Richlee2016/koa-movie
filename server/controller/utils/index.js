import req from "request-promise";

export const request = async (opt) => {
    const options = Object.assign({},opt,{json:true});
    try {
      const res =  await req(options);
      return res;
    } catch (err) {
      console.error(err)
    }
}
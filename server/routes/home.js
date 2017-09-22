import { controller, all, post, get } from "../decorator/router";
import * as handle from "../controller/home";

@controller("")
class Home {
  constructor() {}
  @get("/")
  async getHome(ctx, next) {
    const res = await handle.home();
    if (res.code === 1) {
      const { data } = res;
      await ctx.render("home", {
        title: "熊猫电影",
        name: "",
        banner: data.list.banner,
        data: data.name
      });
    } else {
      ctx.body = "404 error";
    }
  }

  @get("/movie/:id")
  async getDetail(ctx, next) {
    const id = ctx.params.id;
    console.log(id);
    const res = await handle.page(id);
    if (res.code === 1) {
      const { id, name } = res.data;
      await ctx.render("detail", {
        title: name,
        res: res.data,
        data: { img: res.data.img }
      });
    } else {
      res.send("404 error");
    }
  }

  @get("/list")
  async getList(ctx, next) {
    const q = ctx.query;
    await ctx.render("list", {
      title:q.catalog,
      data: { query: q }
    });
  }

  @post("/pagination")
  async pagination(ctx, next) {
    const q = ctx.request.body;
    const res = await handle.list(q);
    if (res.code === 1) {
      const { data } = res;
      ctx.body = data;
    } else {
      ctx.body = '请求错误';
    }
  }
}

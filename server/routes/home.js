import { controller, all, post, get } from "../decorator/router";
import request from "request-promise";

@controller("")
class Home {
  constructor() {}
  @get("/")
  async home(ctx, next) {
    const page = await request(`http://localhost:3000/movie_api/page`);
    const dataPage = JSON.parse(page);
    ctx.body = dataPage;
    if (dataPage.code === 1) {
      const { data } = dataPage;
      await ctx.render("home", {
        title: "电影家园",
        name: "",
        banner: data.list.banner,
        data: data.name
      });
    } else {
      ctx.body = "404 error";
    }
  }

  @get("/movie/:id")
  async detail(ctx, next) {
    const id = ctx.params.id;
    const movie = await request(`http://localhost:3000/movie_api/movie/${id}`);
    const data = JSON.parse(movie);
    if (data.code === 1) {
      const { id, name } = data;
      await ctx.render("detail", {
        title: name,
        res: data.data,
        data: { id: 1 }
      });
    } else {
      res.send("404 error");
    }
  }
}

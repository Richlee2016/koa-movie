import { request } from "./utils";
import qs from 'querystring'
const prefix = "http://localhost:3006/movie_api/";
const config = {
  home: prefix + "page",
  page: id => prefix + `movie/${id}`,
  list: qs => prefix + `list?${qs}`,
};
const biliUrl = n =>`http://localhost:3006/crawler/movie_bili?search=${n}`;

export const home = async () => {
  const home = await request({
    method: "GET",
    uri: config.home
  });
  return home;
};

export const page = async id => {
  const movie = await request({
    method: "GET",
    uri: config.page(id)
  });
  return movie;
};

export const list = async querys => {
  const myqs = qs.stringify(querys);
  const list = await request({
    method: "GET",
    uri: config.list(myqs)
  });
  return list;
};

export const bili = async name => {
  const enCodeName = encodeURIComponent(name);
  const bili = await request({
    uri: biliUrl(enCodeName)
  });
  return bili;
};

import request from "request-promise";
import qs from 'querystring'
const prefix = 'http://localhost:3000/movie_api/'
const config = {
    home:prefix + 'page',
    page:id => prefix + `movie/${id}`,
    list:qs => prefix + `list?${qs}`
}

export const home = async () => {
    const page = await request(config.home);
    const dataPage = JSON.parse(page);
    return dataPage;
}

export const page = async id => {
    const movie = await request(config.page(id));
    const data = JSON.parse(movie);
    return data;
}

export const list = async querys => {
    const myqs = qs.stringify(querys)
    const list = await request(config.list(myqs));
    const data = JSON.parse(list);
    return data;
}
// bilibili dom
export const domBili = (o,i) => `<li class="vivify animationObject">
<div class="bili-img"></div>
<span class="time">${o.time}</span>
<div class="bili-info">
  <a class="title" href="https://www.bilibili.com/video/${o.av}/" target="view_window">
  <p>${o.title}</p>
  </a>
  <div>
    <label>${o.playTime}</label>
    <span>${o.upTime}</span>
  </div>
  <a class="up-zhu" href="https://space.bilibili.com/${o.upZhu.id}" target="view_window">${o.upZhu.name}</a>
</div>
</li>`;

// 翻页dom
export const domPage = o => `<li class="vivify animationObject popInTop">
<a href="movie/${o.id}">
  <img src=${o.img} alt="">
  <span class="black-block">${o.year}</span>
  <!-- <span class="black-block">${o.score}</span> -->
  <p class="black-block">${o.name}</p>
</a>
</li>`;

// 防盗链 iframe
export const domIframe = (url,av) => {
  var frameid = "frameimg" + Math.random();
  window.img = `<a href="https://www.bilibili.com/video/${av}/" target="view_window"><img id="img" style="width:200px;height:120px;" src='${url}?${Math.random()}'/></a><script>window.onload = function() { document.body.style.margin="0px"}</script>`;
  const myimg = `<iframe id="${frameid}" src="javascript:parent.img;" frameBorder="0" scrolling="no" width="200" height="120"></iframe>`;
  return myimg;
}

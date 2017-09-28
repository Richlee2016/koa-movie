/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pagination2 = __webpack_require__(3);

	var _pagination3 = _interopRequireDefault(_pagination2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Index = function () {
	  function Index() {
	    _classCallCheck(this, Index);

	    this.onload();
	  }

	  _createClass(Index, [{
	    key: "onload",
	    value: function onload() {
	      this.initBd();
	      this.searchGo();
	      this.pagination();
	      this.animate();
	    }

	    // 设置背景

	  }, {
	    key: "initBd",
	    value: function initBd() {
	      var url = "/images/test.jpg";
	      var imgUrl = JSON.parse($("#DataSet").val());
	      if (imgUrl.img) {
	        url = imgUrl.img;
	      }
	      $("#container").css({
	        minHeight: $(document).height(),
	        background: "url('" + url + "')"
	      });
	    }

	    // 搜索

	  }, {
	    key: "searchGo",
	    value: function searchGo() {
	      $("#searchGo").click(function () {
	        var val = $("#searchVal").val();
	        if (val) {
	          location.href = "/movie/s=" + encodeURI(val);
	        } else {
	          console.log("0");
	        }
	      });
	    }

	    // 分页器

	  }, {
	    key: "pagination",
	    value: function pagination() {
	      var self = this;
	      (0, _pagination3.default)();
	      var qs = $("#DataSet").val();

	      var _JSON$parse = JSON.parse(qs),
	          query = _JSON$parse.query;

	      var myQs = Object.assign({}, query, { page: 1 });
	      // html替换
	      var listHtml = function listHtml(list) {
	        $("#MovieList").html("");
	        list.forEach(function (o) {
	          $("#MovieList").append("<li class=\"vivify animationObject popInTop\">\n                    <a href=\"movie/" + o.id + "\">\n                      <img src=" + o.img + " alt=\"\">\n                      <span class=\"black-block\">" + o.year + "</span>\n                      <!-- <span class=\"black-block\">" + o.score + "</span> -->\n                      <p class=\"black-block\">" + o.name + "</p>\n                    </a>\n                  </li>");
	        });
	      };
	      this.ajax(myQs).then(function (res) {
	        listHtml(res.list);
	        return Promise.resolve(res.count);
	      }).then(function (count) {
	        var pageNum = Math.ceil(count / 21);
	        $(".allPage").html(pageNum);
	        $("#Pagination").pagination(pageNum, {
	          callback: function callback(p) {
	            myQs = Object.assign({}, query, { page: p + 1 });
	            self.ajax(myQs).then(function (page) {
	              listHtml(page.list);
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: "ajax",
	    value: function ajax(qs) {
	      return new Promise(function (resolve, reject) {
	        $.post("/pagination", qs, function (data) {
	          if (data) {
	            resolve(data);
	          } else {
	            reject(data);
	          }
	        });
	      });
	    }
	  }, {
	    key: "animate",
	    value: function animate() {
	      $('.look-detail').on("click", function () {
	        $(".msg-text").show().addClass('flipInX');
	        $(".msg-text").removeClass('flipOutX');
	      });
	      $(".msg-text h3").on("click", function () {
	        $(".msg-text").removeClass('flipInX');
	        $(".msg-text").addClass('flipOutX');
	      });
	    }
	  }]);

	  return Index;
	}();

	var index = new Index();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		/**
	  * This jQuery plugin displays pagination links inside the selected elements.
	  * 
	  * This plugin needs at least jQuery 1.4.2
	  *
	  * @author Gabriel Birke (birke *at* d-scribe *dot* de)
	  * @version 2.2
	  * @param {int} maxentries Number of entries to paginate
	  * @param {Object} opts Several options (see README for documentation)
	  * @return {Object} jQuery Object
	  */
		(function ($) {
			/**
	   * @class Class for calculating pagination values
	   */
			$.PaginationCalculator = function (maxentries, opts) {
				this.maxentries = maxentries;
				this.opts = opts;
			};

			$.extend($.PaginationCalculator.prototype, {
				/**
	    * Calculate the maximum number of pages
	    * @method
	    * @returns {Number}
	    */
				numPages: function numPages() {
					return Math.ceil(this.maxentries / this.opts.items_per_page);
				},
				/**
	    * Calculate start and end point of pagination links depending on 
	    * current_page and num_display_entries.
	    * @returns {Array}
	    */
				getInterval: function getInterval(current_page) {
					var ne_half = Math.floor(this.opts.num_display_entries / 2);
					var np = this.numPages();
					var upper_limit = np - this.opts.num_display_entries;
					var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
					var end = current_page > ne_half ? Math.min(current_page + ne_half + this.opts.num_display_entries % 2, np) : Math.min(this.opts.num_display_entries, np);
					return { start: start, end: end };
				}
			});

			// Initialize jQuery object container for pagination renderers
			$.PaginationRenderers = {};

			/**
	   * @class Default renderer for rendering pagination links
	   */
			$.PaginationRenderers.defaultRenderer = function (maxentries, opts) {
				this.maxentries = maxentries;
				this.opts = opts;
				this.pc = new $.PaginationCalculator(maxentries, opts);
			};
			$.extend($.PaginationRenderers.defaultRenderer.prototype, {
				/**
	    * Helper function for generating a single link (or a span tag if it's the current page)
	    * @param {Number} page_id The page id for the new item
	    * @param {Number} current_page 
	    * @param {Object} appendopts Options for the new item: text and classes
	    * @returns {jQuery} jQuery object containing the link
	    */
				createLink: function createLink(page_id, current_page, appendopts) {
					var lnk,
					    np = this.pc.numPages();
					page_id = page_id < 0 ? 0 : page_id < np ? page_id : np - 1; // Normalize page id to sane value
					appendopts = $.extend({ text: page_id + 1, classes: "" }, appendopts || {});
					if (page_id == current_page) {
						lnk = $("<a class='current'>" + appendopts.text + "</a>");
					} else {
						lnk = $("<a>" + appendopts.text + "</a>").attr('page', this.opts.link_to.replace(/__id__/, page_id));
					}
					if (appendopts.classes) {
						lnk.addClass(appendopts.classes);
					}
					lnk.data('page_id', page_id);
					return lnk;
				},
				// Generate a range of numeric links 
				appendRange: function appendRange(container, current_page, start, end, opts) {
					var i;
					for (i = start; i < end; i++) {
						this.createLink(i, current_page, opts).appendTo(container);
					}
				},
				getLinks: function getLinks(current_page, eventHandler) {
					var begin,
					    end,
					    interval = this.pc.getInterval(current_page),
					    np = this.pc.numPages(),
					    fragment = $("<div class='pagination'></div>");

					// Generate "Previous"-Link
					if (this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)) {
						fragment.append(this.createLink(current_page - 1, current_page, { text: this.opts.prev_text, classes: "prev" }));
					}
					// Generate starting points
					if (interval.start > 0 && this.opts.num_edge_entries > 0) {
						end = Math.min(this.opts.num_edge_entries, interval.start);
						this.appendRange(fragment, current_page, 0, end, { classes: 'sp' });
						if (this.opts.num_edge_entries < interval.start && this.opts.ellipse_text) {
							$("<span class='pagination-break'>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
						}
					}
					// Generate interval links
					this.appendRange(fragment, current_page, interval.start, interval.end);
					// Generate ending points
					if (interval.end < np && this.opts.num_edge_entries > 0) {
						if (np - this.opts.num_edge_entries > interval.end && this.opts.ellipse_text) {
							$("<span class='pagination-break'>" + this.opts.ellipse_text + "</span>").appendTo(fragment);
						}
						begin = Math.max(np - this.opts.num_edge_entries, interval.end);
						this.appendRange(fragment, current_page, begin, np, { classes: 'ep' });
					}
					// Generate "Next"-Link
					if (this.opts.next_text && (current_page < np - 1 || this.opts.next_show_always)) {
						fragment.append(this.createLink(current_page + 1, current_page, { text: this.opts.next_text, classes: "next" }));
					}
					$('a', fragment).click(eventHandler);
					return fragment;
				}
			});

			// Extend jQuery
			$.fn.pagination = function (maxentries, opts) {

				// Initialize options with default values
				opts = $.extend({
					items_per_page: 1,
					num_display_entries: 4,
					current_page: 0,
					num_edge_entries: 1,
					link_to: "#",
					prev_text: "<i></i>上一页",
					next_text: "下一页 <i></i>",
					ellipse_text: "...",
					prev_show_always: true,
					next_show_always: true,
					renderer: "defaultRenderer",
					show_if_single_page: false,
					load_first_page: false,
					callback: function callback() {
						return false;
					}
				}, opts || {});

				var containers = this,
				    renderer,
				    links,
				    current_page;

				//goto
				$(".page-btn").one("click", function () {
					var allPage = $(".allPage").text();
					var goPage = $(".page-go input").val() - 1; //跳转页数
					if (goPage > -1 && goPage < allPage) {
						opts.current_page = goPage;
						opts.callback(goPage);
						$("#Pagination").pagination(allPage, opts);
					} else {
						$("#Pagination").pagination(allPage);
						//   alert("超过总页数");
					}
					//清空用户跳转页数
					$(".page-go input").val("");
				});

				/**
	    * This is the event handling function for the pagination links. 
	    * @param {int} page_id The new page number
	    */
				function paginationClickHandler(evt) {
					var links,
					    new_current_page = $(evt.target).data('page_id'),
					    continuePropagation = selectPage(new_current_page);
					if (!continuePropagation) {
						evt.stopPropagation();
					}
					return continuePropagation;
				}

				/**
	    * This is a utility function for the internal event handlers. 
	    * It sets the new current page on the pagination container objects, 
	    * generates a new HTMl fragment for the pagination links and calls
	    * the callback function.
	    */
				function selectPage(new_current_page) {
					// update the link display of a all containers
					containers.data('current_page', new_current_page);
					links = renderer.getLinks(new_current_page, paginationClickHandler);
					containers.empty();
					links.appendTo(containers);
					// call the callback and propagate the event if it does not return false
					var continuePropagation = opts.callback(new_current_page, containers);
					return continuePropagation;
				}

				// -----------------------------------
				// Initialize containers
				// -----------------------------------
				current_page = parseInt(opts.current_page);
				containers.data('current_page', current_page);
				// Create a sane value for maxentries and items_per_page
				maxentries = !maxentries || maxentries < 0 ? 1 : maxentries;
				opts.items_per_page = !opts.items_per_page || opts.items_per_page < 0 ? 1 : opts.items_per_page;

				if (!$.PaginationRenderers[opts.renderer]) {
					throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object.");
				}
				renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

				// Attach control events to the DOM elements
				var pc = new $.PaginationCalculator(maxentries, opts);
				var np = pc.numPages();
				containers.bind('setPage', { numPages: np }, function (evt, page_id) {
					if (page_id >= 0 && page_id < evt.data.numPages) {
						selectPage(page_id);return false;
					}
				});
				containers.bind('prevPage', function (evt) {
					var current_page = $(this).data('current_page');
					if (current_page > 0) {
						selectPage(current_page - 1);
					}
					return false;
				});
				containers.bind('nextPage', { numPages: np }, function (evt) {
					var current_page = $(this).data('current_page');
					if (current_page < evt.data.numPages - 1) {
						selectPage(current_page + 1);
					}
					return false;
				});

				// When all initialisation is done, draw the links
				links = renderer.getLinks(current_page, paginationClickHandler);
				containers.empty();
				if (np > 1 || opts.show_if_single_page) {
					links.appendTo(containers);
				}
				// call callback function
				if (opts.load_first_page) {
					opts.callback(current_page, containers);
				}
			}; // End of $.fn.pagination block
		})(jQuery);
	};

/***/ })
/******/ ]);
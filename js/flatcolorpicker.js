/* ========================================================================
 * FlatColorPicker: v0.2
 * https://github.com/takien/FlatColorPicker
 * ========================================================================
 * Copyright 2014 Takien.com
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 * ======================================================================== */


+function ($) {
  'use strict';

  // FlatColorPicker PUBLIC CLASS DEFINITION
  // ===============================

  var FlatColorPicker = function (element, options) {
    this.init('flatcolorpicker', element, options)
  }

  if (!$.fn.popover) throw new Error('FlatColorPicker requires Popover from Bootstrap')

  FlatColorPicker.VERSION  = '0.2'

  FlatColorPicker.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
    placement: 'bottom',
    trigger: 'click',
    colors: '1E824C,00B16A,019875,03A678,03C9A9,049372,16A085,1BA39C,1BBC9B,26A65B,26C281,2ABB9B,36D7B7,3FC380,2ECC71,4DAF7C,4ECDC4,65C6BB,66CC99,68C3A3,87D37C,90C695,86E2D5,A2DED0,C8F7C5,6BB9F0,81CFE0,89C4F4,52B3D9,59ABE3,19B5FE,1E8BC3,1F3A93,22313F,2C3E50,34495E,3A539B,22A7F0,2574A9,336E7B,3498DB,4183D7,446CB3,4B77BE,5C97BF,67809F,6C7A89,95A5A6,ABB7B7,BDC3C7,BFBFBF,C5EFF7,DADFE1,D2D7D3,FFECDB,ECECEC,ECF0F1,EEEEEE,E4F1FE,F2F1EF,663399,674172,8E44AD,913D88,9A12B3,9B59B6,BE90D4,BF55EC,AEA8D3,D24D57,D2527F,F62459,DB0A5B,DCC6E0,E08283,E26A6A,E67E22,E74C3C,E87E04,EB9532,EB974E,F1A9A0,F2784B,D35400,F27935,F39C12,F4B350,F4D03F,F5AB35,F5D76E,F7CA18,F89406,F9690E,F9BF3B,FDE3A7,FF0000,EF4836,D64541,F22613,F64747,C0392B,D91E18,96281B,CF000F',
    content: '',
    template: '<div class="flatcolorpicker-popover popover" role="tooltip"><div class="arrow"></div>\
<div class="popover-header"><button type="button" class="close" data-dismiss="popover"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
<h3 class="popover-title"></h3></div>\
<div class="row"><div class="col-sm-6">\
<div class="flatcolorpicker-filter input-group">\
<input type="text" class="form-control" placeholder="Type a color name or code to filter" />\
<span class="input-group-btn">\
 <button class="btn btn-default" type="button">&times;</button>\
</span>\
</div>\
</div><div class="col-sm-6">\
<div class="btn-group btn-group-justified flatcolorpicker-display-filter">\
<div class="btn-group"><button class="btn btn-default active">HEX</button></div>\
<div class="btn-group"><button class="btn btn-default">RGB</button></div>\
<div class="btn-group"><button class="btn btn-default">Name</button></div>\
<div class="btn-group"><button class="btn btn-default">None</button></div>\
</div>\
</div></div>\
<div class="flatcolorpicker-recent clearfix"></div>\
<div class="popover-content flatcolorpicker-content" style="padding:0"></div>\
</div>'
  })


  // NOTE: FlatColorPicker EXTENDS Popover
  // ================================

  FlatColorPicker.prototype = $.extend({}, $.fn.popover.Constructor.prototype)

  FlatColorPicker.prototype.constructor = FlatColorPicker

  FlatColorPicker.prototype.getDefaults = function () {
    return FlatColorPicker.DEFAULTS
  }

  FlatColorPicker.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()['html'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
	
	this.formatContent();
	this.insertColor();
	this.filter();
	this.filterLabel();
	this.Close();
  }

  FlatColorPicker.prototype.getContent = function () {
	 var o  = this.options,
	     c  = this.c();
     return '<div class="'+c+'-item"><div class="'+c+'-hex">'+o.colors.split(',').join('</div></div><div class="'+c+'-item"><div class="'+c+'-hex">').toLowerCase()+'</div></div>';
  }
  
  FlatColorPicker.prototype.close = function () {
    return this.tip().find('.close');
  }
  
  FlatColorPicker.prototype.formatContent = function () {
	var c   = this.c(),
	tip     = this.tip(),
    col     = tip.find('.'+c+'-item'),
	hex     = '';
	
	col.each(function(){
		hex = '#'+$(this).find('.'+c+'-hex').text();
		$(this).css({
		  backgroundColor:hex,
		  'color':(Math.round($.xcolor.distance(hex,'#FFF')) > 250) ? '#FFF' : '#666'
		}).append('<div class="'+c+'-rgb">'+$.xcolor.test(hex).getCSS().replace(/rgb\(|\)/g,'')+'</div><div class="'+c+'-name">'+$.xcolor.test(hex).getName()+'</div>');
	});
  }
  
  FlatColorPicker.prototype.insertColor = function () {
	var c   = this.c(),
	tip     = this.tip(),
	inp     = this.$element,
	rec     = tip.find('.'+c+'-recent'),
	hex     = '';
  	tip.on('click','.'+c+'-item',function(e) {
		
        hex = $(this).find('.'+c+'-hex').text();
        inp.val('#'+hex.toUpperCase()).change();
        
        rec.find("."+c+"-item:contains('"+hex+"')" ).remove();
  
        if(rec.find('.'+c+'-item').length > 9) {
          rec.find('.'+c+'-item').last().remove();
        }
        rec.prepend($(this).wrapAll('<div></div>').parent().html());
        e.preventDefault();
    });
  }
  
  FlatColorPicker.prototype.filter = function() {
	var c   = this.c(),
	tip     = this.tip();
	
	tip.on('change keyup keydown','.'+c+'-filter input',function(){
        tip.find('.'+c+'-content .'+c+'-item').hide();
        tip.find('.'+c+'-content .'+c+'-item:contains("'+$(this).val().replace('#','').toLowerCase()+'")').show();
    });
	
	tip.on('click','.'+c+'-filter .btn',function(e){
		$('.'+c+'-filter input').val('').change();
		e.preventDefault();
	});
  }
  
  FlatColorPicker.prototype.filterLabel = function() {
	var c   = this.c(),
	tip     = this.tip();
	
	tip.find('.'+c+'-item > div').hide();
	tip.find('.'+c+'-item .'+c+'-'+tip.find('.'+c+'-display-filter .active').text().toLowerCase()).show();

	tip.on('click','.'+c+'-display-filter .btn',function (e) {
		tip.find('.'+c+'-item > div').hide();
		tip.find('.'+c+'-item .'+c+'-'+$(this).text().toLowerCase()).show();
		$(this).parents('.'+c+'-display-filter').find('.btn').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
  }
  
  FlatColorPicker.prototype.Close = function() {
	var c   = this.c(),
	tip     = this.tip();
	tip.find('.close').click(function(){
        $('.'+c).flatcolorpicker('hide');
    });
  }
  
  
  FlatColorPicker.prototype.c = function () {
	return 'flatcolorpicker';
  }
  
  
  // FlatColorPicker PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this    = $(this)
      var data     = $this.data('bs.flatcolorpicker')
      var options  = typeof option == 'object' && option
      var selector = options && options.selector

      if (!data && option == 'destroy') return
      if (selector) {
        if (!data) $this.data('bs.flatcolorpicker', (data = {}))
        if (!data[selector]) data[selector] = new FlatColorPicker(this, options)
      } else {
        if (!data) $this.data('bs.flatcolorpicker', (data = new FlatColorPicker(this, options)))
      }
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.flatcolorpicker

  $.fn.flatcolorpicker             = Plugin
  $.fn.flatcolorpicker.Constructor = FlatColorPicker


  // POPOVER NO CONFLICT
  // ===================

  $.fn.flatcolorpicker.noConflict = function () {
    $.fn.flatcolorpicker = old
    return this
  }

}(jQuery);
/*
flat color picker 
@author: takien
@URL : http://takien.com
*/

jQuery(document).ready(function($){
  /*jshint multistr: true */
var fcpcolor = ["1E824C",
"00B16A",
"019875",
"03A678",
"03C9A9",
"049372",
"16A085",
"1BA39C",
"1BBC9B",
"26A65B",
"26C281",
"2ABB9B",
"36D7B7",
"3FC380",
"2ECC71",
"4DAF7C",
"4ECDC4",
"65C6BB",
"66CC99",
"68C3A3",
"87D37C",
"90C695",
"86E2D5",
"A2DED0",
"C8F7C5",
"6BB9F0",
"81CFE0",
"89C4F4",
"52B3D9",
"59ABE3",
"19B5FE",
"1E8BC3",
"1F3A93",
"22313F",
"2C3E50",
"34495E",
"3A539B",
"22A7F0",
"2574A9",
"336E7B",
"3498DB",
"4183D7",
"446CB3",
"4B77BE",
"5C97BF",
"67809F",
"6C7A89",
"95A5A6",
"ABB7B7",
"BDC3C7",
"BFBFBF",
"C5EFF7",
"DADFE1",
"D2D7D3",
"FFECDB",
"ECECEC",
"ECF0F1",
"EEEEEE",
"E4F1FE",
"F2F1EF",
"663399",
"674172",
"8E44AD",
"913D88",
"9A12B3",
"9B59B6",
"BE90D4",
"BF55EC",
"AEA8D3",
"D24D57",
"D2527F",
"F62459",
"DB0A5B",
"DCC6E0",
"E08283",
"E26A6A",
"E67E22",
"E74C3C",
"E87E04",
"EB9532",
"EB974E",
"F1A9A0",
"F2784B",
"D35400",
"F27935",
"F39C12",
"F4B350",
"F4D03F",
"F5AB35",
"F5D76E",
"F7CA18",
"F89406",
"F9690E",
"F9BF3B",
"FDE3A7",
"FF0000",
"EF4836",
"D64541",
"F22613",
"F64747",
"C0392B",
"D91E18",
"96281B",
"CF000F"];

  $('.flatcolorpicker').popover({
    trigger:'click',
    html:true,
    content: '<div class="flatcolorpicker-item">'+fcpcolor.join('</div><div class="flatcolorpicker-item">')+'</div>',
    template:'<div class="flatcolorpicker-popover popover" role="tooltip"><div class="arrow"></div>\
<div class="popover-header"><button type="button" class="close" data-dismiss="popover"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\
<h3 class="popover-title"></h3></div>\
<div class="flatcolorpicker-recent clearfix"></div>\
<div class="popover-content flatcolorpicker-content" style="padding:0"></div>\
</div>'
  });
  $('.flatcolorpicker').on('shown.bs.popover', function () {
      var inp = $(this);
      var pop = inp.next();
      var col = pop.find('.popover-content .flatcolorpicker-item');
      var rec = pop.find('.flatcolorpicker-recent');
    
      col.each(function(){
        $(this).css('background','#'+$(this).text());
      });
    
      $(col).on('click',function(e) {
        inp.val('#'+$(this).text()).change();
        
        rec.find("div:contains('"+$(this).text()+"')" ).remove();

        
        if(rec.find('div').length > 9) {
          rec.find('div').last().remove();
        }
        
        rec.prepend($(this).wrapAll('<div></div>').parent().html());
        
       
        e.preventDefault();
      });
      pop.find('.close').click(function(){
        $('.flatcolorpicker').popover('hide');
      });
  });

});
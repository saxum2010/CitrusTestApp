function InitNews(){	 LoadNewsResults(0);	 var LS = LazyListViewComponent("news-listview","news-page",LoadNewsResults);	}function LoadNewsResults(position_to_get){		var request = "&q="+encodeURIComponent($("#search-page-search-input").val());	ShowLoading();	 	var device =isIOS()?"apple":3;	$.ajax({ 	  url: "http://m.citrus.ua/ajax/news.php?app="+device+"&position="+position_to_get+"&count=40"+request, 	  dataType: 'json', 	  success: function( json ) {			 var output = "";			 var count = 0;			 			 if(json.items !== undefined )			 $.each( json.items, function( key, value ) {			 	var url ;							///url = "category-items=" +  value.link;					var lazy = "";				if(key ==json.items.length-1)				{					if(json.parameters && json.parameters.lazy && json.parameters.lazy == 1){						lazy = "lazy_load_more";					}				}				var image = "";				if(value.pic != undefined){					image = '<img src="' + value.pic + '" >';				}				output += '<li class="'+lazy+'"><a onclick="Showtextpage('+value.id+')" data-transition="slide" data-ajax=false   "> 					<table style="width:100%"> 						<tr> 							<td style="vertical-align: middle;text-align:center;width:64px" class="first"> 								'+image+'							 							</td> 							<td style="vertical-align:middle;text-align:left;padding-left:1.1rem;"> 								<h2 class="item_name_only product">' + value.name + '</h2>	<div class="preview_text">' + value.text + '</div>						</td> 							<td style="width:25px"> 							</td> 						</tr> 					</table> 					 				</a></li>';							 });				 if( position_to_get > 0){				  $('#news-listview').html($('#news-listview').html()+output).listview("refresh");			 }else{				  				  				  $('#news-listview').html(output).listview("refresh");			 }							 $.mobile.loading( "hide" );			 ProssedTapEvents();			 		 }, 	  timeout: 5000 ,	  error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 				 	ShowMessage(1);		 $.mobile.loading( "hide" );			  } 	});}
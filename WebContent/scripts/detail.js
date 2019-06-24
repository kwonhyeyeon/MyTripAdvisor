/**
 * 
 */

$(function(){
	var id = parseId(window.location.search);
	console.log('id', id);
	showMap();
});

// 인자로 '문자열'을 받은 후, 그 안에 id값을 찾아 반환한다.
function parseId(str){
	// substring() 함수로 ?을 제외한 나머지 문자열을 가져온다. url에 포함된 &(엠퍼샌드) 기호로 연결되어 있으면 split() 함수를 사용한다.
	var s = str.substring(1);
	// split()을 실행해 키와 값으로 구성된 배열을 반환 받는다.
	var args = s.split('&');
	
	// 반복문을 사용해 id란 키를 찾아내고 찾지 못하면 null을 반환한다.
	for(var i = 0; i < args.length; i++){
		var arg = args[i];
		var tokens = arg.split('=');
		
		if(tokens[0] === 'id'){
			return tokens[1];
		}
	}
	return null;
}
// getDetail() 함수를 만들고 페이지 로드시에 실행되어야 하므로 호출 부분에도 추가.
function getDetail(id){
	
	// 갤러리아를 사용하기 위해서는 이미지들을 <img>태그로 만들어 넣어야 한다.
	// 이를 위해 detail-images 라는 id로 <div> 태그를 만들었다.
	// 이곳에 서버에서 반환된 결과 중 subImageList에 있는 이미지들을 넣어준다.
	var url = 'https://javascript-basic.appspot.com/locationDetail';
	
	$.getJSON(url, {
		id : id
	}, function(r){
		$('.detail-header-name').html(r.name);
		$('.detail-header-city-name').html(r.cityName);
		$('.detail-desc-text').html(r.desc);
		
		var $gallery = $("#detail-images");
		var images = r.subImageList;
		// subImageList는 배열이므로 for문을 사용한다.
		for(var i = 0; i < images.length; i++){
			var $image = $('<img src="' + images[i] + '" />');
			$gallery.append($image);
		}
		Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
		Galleria.run('#detail-images');
		
		showMarker(r.position.x, r.position.y);
		
		
		$('.brn-register').click(function(){
			var myTrips = Cookies.getJSON('MYTRIPS');
			
			// 존재하지 않을 경우 빈 배열로 초기화
			if(!myTrips){
				myTrips = [];
			}
			// 여행지를 myTrips에 추가
			
			myTrips.push({
				id:id,
				name: r.name,
				cityName: r.cityName,
				x: r.position.x,
				y:r.position.y
			});
			Cookies.set('MYTRIPS', myTrips);
			
			alert("여행지가 등록되었습니다!");
		});
	});
}

function showMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		zoom:12,
		center: {
			lat : 33.3617,
			lng : 126.5292
		}
	});
}

function showMarker(lat, lng){
	var pos = {
			lat : lat,
			lng : lng
	};
	
	new google.maps.Marker({
		position : pos,
		map : map
	});
	map.panTo(pos);
}

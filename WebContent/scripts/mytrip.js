// 라벨로 쓸 문자열 선언, 여행지는 ABC 순서대로 지정하고 배열을 사용한다
var MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var map;
var markers = {};

$(function() {
	
	// 쿠키에 저장된 데이터로 목록 생성
	// 쿠키에 저장된 여행지 목록 -> 각각의 여행지 데이터 -> 템플릿으로 완성한 여행지 엘리먼트
	var myTrips = Cookies.getJSON("MYTRIPS");
	if(!myTrips) {
		myTrips = [];
	}
	
	showMap();
	
	generateMyTripList(myTrips);
	
});

// 여행지 목록을 구현하는 함수
function generateMyTripList(list) {
	
	var bounds = new google.maps.LatLngBounds();
	var $list = $("#mytrip-list");
	
	for(var i = 0; i < list.length; i++) {
		var myTrip = list[i];
		
		var pos = {
			lat : myTrip.x,
			lng : myTrip.y
		};
		
		var markerLable = MARKER_LABELS[i];
		
		var $item = $("#mytrip-item-template").clone().removeAttr("id");
		$item.find(".item-name").html(markerLable + '. ' + myTrip.name);
		$item.find(".item-city-name").html(myTrip.cityName);
		
		// 목록에서 여행지 제거
		// 여행지 우측에 x 버튼을 클릭하면
		// 해당 여행지 목록과 지도에서 사라지고 쿠키에 저장된 데이터도 사라져야한다
		$item.find(".item-remove").click(function() {
			var $elem = $(this).closest(".mytrip-item");
			$elem.remove();
			
			// 마커 제거
			marker[id].setMap(null);
			markers[id] = null;
			
			// 쿠키에 저장된 목록에서 제거한 여행지 제외 후 다시 쿠키에 저장하는 로직
			var newList = removeFromList(list, id);
			Cookies.set("MYTRIPS", newList);
		});
		
		$list.append($item);
		
		var marker = new google.maps.Marker({
			position : pos,
			label : markerLabel,
			map : map
		});
		
		markers[myTrip.id] = marker;
		bounds.extend(pos);
	}
	map.fitBounds(bounds);
}

function removeFromList(list, id) {
	
	var index = -1;
	
	for(var i = 0; i < list.length; i++) {
		if(list[i].id === id) {
			index = i;
			break;
		}
	}
	
	// 배열에서 특정 요소를 제거하는 splice 함수를 사용한다
	// splice 함수를 호출하기 전에 원하는 요소의 인덱스를 for문으로 찾는다
	if(index !== -1) {
		list.splice(index, 1);
	}
	
	return list;
	
}

function showMap() {
	
	map = new google.maps.Map(document.getElementById("map"), {
		zoom : 12,
		center : {
			lat : 33.3617,
			lng : 126.5292
		}
	});
	
}
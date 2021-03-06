var lat = -99999;
var lng = -99999;

var me = new google.maps.LatLng(lat, lng);
var myOptions = {
                    zoom: 13,
                    center: me,
};


var map;
var selfMarker;
var infowindow = new google.maps.InfoWindow();
var image = 'T.png';
var request = new XMLHttpRequest();
var tSchedule;
var content;

function init() {
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    getMyLocation();
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            requestSchedule();
        });
    }
    else {
        alert("Sorry, geolocation is not supported by your web browser.  -MGMT");
    }
    renderMap();
}

var errorMessage = "";
var function_count = 0;

function renderMap() {
    me = new google.maps.LatLng(lat, lng);

    map.panTo(me);

  if (function_count != 0) {
    selfMarker = new google.maps.Marker({
            position: me,
            title:"Closest Station: <strong>" + haversine + "</strong>, it is " + stationDist.toFixed(2) + " miles away."
        });
    selfMarker.setMap(map);

    google.maps.event.addListener(selfMarker, 'click', function() {
            infowindow.setContent(selfMarker.title + errorMessage);
            infowindow.open(map, selfMarker);
        });
  }
  function_count++;
}

var tLines = {};
var parsedLines = [
      {
        "Line":"Blue",
        "Station":"Airport",
        "Latitude":42.374262,
        "Longitude":-71.030395,
        "number": 6
      },
      {
        "Line":"Blue",
        "Station":"Aquarium",
        "Latitude":42.359784,
        "Longitude":-71.051652,
        "number": 8
      },
      {
        "Line":"Blue",
        "Station":"Beachmont",
        "Latitude":42.39754234,
        "Longitude":-70.99231944,
        "number": 2
      },
      {
        "Line":"Blue",
        "Station":"Bowdoin",
        "Latitude":42.361365,
        "Longitude":-71.062037,
        "number": 11
      },
      {
        "Line":"Blue",
        "Station":"Government Center",
        "Latitude":42.359705,
        "Longitude":-71.05921499999999,
        "number": 10
      },
      {
        "Line":"Blue",
        "Station":"Maverick",
        "Latitude":42.36911856,
        "Longitude":-71.03952958000001,
        "number": 7
      },
      {
        "Line":"Blue",
        "Station":"Orient Heights",
        "Latitude":42.386867,
        "Longitude":-71.00473599999999,
        "number": 4
      },
      {
        "Line":"Blue",
        "Station":"Revere Beach",
        "Latitude":42.40784254,
        "Longitude":-70.99253321,
        "number": 1
      },
      {
        "Line":"Blue",
        "Station":"State Street",
        "Latitude":42.358978,
        "Longitude":-71.057598,
        "number": 9
      },
      {
        "Line":"Blue",
        "Station":"Suffolk Downs",
        "Latitude":42.39050067,
        "Longitude":-70.99712259,
        "number": 3
      },
      {
        "Line":"Blue",
        "Station":"Wonderland",
        "Latitude":42.41342,
        "Longitude":-70.991648,
        "number": 0
      },
      {
        "Line":"Blue",
        "Station":"Wood Island",
        "Latitude":42.3796403,
        "Longitude":-71.02286539000001,
        "number": 5
      },
      {
        "Line":"Orange",
        "Station":"Back Bay",
        "Latitude":42.34735,
        "Longitude":-71.075727,
        "number": 11
      },
      {
        "Line":"Orange",
        "Station":"Chinatown",
        "Latitude":42.352547,
        "Longitude":-71.062752,
        "number": 9
      },
      {
        "Line":"Orange",
        "Station":"Community College",
        "Latitude":42.373622,
        "Longitude":-71.06953300000001,
        "number": 4
      },
      {
        "Line":"Orange",
        "Station":"Downtown Crossing",
        "Latitude":42.355518,
        "Longitude":-71.060225,
        "number": 8
      },
      {
        "Line":"Orange",
        "Station":"Forest Hills",
        "Latitude":42.300523,
        "Longitude":-71.113686,
        "number": 18
      },
      {
        "Line":"Orange",
        "Station":"Green Street",
        "Latitude":42.310525,
        "Longitude":-71.10741400000001,
        "number": 17
      },
      {
        "Line":"Orange",
        "Station":"Haymarket",
        "Latitude":42.363021,
        "Longitude":-71.05829,
        "number": 6
      },
      {
        "Line":"Orange",
        "Station":"Jackson Square",
        "Latitude":42.323132,
        "Longitude":-71.099592,
        "number": 15
      },
      {
        "Line":"Orange",
        "Station":"Malden Center",
        "Latitude":42.426632,
        "Longitude":-71.07411,
        "number": 1
      },
      {
        "Line":"Orange",
        "Station":"Mass Ave",
        "Latitude":42.341512,
        "Longitude":-71.083423,
        "number": 12
      },
      {
        "Line":"Orange",
        "Station":"North Station",
        "Latitude":42.365577,
        "Longitude":-71.06129,
        "number": 5
      },
      {
        "Line":"Orange",
        "Station":"Oak Grove",
        "Latitude":42.43668,
        "Longitude":-71.07109699999999,
        "number": 0
      },
      {
        "Line":"Orange",
        "Station":"Roxbury Crossing",
        "Latitude":42.331397,
        "Longitude":-71.095451,
        "number": 14
      },
      {
        "Line":"Orange",
        "Station":"Ruggles",
        "Latitude":42.336377,
        "Longitude":-71.088961,
        "number": 13
      },
      {
        "Line":"Orange",
        "Station":"State Street",
        "Latitude":42.358978,
        "Longitude":-71.057598,
        "number": 7
      },
      {
        "Line":"Orange",
        "Station":"Stony Brook",
        "Latitude":42.317062,
        "Longitude":-71.104248,
        "number": 16
      },
      {
        "Line":"Orange",
        "Station":"Sullivan",
        "Latitude":42.383975,
        "Longitude":-71.076994,
        "number": 3
      },
      {
        "Line":"Orange",
        "Station":"Tufts Medical",
        "Latitude":42.349662,
        "Longitude":-71.063917,
        "number": 10
      },
      {
        "Line":"Orange",
        "Station":"Wellington",
        "Latitude":42.40237,
        "Longitude":-71.077082,
        "number": 2
      },
      {
        "Line":"Red",
        "Station":"Alewife",
        "Latitude":42.395428,
        "Longitude":-71.142483,
        "number": 0
      },
      {
        "Line":"Red",
        "Station":"Andrew",
        "Latitude":42.330154,
        "Longitude":-71.057655,
        "number": 11
      },
      {
        "Line":"Red",
        "Station":"Ashmont",
        "Latitude":42.284652,
        "Longitude":-71.06448899999999,
        "number": 21
      },
      {
        "Line":"Red",
        "Station":"Braintree",
        "Latitude":42.2078543,
        "Longitude":-71.0011385,
        "number": 18
      },
      {
        "Line":"Red",
        "Station":"Broadway",
        "Latitude":42.342622,
        "Longitude":-71.056967,
        "number": 10
      },
      {
        "Line":"Red",
        "Station":"Central Square",
        "Latitude":42.365486,
        "Longitude":-71.103802,
        "number": 4
      },
      {
        "Line":"Red",
        "Station":"Charles/MGH",
        "Latitude":42.361166,
        "Longitude":-71.070628,
        "number": 6
      },
      {
        "Line":"Red",
        "Station":"Davis",
        "Latitude":42.39674,
        "Longitude":-71.121815,
        "number": 1
      },
      {
        "Line":"Red",
        "Station":"Downtown Crossing",
        "Latitude":42.355518,
        "Longitude":-71.060225,
        "number": 8
      },
      {
        "Line":"Red",
        "Station":"Fields Corner",
        "Latitude":42.300093,
        "Longitude":-71.061667,
        "number": 19
      },
      {
        "Line":"Red",
        "Station":"Harvard Square",
        "Latitude":42.373362,
        "Longitude":-71.118956,
        "number": 3
      },
      {
        "Line":"Red",
        "Station":"JFK/UMass",
        "Latitude":42.320685,
        "Longitude":-71.052391,
        "number": 12
      },
      {
        "Line":"Red",
        "Station":"Kendall/MIT",
        "Latitude":42.36249079,
        "Longitude":-71.08617653,
        "number": 5
      },
      {
        "Line":"Red",
        "Station":"North Quincy",
        "Latitude":42.275275,
        "Longitude":-71.029583,
        "number": 14
      },
      {
        "Line":"Red",
        "Station":"Park Street",
        "Latitude":42.35639457,
        "Longitude":-71.0624242,
        "number": 7
      },
      {
        "Line":"Red",
        "Station":"Porter Square",
        "Latitude":42.3884,
        "Longitude":-71.11914899999999,
        "number": 2
      },
      {
        "Line":"Red",
        "Station":"Quincy Adams",
        "Latitude":42.233391,
        "Longitude":-71.007153,
        "number":  17
      },
      {
        "Line":"Red",
        "Station":"Quincy Center",
        "Latitude":42.251809,
        "Longitude":-71.005409,
        "number": 16
      },
      {
        "Line":"Red",
        "Station":"Savin Hill",
        "Latitude":42.31129,
        "Longitude":-71.053331,
        "number": 13
      },
      {
        "Line":"Red",
        "Station":"Shawmut",
        "Latitude":42.29312583,
        "Longitude":-71.06573796000001,
        "number": 20
      },
      {
        "Line":"Red",
        "Station":"South Station",
        "Latitude":42.352271,
        "Longitude":-71.05524200000001,
        "number": 9
      },
      {
        "Line":"Red",
        "Station":"Wollaston",
        "Latitude":42.2665139,
        "Longitude":-71.0203369,
        "number": 15
      }
    ];

var haversine;
var rodeoLine;
var stationDist;

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

function findClosestStation() {

    parsedLines.forEach(function (station) {

        var R = 6371;
        var dLat = (lat-station.Latitude).toRad();
        var dLon = (lng-station.Longitude).toRad();
        var lat1 = station.Latitude.toRad();
        var lat2 = lng.toRad();

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        station["distance"] = d;

    });
    findClosest();
}

function findClosest() {

  var maxDist = 0;

  rodeoline = rodeoLine.charAt(0).toUpperCase() + rodeoLine.substring(1);

  parsedLines.forEach(function (station) {
    if (station.Line == rodeoline) {
      if (maxDist < station.distance) {
          maxDist = station.distance;
      }
    }
  });

  var minDist = maxDist;

  parsedLines.forEach(function (station) {
    if (station.Line == rodeoline) {
      if (minDist > station.distance) {
          minDist = station.distance;
          haversine = station.Station;
          stationDist = minDist;
      }
    }
  });
  renderMap();
}

function makeLines() {

    var blueArr = [];
    var orangeArr = [];
    var redArr = [];
    var redArr2 = [];

    parsedLines.forEach(function (station) {
        if (station.Line == "Blue") {
            blueArr[station.number] = new google.maps.LatLng(station.Latitude, station.Longitude);
        } else if (station.Line == "Orange") {
            orangeArr[station.number] = new google.maps.LatLng(station.Latitude, station.Longitude);
        } else if (station.Line == "Red") {
            if (station.number == 13) {
              redArr2[0] = new google.maps.LatLng(station.Latitude, station.Longitude);
            }
            if (station.number > 18) {
              redArr2[station.number - 18] = new google.maps.LatLng(station.Latitude, station.Longitude);
            }
            if (station.number < 19) {
              redArr[station.number] = new google.maps.LatLng(station.Latitude, station.Longitude);
            }
        }
    });

    tLines["blue"] = blueArr;
    tLines["orange"] = orangeArr;
    tLines["red"] = redArr;

    for (color in tLines) {
        if (color == rodeoLine) {
            Path = new google.maps.Polyline({
                path: tLines[color],
                geodesic: true,
                strokeColor: String(color),
                strokeOpacity: 5.0,
                strokeWeight: 4
            });
            Path.setMap(map);
            if (color == "red") {
              redPath2 = new google.maps.Polyline({
                path: redArr2,
                geodesic: true,
                strokeColor: String(color),
                strokeOpacity: 5.0,
                strokeWeight: 4
              });
            redPath2.setMap(map);
            }
        }
    }
}

function makeStations() {

  var train;
  var destination;
  var time;
  var stops;

  rodeoline = rodeoLine.charAt(0).toUpperCase() + rodeoLine.substring(1);
  parsedLines.forEach(function (station) {
      if (station.Line == rodeoline) {
          var place = new google.maps.LatLng(station.Latitude, station.Longitude);
          var name = station.Station;
          var marker = new google.maps.Marker({
                      position: place,
                      title: "<strong>" + name + "</strong> (about <strong>" 
                        + station.distance.toFixed(2) + "</strong> miles away)",
                      icon: image
                  });
          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function() {

            content = '<table><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
            for (var i = 0; i < tSchedule['schedule'].length; i++) {
                train = tSchedule['schedule'][i];
                stops = train['Predictions'];
                for (var j =0; j < stops.length; j++) {
                    if (stops[j]['Stop'] == name) {
                      time = stops[j]['Seconds'] + " secs.";
                      destination = train['Destination'];
                      content += '<tr><td>' + tSchedule.line + '</td><td>' + train['TripID'] + '</td><td>' + destination 
                      + '</td><td>' + time + '</td></tr>';
                    }
                }
            }
            content += '</table>';

            infowindow.setContent(marker.title + content);
            infowindow.open(map, marker);
      });
      }
  });
}

function requestSchedule() {
    request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
    request.onreadystatechange = dataReady;
    request.send(null);
}

function dataReady() {
    if (request.readyState == 4 && request.status == 200) {
        tSchedule = JSON.parse(request.responseText);
        rodeoLine = tSchedule.line;
        findClosestStation();
        makeStations();
        makeLines();
    } else if (request.readyState == 4 && request.status == 500) {
        requestSchedule();
    }
}
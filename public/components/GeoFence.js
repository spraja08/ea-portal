import React, { Component } from 'react';

class GeoFence extends Component {
  googleMapRef = React.createRef();
  searchBoxRef = React.createRef();

  constructor(props) {
    super(props);
 
    let incomingFence = [];
    if( props.geoFenceCoords != null && props.geoFenceCoords.length > 0 )
        incomingFence = props.geoFenceCoords;
    this.state = {
      vertices: incomingFence,
    };

    this.removeShape = this.removeShape.bind(this);
  }

  initialiseFence(map) {
    if( this.state.vertices.length == 0 )
      return;

    var initialfenceCoords = [];
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < this.state.vertices.length; i++) {
      var pt = new window.google.maps.LatLng(this.state.vertices[i][0], this.state.vertices[i][1]);
      initialfenceCoords.push(pt);
      bounds.extend(pt);
    }       
    var initialfence = new window.google.maps.Polygon({
      paths: initialfenceCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
    });
    initialfence.setMap(map);
    map.fitBounds(bounds);
    this.setState({ geofenceOverlay: initialfence });
  }

  componentDidMount() {
    this.createMapWithSearchBox();
  }

  createMapWithSearchBox() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDNky_CeUScOyH3-d-NGfXEAQVhP-n9PK8&libraries=places,geometry,drawing';
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();
      this.drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          editable: true,
        },
      });
      this.drawingManager.setMap(this.googleMap);
      window.google.maps.event.addListener(
        this.drawingManager,
        'overlaycomplete',
        this.overlayComplete
      );
      this.initialiseFence(this.googleMap);
      this.addSearchBox(this.googleMap);
    });
  }

  overlayComplete = (event) => {
    let path=[];
    let fencePoints = event.overlay.getPath();
    fencePoints.forEach(function (xy, i) {
      path.push( [ xy.lat(), xy.lng() ] );    
    });
    this.setState({ vertices: path });
    this.setState({ geofenceOverlay: event.overlay });
  };

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 13,
      center: {
        lat: 1.3053603738630137,
        lng: 103.91608884736023,
      },
      mapTypeControl: false,
    });

  addSearchBox = (map) => {
    // Create the search box and link it to the UI element.
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this.searchBoxRef.current);
    var searchBox = new window.google.maps.places.SearchBox(this.searchBoxRef.current);
    window.google.maps.event.addListener(searchBox, 'places_changed', function () {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // For each place, get the icon, place name, and location.
      var markers = [];
      var bounds = new window.google.maps.LatLngBounds();
      for (var i = 0, place; (place = places[i]); i++) {
        var image = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        var marker = new window.google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        markers.push(marker);
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    window.google.maps.event.addListener(map, 'bounds_changed', function () {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });
  };

  removeShape() {
    this.state.geofenceOverlay.setMap(null);
    this.setState({ vertices: null });
  }

  getGeoFence() {
    return this.state.vertices;
  }

  render() {
    return (
      <div>
        <div>
          <input
            id="pac-input"
            style={{ width: '300px', height: '20px' }}
            class="controls"
            type="text"
            placeholder="Search Box"
            ref={this.searchBoxRef}
          />
        </div>
        <div id="google-map" ref={this.googleMapRef} style={{ height: '400px' }} />
      </div>
    );
  }
}

export default GeoFence;

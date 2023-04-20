import {
  icon,
  map,
  marker,
  tileLayer,
} from 'https://cdn.skypack.dev/leaflet@1.9.3'
import ardi from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-iss',
  shadow: false,
  props: {
    iconheight: [Number, 48],
    iconurl: [
      String,
      'https://img.icons8.com/external-topaz-kerismaker/512/external-ISS-space-topaz-kerismaker.png',
    ],
    iconwidth: [Number, 48],
    tileattribution: [
      String,
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    ],
    tileurl: [
      String,
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    ],
    updateinterval: [Number, 3000],
    zoomlevel: [Number, 3],
  },
  createTileLayer() {
    const attribution = this.attribution
    tileLayer(this.tileurl, {
      attribution: `<span title="${attribution}">Hover for Attribution</span>`,
    }).addTo(this.map)
  },
  createIcon() {
    this.icon = icon({
      iconUrl: this.iconurl,
      iconSize: [this.iconwidth, this.iconheight],
      iconAnchor: [this.iconwidth / 2, this.iconheight / 2],
    })
  },
  createMap(lat, lng) {
    this.map = map(this.refs.map).setView([lat, lng], this.zoomlevel)
    this.createTileLayer()
    this.createIcon()
    this.marker = marker([lat, lng], { icon: this.icon }).addTo(this.map)
  },
  getIssPosition() {
    fetch('/.netlify/functions/iss')
      .then((res) => res.json())
      .then((data) => {
        const {
          data: {
            iss_position: { latitude, longitude },
          },
        } = data
        if (!this.mapCreated) {
          this.createMap(latitude, longitude)
          this.mapCreated = true
        } else {
          const latlng = L.latLng(latitude, longitude)
          this.map.setView(latlng)
          this.marker.setLatLng(latlng)
        }
      })
  },
  ready() {
    setInterval(() => this.getIssPosition(), this.updateinterval)
  },
  template: () => "<div ref='map'></div>",
  css: `
		@import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
		[ref=map] {
			height: 400px
		}
		.leaflet-touch .leaflet-bar a {
			line-height: unset;
		}
	`,
})

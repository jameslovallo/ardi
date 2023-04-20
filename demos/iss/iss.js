import {
  icon,
  latLng,
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
    iconurl: [String, '/@/assets/iss.png'],
    iconwidth: [Number, 48],
    updateinterval: [Number, 3000],
    zoomlevel: [Number, 4],
  },
  createTileLayer() {
    tileLayer(
      'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 20,
        attribution:
          'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
      }
    ).addTo(this.map)
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
    fetch(
      [
        '/.netlify/functions/proxy',
        '?url=http://api.open-notify.org/iss-now.json',
        '&format=json',
      ].join('')
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          iss_position: { latitude, longitude },
        } = data
        if (!this.mapCreated) {
          this.createMap(latitude, longitude)
          this.mapCreated = true
        } else {
          const position = latLng(latitude, longitude)
          this.map.setView(position)
          this.marker.setLatLng(position)
        }
      })
  },
  ready() {
    setInterval(() => this.getIssPosition(), this.updateinterval)
  },
  template: () => "<div ref='map'></div>",
  css: /* css */ `
    @import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
    [ref=map] {
      height: 400px;
    }
    .leaflet-touch .leaflet-bar a {
      font-family: arial;
    }
  `,
})

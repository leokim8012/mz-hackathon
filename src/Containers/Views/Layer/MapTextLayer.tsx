import L from 'leaflet';

export const CustomTextLayer = L.Layer.extend({
  initialize: function (position, text, options) {
    this._latlng = L.latLng(position);
    this._text = text;
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    this._map = map;
    this._el = L.DomUtil.create('div', 'leaflet-zoom-hide');
    this._el.style.position = 'absolute';
    this._el.innerHTML = this._text;
    this.update();
    map.getPanes().overlayPane.appendChild(this._el);
    map.on('viewreset', this.update, this);
  },
  onRemove: function (map) {
    map.getPanes().overlayPane.removeChild(this._el);
    map.off('viewreset', this.update, this);
  },
  update: function () {
    if (!this._map) return;
    var position = this._map.latLngToLayerPoint(this._latlng);
    L.DomUtil.setPosition(this._el, position);
  },
});

import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl, LayerGroup, ZoomControl } from 'react-leaflet';
import { ShieldAlert, Activity } from 'lucide-react';
import mapData from '../../data/map-data.json';

const { BaseLayer, Overlay } = LayersControl;

export default function InteractiveMap() {
  const [activeAlert, setActiveAlert] = useState(null);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-[var(--glass-border)] group z-0">
      <MapContainer 
        center={[5.0, 15.0]} 
        zoom={3} 
        zoomControl={false}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        {/* Dark Matter TileLayer for DeepSea Guardian Aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomControl position="bottomright" />

        <LayersControl position="topright">
          <Overlay checked name="Active Alerts">
            <LayerGroup>
              {mapData.alerts.map(alert => (
                <CircleMarker
                  key={alert.id}
                  center={alert.coordinates}
                  radius={8}
                  pathOptions={{ 
                    color: alert.severity === 'critical' ? '#D1452C' : '#E8C547', 
                    fillColor: alert.severity === 'critical' ? '#D1452C' : '#E8C547', 
                    fillOpacity: 0.6,
                    weight: 2
                  }}
                  eventHandlers={{ click: () => setActiveAlert(alert) }}
                >
                  <Popup>
                    <div className="flex items-start gap-3 w-64">
                      <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-[#D1452C]/10 text-[#D1452C]' : 'bg-[#E8C547]/10 text-[#E8C547]'}`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-sm mb-1">{alert.title}</h4>
                        <p className="text-xs text-[var(--text-secondary)] mb-2">{alert.description}</p>
                        <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay checked name="Active Sensors">
            <LayerGroup>
              {mapData.sensors.map(sensor => (
                <CircleMarker
                  key={sensor.id}
                  center={sensor.coordinates}
                  radius={5}
                  pathOptions={{ color: 'var(--accent)', fillColor: 'var(--accent)', fillOpacity: 0.4, weight: 1 }}
                >
                  <Popup>
                    <div className="flex items-start gap-2 w-48">
                      <div className="p-1.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs mb-1">Sensor {sensor.id}</h4>
                        <p className="text-xs text-[var(--text-secondary)]">{sensor.reading}</p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </LayerGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>
      
      {/* Decorative inner glow for the map container */}
      <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_0_30px_rgba(62,107,114,0.15)] z-[400]" />
    </div>
  );
}

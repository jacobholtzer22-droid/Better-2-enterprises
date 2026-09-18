'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { site } from '@/site.config'

const MILES_TO_METERS = 1609.34

/**
 * Coverage map: a pin on Montrose (town center, deliberately not the street
 * address) with a circle for the ~1.5 hour drive radius the client is willing
 * to travel. Leaflet + OpenStreetMap tiles, loaded client-side only, on this
 * page only. Height is fixed so the map reserves space (zero CLS).
 */
export default function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let map: import('leaflet').Map | null = null
    let cancelled = false

    void import('leaflet').then((L) => {
      if (cancelled || !el) return
      const { travel } = site.serviceArea
      const center: [number, number] = [travel.mapCenter.lat, travel.mapCenter.lng]

      map = L.map(el, {
        // A map must have a view BEFORE layers with tooltips are added —
        // binding a permanent tooltip to a viewless map throws inside
        // Leaflet's projection code. fitBounds below refines this.
        center,
        zoom: 8,
        // Page scroll must never get trapped by the map on phones.
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile,
        attributionControl: true,
      })

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const circle = L.circle(center, {
        radius: travel.radiusMiles * MILES_TO_METERS,
        color: '#3240c0', // --chalk
        weight: 2,
        fillColor: '#3240c0',
        fillOpacity: 0.07,
      }).addTo(map)

      L.circleMarker(center, {
        radius: 7,
        color: '#161d24', // --ink
        weight: 2,
        fillColor: '#3240c0',
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip(travel.mapLabel, {
          direction: 'top',
          offset: L.point(0, -8),
          permanent: true,
        })

      map.fitBounds(circle.getBounds().pad(0.06), { animate: false })
    })

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Map of the Better 2 Enterprises service area: ${site.serviceArea.travel.mapLabel}, with a circle showing ${site.serviceArea.travel.radiusLabel.toLowerCase()} in every direction.`}
      className="h-[380px] w-full border border-joint bg-form md:h-[480px]"
    />
  )
}

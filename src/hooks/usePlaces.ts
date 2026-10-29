import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import dataService from '../services/dataService'

export function usePlaces() {
  const places = useStore(s => s.places)
  const setPlaces = useStore(s => s.setPlaces)

  useEffect(() => {
    let cancelled = false
    dataService.getPlaces().then(data => {
      if (!cancelled) setPlaces(data)
    })
    return () => {
      cancelled = true
    }
  }, [setPlaces])

  return places
}

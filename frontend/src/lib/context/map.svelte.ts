/**
 * Map Context Provider - Context7 Best Practices
 * Provides map state to child components using Svelte's context API
 */

import { getContext, setContext } from 'svelte';
import { mapState, mapActions } from '../stores/map.svelte';

const MAP_CONTEXT_KEY = 'map-context';

export interface MapContext {    state: typeof mapState;    actions: typeof mapActions;}

/**
 * Set map context for child components
 * Call this in a parent component to provide map state down the tree
 */
export function setMapContext() {    const context: MapContext = {        state: mapState,        actions: mapActions    };        setContext(MAP_CONTEXT_KEY, context);    return context;}

/**
 * Get map context from parent component
 * Call this in child components to access map state
 */
export function getMapContext(): MapContext {
    const context = getContext<MapContext>(MAP_CONTEXT_KEY);
    
    if (!context) {
        throw new Error('Map context not found. Make sure to call setMapContext() in a parent component.');
    }
    
    return context;
}

/**
 * Hook for easily accessing map state in components
 */
export function useMapState() {
    const { state } = getMapContext();
    return state;
}

/**
 * Hook for easily accessing map actions in components
 */
export function useMapActions() {
    const { actions } = getMapContext();
    return actions;
}

/** * Hook for easily accessing map stats in components * Note: Use getMapStats() directly from the store instead */// export function useMapStats() {//     const { stats } = getMapContext();//     return stats;// } 
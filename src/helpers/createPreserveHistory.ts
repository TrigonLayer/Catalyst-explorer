/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { History, LocationDescriptor, LocationDescriptorObject } from 'history';
import queryString from 'query-string';

type LocationState = History.LocationState;

type CreateHistory<O, H> = (options?: O) => History & H;

function preserveQueryParameters(
  history: History,
  preserve: string[],
  location: LocationDescriptorObject,
): LocationDescriptorObject {
  const currentQuery = queryString.parse(window.location.search);
  if (currentQuery) {
    const preservedQuery: { [key: string]: unknown } = {};
    for (const p of preserve) {
      const v = currentQuery[p];
      if (v) {
        preservedQuery[p] = v;
      }
    }
    if (location.search) {
      Object.assign(preservedQuery, queryString.parse(location.search));
    }
    // eslint-disable-next-line no-param-reassign
    location.search = queryString.stringify(preservedQuery);
  }
  return location;
}

// eslint-disable-next-line max-len
function createLocationDescriptorObject(location: LocationDescriptor, state?: LocationState): LocationDescriptorObject {
  return typeof location === 'string' ? { pathname: location, state } : location;
}

export function createPreserveQueryHistory<O, H>(
  createHistory: CreateHistory<O, H>,
  queryParameters: string[],
): CreateHistory<O, H> {
  return (options?: O) => {
    const history = createHistory(options);
    const oldPush = history.push;
    const oldReplace = history.replace;
    history.push = (path: LocationDescriptor, state?: LocationState) => oldPush.apply(history, [
      preserveQueryParameters(history,
        queryParameters, createLocationDescriptorObject(path, state)),
    ]);
    history.replace = (path: LocationDescriptor,
      state?: LocationState) => oldReplace.apply(history, [
      preserveQueryParameters(history,
        queryParameters, createLocationDescriptorObject(path, state)),
    ]);
    return history;
  };
}

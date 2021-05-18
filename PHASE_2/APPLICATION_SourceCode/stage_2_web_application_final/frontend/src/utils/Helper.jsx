import { useEffect, useRef } from "react";

/**
 * Parses a HTML query string (e.g. '?id=123&bas=52')
 * @param {String} queryString 
 * @returns {Array<String>}
 */
export function parseHTMLQueryString(queryString) {
  if (queryString[0] === '?') queryString = queryString.substring(1);
  if (queryString.length === 0) return {};

  let rawQueries = queryString.split('&');
  let queries = {};

  rawQueries.forEach(query => {
    let keyValuePairs = query.split('=');
    queries[keyValuePairs[0]] = keyValuePairs[1];
  })
  return queries;
}

/**
 * Returns the value from the previous render cycle.
 * idk i got it from here https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
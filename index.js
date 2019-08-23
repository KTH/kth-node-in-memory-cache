"use strict";

let STORE = {};
const DEFAULT_TTL_MS = 1000;

/**
 * Store an item in the cache
 *
 * @param {*} itemKey Unique key.
 * @param {*} value The value or object to store.
 * @param {*} ttl how many milliseconds should the cache item live? Defaults to DEFAULT_TTL_MS.
 */
const add = (itemKey, value, ttl = DEFAULT_TTL_MS) => {
  STORE[itemKey] = {
    value: value,
    rejectAfterTimestamp: Date.now() + ttl
  };
};

/**
 * Remove an item from the cache
 * @param {*} itemKey Unique key
 */
const remove = itemKey => {
  delete STORE[itemKey];
};

/**
 * Gets the item value matching the itemKey in the store.
 * @param {*} itemKey Unique key
 */
const get = itemKey => {
  const item = STORE[itemKey];
  if (isValidItem(item)) {
    return item.value;
  }
  return undefined;
};

/**
 * Gets the item value matching the itemKey in the store.
 * @param {*} itemKey Unique key
 */
const removeAll = () => {
  STORE = {};
};

/**
 * Gets the item value matching the itemKey in the store.
 * @param {*} itemKey Unique key
 */
const length = () => {
  return Object.keys(STORE).length;
};

/**
 * Gets the full item matching the itemKey in the store. Includes the rejectAfterTimestamp.
 * @param {*} itemKey Unique key
 */
const getFull = itemKey => {
  const item = STORE[itemKey];
  if (isValidItem(item)) {
    return item;
  }
  return undefined;
};

/**
 * Is the item still valid for use?
 */
const isValid = itemKey => {
  return isValidItem(get(itemKey));
};

/**
 * Is the item still valid for use?
 */
const isValidItem = item => {
  if (item == null) {
    return false;
  }
  if (Date.now() > item.rejectAfterTimestamp) {
    return false;
  }
  return true;
};

/**
 * Public exports
 */
module.exports = {
  add: add,
  get: get,
  getFull: getFull,
  remove: remove,
  removeAll: removeAll,
  isValid: isValid,
  length: length,
  DEFAULT_TTL_MS: DEFAULT_TTL_MS
};

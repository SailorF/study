var LRUCache = function (capacity) {
  if (typeof capacity !== "number") {
    return false;
  }
  this.mapList = new Map();
  this.maxLength = capacity;
  this.zIndex = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const item = this.mapList.get(key);
  if (item) {
    this.mapList.set(key, {
      ...item,
      zIndex: ++this.zIndex,
    });
  }
  return item ? item.value : -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.zIndex++;
  this.mapList.set(key, {
    value,
    zIndex: this.zIndex,
  });
  if (this.mapList.size > this.maxLength) {
    let cacheItem = null;

    [...this.mapList].forEach((item) => {
      if (!cacheItem || cacheItem[1].zIndex > item[1].zIndex) {
        cacheItem = item;
      }
    });
    this.mapList.delete(cacheItem[0]);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var obj = new LRUCache(2);
obj.put(1, 1);
obj.put(2, 2);
obj.get(1);
obj.put(3, 3);
obj.get(2);
obj.put(4, 4);
obj.get(1);
obj.get(3);
obj.get(4);

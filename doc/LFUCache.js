/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.size = capacity;
  this.valueMap = new Map(); // 记录值
  this.useMap = new Map(); // 记录使用次数
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (this.valueMap.has(key)) {
    // 当存在时 删掉原来的重新添加  使用值加1
    let use = this.useMap.get(key);
    let value = this.valueMap.get(key);
    this.valueMap.delete(key);
    this.useMap.set(key, use + 1);
    this.valueMap.set(key, value);
    return value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.size === 0) return;
  let min = Math.min(...this.useMap.values()); // 缓存下 最小使用值
  if (this.valueMap.has(key)) {
    // 如果存在 值重新赋, use加一
    this.valueMap.set(key, value);
    let use = this.useMap.get(key);
    this.useMap.set(key, use + 1);
  } else {
    // 不存在就直接加
    this.valueMap.set(key, value);
    this.useMap.set(key, 1);
  }
  // 当超出, 删掉不常用的 当碰到用的次数相同的删掉 较前未使用的
  if (this.valueMap.size > this.size) {
    let it = this.valueMap.keys(); // 缓存 key 遍历器
    let delKey = it.next().value;
    while (this.useMap.get(delKey) !== min) {
      // 获取使用值为 min 的key
      delKey = it.next().value;
    }
    this.useMap.delete(delKey); // 删掉该项
    this.valueMap.delete(delKey);
  }
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

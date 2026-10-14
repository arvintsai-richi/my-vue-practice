
/**
 * 一個 Youbike 的資料表，存放每一筆 Youbike 車站的資料
 */
export class YoubikeDataModel {
  _data = [];
  constructor(data) {
    /** Youbike車站的資料列表 */
    this._data = [];
    this.setData(data);
  }

  /** 取得 Youbike 車站的資料列表 */
  get data() {
    return this._data;
  }

  /** 取得 Youbike 車站的資料列表長度 */
  get length() {
    return this._data.length;
  }

  /**
   * 使用 json object 設定 Youbike 資料
   * @param {YoubikeDataRowModel[]} data 為 Youbike 的每一筆資料
   */
  setData(data) {
    this._data = data ?? []
  }

  /**
   * 使用 json object 設定 Youbike 資料
   * @param {any[] | null} jsonData 陣列形式，每個元素須包含 .ar(地點), .sna(站名), .sarea(場站區域), .latitude(緯度), .longitude(經度), .available_rent_bikes(目前車子數量), .available_return_bikes(目前空位數)
   */
  setDataJson(jsonData) {
    this._data.length = 0;
    if (jsonData == null) {
      return;
    }
    if (!Array.isArray(jsonData)) {
      console.error("[YoubikeDataModel] JsonData in constructor should be an array!");
    }
    jsonData.forEach(jsonDataRow => {
      this.data.push(new YoubikeDataRowModel(jsonDataRow));
    })
  }

  /**
   * 回傳一個新的YoubikeDataModel，依照特定欄位排序, 欄位可以是任何 YoubikeDataRowModel 的屬性
   * @param {string} column 一個 YoubikeDataRowModel 的屬性
   * @param {boolean} asc true 為升序，false 為降序排序，
   */
  sorted(column, asc = true) {
    let sortedData = this._data
    sortedData = sortedData.sort((a, b) => {
      return this._compare(a[column], b[column], asc);
    })
    return new YoubikeDataModel(sortedData);
  }

  _compare(a, b, asc = true) {
    if (a < b) {
      return asc ? -1 : 1;
    } else if (a > b) {
      return asc ? 1 : -1;
    } else {
      return 0;
    }
  }
}

/**
 * 存放一筆 Youbike 車站的資料
 */
export class YoubikeDataRowModel {
  constructor(jsonDataRow) {
    /** 場站區域 */
    this.sarea = jsonDataRow?.sarea ?? ""
    /** 站名 */
    this.sna = jsonDataRow?.sna ?? ""
    /** 地點 */
    this.ar = jsonDataRow?.ar ?? ""
    /** 緯度 */
    this.latitude = parseFloat(jsonDataRow?.latitude) ?? 0.0
    /** 經度 */
    this.longitude = parseFloat(jsonDataRow?.longitude) ?? 0.0
    /** 目前車輛數 */
    this.available_rent_bikes = parseInt(jsonDataRow?.available_rent_bikes) ?? -1
    /** 目前空位數 */
    this.available_return_bikes = parseInt(jsonDataRow?.available_return_bikes) ?? -1
  }

  /** 取得座標 (經度, 緯度) */
  get location() {
    return (this.latitude, this.longitude);
  }
}

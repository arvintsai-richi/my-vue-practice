import { YoubikeDataModel } from './YoubikeDataModel.js'

/**
 * 存放用來過濾 YoubikeData 的資料，包含地點搜尋字串、區域選擇、及過濾沒車車站的選項
 */
export class YoubikeDataFilterModel {

  constructor(areaQueryString = "", selectedSarea = "", hasBikeOnly = false) {
    /** 過濾地點的搜尋字串，預設是空字串("") */
    this.areaQueryString = areaQueryString;
    /** 保留選擇的區域，空字串("")代表顯示任何區域，預設是空字串("") */
    this.selectedSarea = selectedSarea;
    /** 若 true 只顯示有車的站，預設是 false */
    this.hasBikeOnly = hasBikeOnly;
	}

  /**
   * 使用此過濾器過濾 Youbike 資料
   * @param {YoubikeDataModel | null} youbikeData 一個 Youbike 資料表
   * @returns 回傳過濾之後的 Youbike 資料表
   */
	applyTo(youbikeData) {
    if (youbikeData == null) return null;
    return new YoubikeDataModel(
      Array.from(youbikeData.data).filter(dataRow => {
        if (!dataRow.ar.includes(this.areaQueryString)) {
				  return false;
			  }
        if (this.selectedSarea != "" && dataRow.sarea != this.selectedSarea) {
				  return false;
			  }
        if (this.hasBikeOnly && dataRow.available_rent_bikes <= 0) {
				  return false;
			  }
			  return true;
      })
    );
	}
}

'use es6';

import { List } from 'immutable';

export default class TripPriceEstimatesTranslator {
  constructor(tripPriceEstimateTranslator) {
    this.tripPriceEstimateTranslator = tripPriceEstimateTranslator;
  }

  translate(estimates) {
    if (!this.isValid(estimates)) {
      throw new Error(`Invalid estimates: ${estimates}`);
    }

    const priceEstimates = estimates[TripPriceEstimatesTranslator.getPricesFieldName()];

    return List(priceEstimates.map(priceEstimate => {
      return this.tripPriceEstimateTranslator.translate(priceEstimate);
    }));
  }

  isValid(estimates) {
    if (!(TripPriceEstimatesTranslator.getPricesFieldName() in estimates)) {
      return false;
    }

    if (!Array.isArray(estimates[TripPriceEstimatesTranslator.getPricesFieldName()])) {
      return false;
    }

    return true;
  }

  static getPricesFieldName() {
    return 'prices';
  }
}

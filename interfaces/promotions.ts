export interface EvaluatePromotionsResponse {
	totalDiscount: number;
	promotionName: string;
}
//
export interface LineItem {
	sku: string;
	qty: number;
}
//
export interface ValidatedPromotion {
	id: number;
	name: string;
	validityPeriodStart: Date;
	validityPeriodExpiration: Date;
	activated: boolean;
	createdAt: Date;
	updatedAt: Date;
}
//

export interface PromotionItem {
	id: number;
	name: string;
	validityPeriodStart: Date;
	validityPeriodExpiration: Date;
	activated: boolean;
	createdAt: Date;
	updatedAt: Date;
	rules: Rule[];
}

export interface Rule {
	id?: number;
	ruleType: string;
	skus?: null | string[];
	greaterThan: number;
	promotionId?: number;
	actions: Action[];
}

export interface Action {
	id?: number;
	actionType: string;
	discountType: string;
	discountValue: number;
	ruleId?: number;
}
//Creation of a new promotion
export interface PromotionoCreateObj {
	name: string;
	validityPeriodStart: Date;
	validityPeriodExpiration: Date;
	activated: boolean;
	rules: Rule[];
}

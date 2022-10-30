export interface EvaluatePromotionsResponse {
	totalDiscount: number;
	promotionName: string;
}

export interface PromotionType {
	id?: number;
	name: string;
	validityPeriodStart: Date;
	validityPeriodExpiration: Date;
	activated: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	rules: Rule[];
}

export interface Rule {
	id?: number;
	ruleType: string;
	skus?: null | string[];
	greaterThan: number;
	promotionId?: number;
	actions: ActionType[];
}

export interface ActionType {
	id?: number;
	actionType: string;
	discountType: string;
	discountValue: number;
	ruleId?: number;
}
//Creation of a new promotion

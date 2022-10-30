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
	createdAt: Date;
	updatedAt: Date;
	rules: RuleType[];
}

export interface RuleType {
	id?: number;
	ruleType: string;
	skus: string[];
	greaterThan: number;
	promotionId?: number;
	actions: ActionType[];
	dataValues: RuleType;
}

// interface DataValuesType {
// 	ruleType: string;
// 	skus: string[];
// 	greaterThan: number;
// }

export interface ActionType {
	id?: number;
	actionType: string;
	discountType: string;
	discountValue: number;
	ruleId?: number;
	dataValues: ActionType;
}
//Creation of a new promotion

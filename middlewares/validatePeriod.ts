import { NextFunction, Request, Response } from 'express';

export const validatePeriod = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { validityPeriodStart, validityPeriodExpiration } = req.body;
	if (validityPeriodStart > validityPeriodExpiration) {
		return res.status(400).json({
			ok: false,
			msg: 'Validity period start should be less than validity period expiration',
		});
	}
	next();
};

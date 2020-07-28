import { CheckoutStepsEnum } from '../enums/checkout-steps.enum';

export class BottomNavModel {
  rightButton?: {
    text: string;
    icon: string;
    iconOnLeft?: boolean;
  };
  leftButton?: {
    text: string;
    icon: string;
  };
  currentStep: CheckoutStepsEnum;
}

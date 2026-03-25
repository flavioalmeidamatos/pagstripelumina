import type { CartItem } from "@/types/domain";

export type CouponShape =
  | {
      code: string;
      discount_type: "fixed" | "percentage";
      discount_value: number;
    }
  | {
      code: string;
      discountType: "fixed" | "percentage";
      discountValue: number;
    }
  | null;

export function calculateCartTotals(
  items: CartItem[],
  shippingFlatRate: number,
  coupon: CouponShape
) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const couponType =
    coupon && "discount_type" in coupon ? coupon.discount_type : coupon?.discountType;
  const couponValue =
    coupon && "discount_value" in coupon ? coupon.discount_value : coupon?.discountValue;

  const discount =
    couponType === "percentage"
      ? Number(((subtotal * (couponValue ?? 0)) / 100).toFixed(2))
      : Math.min(subtotal, couponValue ?? 0);

  const total = Math.max(subtotal + shippingFlatRate - discount, 0);

  return {
    subtotal,
    shipping: shippingFlatRate,
    discount,
    total
  };
}

import prisma from "./prisma";


export interface CouponInput {
  code: string;
  name: string;
  description?: string;
  discountValue: number;
  maxUses?: number;
  minPurchaseAmount?: number;
  validFrom: Date;
  validUntil: Date;
  flightIds?: number[];
  hotelIds?: number[];
  rentalIds?: number[];
}

export async function createCoupon(data: CouponInput) {
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        name: data.name,
        description: data.description,
        discountValue: data.discountValue,
        maxUses: data.maxUses,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
        flightIds: data.flightIds || [],
        hotelIds: data.hotelIds || [],
        rentalIds: data.rentalIds || [],
        flights: {
          connect: (data.flightIds || []).map((id) => ({ id })),
        },
        hotels: {
          connect: (data.hotelIds || []).map((id) => ({ id })),
        },
        rentals: {
          connect: (data.rentalIds || []).map((id) => ({ id })),
        },
      },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });
    return coupon;
  } catch (error) {
    throw new Error(`Failed to create coupon: ${error}`);
  }
}

export async function getCouponByCode(code: string) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });
    return coupon;
  } catch (error) {
    throw new Error(`Failed to get coupon: ${error}`);
  }
}

export async function getCouponById(id: number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });
    return coupon;
  } catch (error) {
    throw new Error(`Failed to get coupon: ${error}`);
  }
}

export async function getAllCoupons(skip: number = 0, take: number = 10) {
  try {
    const coupons = await prisma.coupon.findMany({
      skip,
      take,
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const total = await prisma.coupon.count();
    return { coupons, total };
  } catch (error) {
    throw new Error(`Failed to get coupons: ${error}`);
  }
}

export async function validateCoupon(code: string, purchaseAmount?: number) {
  try {
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return { valid: false, error: "Coupon not found" };
    }

    const now = new Date();

    if (!coupon.isActive) {
      return { valid: false, error: "Coupon is not active" };
    }

    if (now < coupon.validFrom) {
      return { valid: false, error: "Coupon is not yet valid" };
    }

    if (now > coupon.validUntil) {
      return { valid: false, error: "Coupon has expired" };
    }

    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return { valid: false, error: "Coupon usage limit reached" };
    }


    return {
      valid: true,
      coupon,
      discount: coupon.discountValue,
    };
  } catch (error) {
    return { valid: false, error: `Validation failed: ${error}` };
  }
}

export async function useCoupon(code: string) {
  try {
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      throw new Error("Coupon not found");
    }

    const updated = await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        currentUses: {
          increment: 1,
        },
      },
    });

    return updated;
  } catch (error) {
    throw new Error(`Failed to use coupon: ${error}`);
  }
}

export async function updateCoupon(id: number, data: Partial<CouponInput>) {
  try {
    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        ...(data.code && { code: data.code.toUpperCase() }),
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.discountValue && { discountValue: data.discountValue }),
        ...(data.maxUses !== undefined && { maxUses: data.maxUses }),
        ...(data.minPurchaseAmount !== undefined && {
          minPurchaseAmount: data.minPurchaseAmount,
        }),
        ...(data.validFrom && { validFrom: new Date(data.validFrom) }),
        ...(data.validUntil && { validUntil: new Date(data.validUntil) }),
        ...(data.flightIds && {
          flightIds: data.flightIds,
          flights: {
            set: data.flightIds.map((id) => ({ id })),
          },
        }),
        ...(data.hotelIds && {
          hotelIds: data.hotelIds,
          hotels: {
            set: data.hotelIds.map((id) => ({ id })),
          },
        }),
        ...(data.rentalIds && {
          rentalIds: data.rentalIds,
          rentals: {
            set: data.rentalIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        flights: true,
        hotels: true,
        rentals: true,
      },
    });

    return coupon;
  } catch (error) {
    throw new Error(`Failed to update coupon: ${error}`);
  }
}

export async function deleteCoupon(id: number) {
  try {
    await prisma.coupon.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete coupon: ${error}`);
  }
}

export async function getCouponsByResource(
  resourceType: "flight" | "hotel" | "rental",
  resourceId: number
) {
  try {
    let coupons;

    if (resourceType === "flight") {
      coupons = await prisma.coupon.findMany({
        where: {
          flightIds: {
            has: resourceId,
          },
        },
        include: {
          flights: true,
          hotels: true,
          rentals: true,
        },
      });
    } else if (resourceType === "hotel") {
      coupons = await prisma.coupon.findMany({
        where: {
          hotelIds: {
            has: resourceId,
          },
        },
        include: {
          flights: true,
          hotels: true,
          rentals: true,
        },
      });
    } else if (resourceType === "rental") {
      coupons = await prisma.coupon.findMany({
        where: {
          rentalIds: {
            has: resourceId,
          },
        },
        include: {
          flights: true,
          hotels: true,
          rentals: true,
        },
      });
    }

    return coupons || [];
  } catch (error) {
    throw new Error(
      `Failed to get coupons for resource: ${error}`
    );
  }
}
// Utility functions for date-based coupon filtering
export interface Coupon {
  id: number;
  code: string;
  name: string;
  discountValue: number;
  validFrom: string | Date;
  validUntil: string | Date;
  isActive?: boolean;
}

export const isCouponValidForDateRange = (
  coupon: Coupon,
  startDate: Date,
  endDate: Date
): boolean => {
  if (coupon.isActive === false) return false;

  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);

  // Reset time to midnight for accurate date comparison
  validFrom.setHours(0, 0, 0, 0);
  validUntil.setHours(23, 59, 59, 999);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  // Coupon must cover the entire date range
  return validFrom <= startDate && validUntil >= endDate;
};

export const getValidCouponsForDateRange = (
  coupons: Coupon[],
  startDate: Date,
  endDate: Date
): Coupon[] => {
  return coupons.filter((coupon) =>
    isCouponValidForDateRange(coupon, startDate, endDate)
  );
};

export const parseDateString = (dateStr: string): Date | null => {
  if (!dateStr || dateStr === 'any') return null;

  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
};
export interface CommissionModel {
  commissionBy?: string;

  orderDetailID: number;
  orderID: number;
  orderCode: string;
  productName: string;
  totalCostPrice: number | null;
  totalSellingPrice: number | null;
  qty: number;
  unitCostPrice: number | null;
  unitSellingPrice: number | null;
  totalAmount: number;
  productCode: string;
  productID: number;
  discountPrice: number | null;
  discountPercentage: number;
  status: string | null;
  comment: string | null;
  createDateTime: string;
  updateDateTime: string | null;
  remark: string | null;
  updateBy: string | null;
  marketingBy: string;
  doctorBy: string | null;
  isMarketingCommission: number;
  isDoctorCommission: number;
  isActive: number;
  productDTO: any | null;
  orderStatus:string;
  orderType:string;
  userCommission:number;
  totalCommission:number;
  deliveryFee:number;
}




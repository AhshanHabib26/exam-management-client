/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TPackageProps } from "@/types/common.data";
import { usePurchasePackageMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MannualPayment: React.FC<TPackageProps> = ({ service }) => {
  const navigate = useNavigate();
  const [purchasePackage] = usePurchasePackageMutation();

  console.log(service);

  // State to track form data
  const [formData, setFormData] = useState({
    paymentMethod: "",
    phoneNumber: "",
    transactionId: "",
    payableAmount: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({
    paymentMethod: "",
    phoneNumber: "",
    transactionId: "",
    payableAmount: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when input is filled
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));

    // Clear error when input is filled
    setErrors((prev) => ({ ...prev, paymentMethod: "" }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors: typeof errors = {
      paymentMethod: "",
      phoneNumber: "",
      transactionId: "",
      payableAmount: "",
    };

    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Payment method is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required.";
    if (!formData.payableAmount)
      newErrors.payableAmount = "Payable amount is required.";

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const payload = {
        ...formData,
        serviceId: service._id,
        points: service.points
      };
      
      const res = await purchasePackage(payload).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate(`/`);
      }
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="border border-gray-800 p-4 mt-5 rounded-lg">
      <div>
        <label htmlFor="paymentmethod">Payment Method</label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="h-[40px] border-gray-800">
            <SelectValue placeholder="Choose Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Method</SelectLabel>
              <SelectItem value="bkash">01966382620(Bkash-Personal)</SelectItem>
              <SelectItem value="nagadh">
                01966382620(Nagad-Personal)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
        )}
      </div>
      <div className="my-3">
        <Label htmlFor="phoneNumber">Bkash / Nagad No.</Label>
        <Input
          type="text"
          name="phoneNumber"
          autoComplete="off"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter Reference Mobile Number"
          required
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
      </div>
      <div>
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          autoComplete="off"
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter Transaction ID"
          required
        />
        {errors.transactionId && (
          <p className="text-red-500 text-sm">{errors.transactionId}</p>
        )}
      </div>
      <div className="my-3">
        <Label htmlFor="payableAmount">Payable Amount</Label>
        <Input
          type="text"
          name="payableAmount"
          value={formData.payableAmount}
          autoComplete="off"
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter the Amount Paid."
          required
        />
        {errors.payableAmount && (
          <p className="text-red-500 text-sm">{errors.payableAmount}</p>
        )}
      </div>
      <div>
        <Button
          className="bg-BgPrimary hover:bg-BgPrimaryHover"
          onClick={handleSubmit}
        >
          Submit Activation Request
        </Button>
      </div>
    </div>
  );
};

export default MannualPayment;

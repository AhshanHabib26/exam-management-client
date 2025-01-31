/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/lib/DatePicker";
import { DashboardLoader } from "@/loader/DashboardLoader";
import {
  useCreatePackageMutation,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "@/redux/features/package/packageApi";
import { TResponse } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface FormData {
  title: string;
  price: string;
  offerPrice?: string;
  isOfferActive: boolean;
  points: string;
  offerStartDate?: string;
  offerEndDate?: string;
}

const CreatePlanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    offerPrice: "",
    isOfferActive: false,
    points: "",
    offerStartDate: "",
    offerEndDate: "",
  });

  // API hooks
  const { data: packageData, isFetching: isFetchingPackages } =
    useGetSinglePackageQuery(id);
  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();

  // Helper function to format dates as "yyyy-mm-dd"
  const formatDate = (date: string | Date | undefined) => {
    if (date) {
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    }
    return "";
  };

  // Prefill form data for update
  useEffect(() => {
    if (packageData?.data?.result) {
      const { result } = packageData.data;
      setFormData({
        title: result.title || "",
        price: result.price || "",
        offerPrice: result.offerPrice || "",
        isOfferActive: result.isOfferActive || false,
        points: result.points || "",
        offerStartDate: formatDate(result.offerStartDate),
        offerEndDate: formatDate(result.offerEndDate),
      });
    }
  }, [packageData]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.points) {
      return toast.error("All input values are required!");
    }

    const action = id ? "Updating" : "Creating";
    const toastId = toast.loading(`${action} package...`);

    try {
      const response = id
        ? ((await updatePackage({ id, data: formData })) as TResponse<any>)
        : ((await createPackage(formData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          id
            ? "Package updated successfully!"
            : "Package created successfully!",
          { id: toastId }
        );
        navigate("/admin/dashboard/package");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-semibold mb-3 text-gray-700">
        {id ? "Update Package" : "Create Package"}
      </h1>
      {isFetchingPackages ? (
        <DashboardLoader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="title"
            className="h-[50px]"
            placeholder="Package Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <Input
              name="price"
              className="h-[50px]"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <Input
              name="offerPrice"
              className="h-[50px]"
              placeholder="Offer Price"
              value={formData.offerPrice}
              onChange={handleInputChange}
            />
            <Input
              name="points"
              className="h-[50px]"
              placeholder="Points"
              value={formData.points}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
            <DatePicker
              label="Pick a start date"
              date={formData.offerStartDate}
              onChange={(newDate) =>
                setFormData((prev) => ({ ...prev, offerStartDate: newDate }))
              }
            />
            <DatePicker
              label="Pick an end date"
              date={formData.offerEndDate}
              onChange={(newDate) =>
                setFormData((prev) => ({ ...prev, offerEndDate: newDate }))
              }
            />
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isOfferActive"
              checked={formData.isOfferActive}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  isOfferActive: !prev.isOfferActive,
                }))
              }
            />
            <span className="text-[16px] font-medium text-gray-700">
              Is Offer Active
            </span>
          </label>
          <div className="flex items-end justify-end">
            <Button
              className="bg-BgPrimary hover:bg-BgPrimaryHover h-[40px] text-lg font-light"
              type="submit"
            >
              {id ? "Update Package" : "Create Package"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePlanPage;

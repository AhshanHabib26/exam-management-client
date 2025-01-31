/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import Swal from "sweetalert2";

export const handleUserAction = async (
  action: (id: string) => any,
  id: string,
  successMessage: string
) => {
  // Show a confirmation dialog to the user before proceeding
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `${successMessage}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "No, cancel",
  });

  if (result.isConfirmed) {
    const toastId = toast.loading(`${successMessage}...`);

    try {
      // Trigger the mutation
      const response = await action(id).unwrap(); // unwrap to access the response directly

      // Check for errors and success
      if (response.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.error.data.message,
          timer: 1500,
        });
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Action completed successfully.",
          timer: 1000,
        });
        toast.success("Action completed successfully.", {
          id: toastId,
          duration: 1000,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${errorMessage}`,
        timer: 1500,
      });
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  } else {
    // If the user cancels, you can provide feedback or just exit
    toast.dismiss();
    Swal.fire({
      icon: "info",
      title: "Action Cancelled",
      text: "You have cancelled the action.",
      timer: 1000,
    });
  }
};

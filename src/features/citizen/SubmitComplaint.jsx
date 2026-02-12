import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitComplaint } from "../../api/complaints.api";

const SubmitComplaint = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComplaint,
    onSuccess: () => {
      // refresh complaints list automatically
      queryClient.invalidateQueries(["complaints"]);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      title: "Water issue",
      description: "No water in area",
    });
  };

  return (
    <div>
      <button onClick={handleSubmit}>
        {mutation.isLoading ? "Submitting..." : "Submit Complaint"}
      </button>
    </div>
  );
};

export default SubmitComplaint;

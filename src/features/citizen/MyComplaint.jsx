import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "../../api/complaints.api";

const MyComplaints = () => {
  const {
    data: complaints,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: getComplaints,
  });

  if (isLoading) return <p>Loading complaints...</p>;
  if (isError) return <p>Error loading complaints</p>;

  return (
    <div>
      <h2>My Complaints</h2>

      {complaints.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyComplaints;

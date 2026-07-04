function StatusBadge({ status }) {
  return (
    <span
      className={`badge ${
        status === "Active"
          ? "bg-success"
          : "bg-danger"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
function PageHeader({
  title,
  buttonText,
  onClick,
  modalId,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>{title}</h2>

      {buttonText && (
        <button
          className="btn btn-primary"
          onClick={onClick}
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default PageHeader;
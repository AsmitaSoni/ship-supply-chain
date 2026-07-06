function ConfirmDeleteModal({
  title,
  message,
  onConfirm,
}) {
  return (
    <div
      className="modal fade"
      id="confirmDeleteModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <p>{message}</p>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
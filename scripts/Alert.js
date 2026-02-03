function showAlert(message, type = "success") {
    const alertContainer = document.getElementById("alert-container");

    alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 3000);
}
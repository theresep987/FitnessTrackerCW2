document.addEventListener('DOMContentLoaded', () => {
  const forms = {
    logWorkoutForm: 'https://prod-30.uksouth.logic.azure.com:443/workflows/908cb51074b34ef48f4b78b5d73a12d1/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=3iF9JdAbGTJw5HBx1BACTj7iYsDtzZT9XcbKLWgNdW4',
  };

  Object.keys(forms).forEach((formId) => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await fetch(forms[formId], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            alert('Submitted successfully!');
            form.reset();
          } else {
            alert('Failed to submit. Try again.');
          }
        } catch (err) {
          console.error(err);
          alert('Error submitting form!');
        }
      });
    }
  });
});

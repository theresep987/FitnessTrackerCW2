document.addEventListener('DOMContentLoaded', () => {
    const forms = {
      logWorkoutForm: '<API endpoint for logging workouts>',
      logHydrationForm: '<API endpoint for logging hydration>',
      logNutritionForm: '<API endpoint for logging nutrition>',
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
  
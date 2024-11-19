document.addEventListener('DOMContentLoaded', () => {
  const apiEndpoints = {
      logWorkoutForm: 'https://prod-30.uksouth.logic.azure.com:443/workflows/908cb51074b34ef48f4b78b5d73a12d1/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=3iF9JdAbGTJw5HBx1BACTj7iYsDtzZT9XcbKLWgNdW4',
      getWorkouts: 'https://prod-25.uksouth.logic.azure.com:443/workflows/a4882769802044b59bfecc89b2f0dc6e/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=X2QcmgMo7bYqhC_vAFNZeSYLmon3VKOgryIMfiby_BY',
      deleteWorkout: 'https://prod-23.uksouth.logic.azure.com/workflows/ca9222a1851d44eb86b4242ba75a53ba/triggers/When_a_HTTP_request_is_received/paths/invoke/DeleteWorkout/%7BID%7D?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=wqaRhySNZu4hVxWnZ4dRwiCwgUjm9G1ew-RidjyY-xk'
  };

  // Fetch Workouts and Display Data
  const fetchWorkouts = async () => {
      try {
          const response = await fetch(apiEndpoints.getWorkouts, {
              method: 'GET',
          });
          if (response.ok) {
              const data = await response.json();
              displayWorkouts(data);
          } else {
              alert('Failed to fetch workouts.');
          }
      } catch (err) {
          console.error(err);
          alert('Error fetching workouts.');
      }
  };

  // Display Workouts in a Table
  const displayWorkouts = (workouts) => {
      const tableBody = document.getElementById('workoutsTableBody');
      tableBody.innerHTML = '';
      workouts.forEach((workout) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${workout.WorkoutID}</td>
              <td>${workout.UserID}</td>
              <td>${workout.Type}</td>
              <td>${workout.Duration}</td>
              <td>${workout.CaloriesBurned}</td>
              <td>${workout.Date}</td>
              <td>
                  <button class="delete-btn" data-id="${workout.WorkoutID}">Delete</button>
              </td>
          `;
          tableBody.appendChild(row);
      });

      // Add event listeners to delete buttons
      document.querySelectorAll('.delete-btn').forEach((button) => {
          button.addEventListener('click', (e) => {
              const id = e.target.getAttribute('data-id');
              deleteWorkout(id);
          });
      });
  };

  // Delete a Workout
  const deleteWorkout = async (id) => {
      try {
          const deleteURL = apiEndpoints.deleteWorkout.replace('%7BID%7D', id); // Replace {ID} in URL
          const response = await fetch(deleteURL, {
              method: 'DELETE',
          });
          if (response.ok) {
              alert('Workout deleted successfully.');
              fetchWorkouts(); // Refresh the table
          } else {
              alert('Failed to delete workout.');
          }
      } catch (err) {
          console.error(err);
          alert('Error deleting workout.');
      }
  };

  // Fetch Workouts on Page Load
  fetchWorkouts();
});

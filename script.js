document.addEventListener("DOMContentLoaded", function () {
      const categories = ["academic", "personal", "physical", "spiritual", "social"];
      
      // Define extracurricular activities with their points per category here
      const extracurriculars = [
        {
          name: "Swim",
          points: {academic: 0, personal: 2, physical: 5, spiritual: 0, social: 4}
        },
        {
          name: "CSF",
          points: {academic: 5, personal: 3, physical: 0, spiritual: 0, social: 2}
        },
        {
          name: "Church Co-Worker",
          points: {academic: 0, personal: 2, physical: 0, spiritual: 5, social: 4}
        },
        {
          name: "Photography and Videography",
          points: {academic: 0, personal: 4, physical: 0, spiritual: 0, social: 4}
        },
      ];

      // Calculate total points by summing by category across all extracurriculars
      function calculateTotalPoints() {
        let totals = {};
        categories.forEach(cat => { totals[cat] = 0; });
        extracurriculars.forEach(ex => {
          categories.forEach(cat => {
            totals[cat] += ex.points[cat] || 0;
          });
        });
        return totals;
      }

      // Initial radar data shows total points
      let dataPoints = calculateTotalPoints();
      const ctx = document.getElementById('radarChart').getContext('2d');
      let radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: categories,
          datasets: [{
            label: 'Total Points',
            data: categories.map(cat => dataPoints[cat]),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)'
          }]
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 15,
              ticks: {
                stepSize: 3,
                color: '#ffffff'
              },
              grid: {
                color: 'rgba(255,255,255,0.2)'
              },
              angleLines: {
                color: 'rgba(255,255,255,0.3)'
              },
              pointLabels: {
                color: '#ffffff',
                font: {
                  size: 14,
                  weight: 'bold',
                  family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
                font: {
                  size: 16
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });

      // Populate extracurriculars list and add hover handlers
      const listEl = document.getElementById('extracurricularList');
      extracurriculars.forEach((ex) => {
        const li = document.createElement('li');
        li.textContent = ex.name;
        li.addEventListener('mouseenter', () => {
          radarChart.data.datasets[0].label = ex.name + " Points";
          radarChart.data.datasets[0].data = categories.map(cat => ex.points[cat] || 0);
          radarChart.update();
        });
        li.addEventListener('mouseleave', () => {
          radarChart.data.datasets[0].label = 'Total Points';
          radarChart.data.datasets[0].data = categories.map(cat => dataPoints[cat]);
          radarChart.update();
        });
        listEl.appendChild(li);
      });
    });

// 'use strict';

// /**
//  * navbar toggle
//  */

// const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
// const header = document.querySelector("[data-header]");

// navToggleBtn.addEventListener("click", function () {
//   this.classList.toggle("active");
//   header.classList.toggle("active");
// });



// /**
//  * show go top btn when scroll window to 500px
//  */

// const goTopBtn = document.querySelector("[data-go-top]");

// window.addEventListener("scroll", function () {
//   window.scrollY >= 500 ? goTopBtn.classList.add("active")
//     : goTopBtn.classList.remove("active");
// });
function toggleCardDisplay() {
    const centeredCard = document.querySelector('.centered-card');
    const cardDisplayStyle = centeredCard.style.display;
  
    if (cardDisplayStyle === 'block') {
      centeredCard.style.display = 'none';
    } else {
      centeredCard.style.display = 'block';
    }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const vacationForm = document.getElementById('vacation-form');
  
    vacationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Get form values
      const name = document.getElementById('name').value;
      const numberOfPeople = document.getElementById('people').value;
      const relation = document.getElementById('relation').value;
      const budget = document.getElementById('budget').value;
      const vacationType = document.getElementById('vacation').value;
  
      // You can now use 'name', 'numberOfPeople', 'budget', and 'vacationType' in your JavaScript logic
      console.log('Name:', name);
      console.log('Number of People:', numberOfPeople);
      console.log('Budget:', budget);
      console.log('Vacation Type:', vacationType);
   // Fetch request to server
    //     fetch('/',{method:'POST',
    //     headers:{'Accept':'application/json','Content-Type':'application/json'},
    //     body:JSON.stringify({name: name,numberofPeople:numberOfPeople,budget:budget,vacationType:vacationType,relation:relation})}).then(data =>{
    //         data.json().then(res => {
                
    //             console.log(res);
    //     });
    //     })
    //   // Add your logic here to handle the form data, such as sending it to a server or processing it further
    // });

    fetch('/', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, numberofPeople: numberOfPeople, budget: budget, vacationType: vacationType, relation: relation })
  }).then(data => {
      if (data.ok) {
          data.json().then(res => {
              console.log(res+"test");
              alert(res.message);
          });
      } else {
          console.error('Error: Server response is not valid JSON or empty.');
      }
  }).catch(error => {
      console.error('Error:', error);
  });
  
  });
});
  
  // frontend.js
  
//   document.addEventListener('DOMContentLoaded', function () {
//     const vacationForm = document.getElementById('vacation-form');
  
//     vacationForm.addEventListener('submit', function (event) {
//       event.preventDefault();
//       // Get form values
//       const name = document.getElementById('name').value;
//       const numberOfPeople = document.getElementById('people').value;
//       const budget = document.getElementById('budget').value;
//       const vacationType = document.getElementById('vacation').value;
  
//       // Create the data object with the form inputs
//       const data = {
//         name: name,
//         people: numberOfPeople,
//         budget: budget,
//         vacation: vacationType,
//       };
  
//       // Send the form data to the server using an HTTP POST request
//       fetch('http://localhost:3000/recommendations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // Handle the response from the server (recommendations)
//           const recommendations = data.recommendations;
//           console.log('Recommendations:', recommendations);
//           // You can now use the recommendations in your JavaScript frontend logic
//           // For example, display the recommendations on the page or use them in any other way you need.
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     });
//   });
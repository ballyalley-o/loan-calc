//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calcRes, 2000);


    e.preventDefault();
});

//calc results
function calcRes(){
    console.log('calculating results...');


    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal*x*calcInterest)/(x-1);

    if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calcPayments).toFixed(2);
      totalInterest.value = (monthly * calcPayments - principal).toFixed(2);

      //hide results
      document.getElementById("results").style.display = "block";

      //show loader
      document.getElementById("loading").style.display = "none";

    } else {
        showErr('Please check the values')

    }
};

function showErr(error) {
  //hide results
  document.getElementById("results").style.display = "none";

  //hide loader
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearErr, 3000);
}

function clearErr() {
    document.querySelector('.alert').remove();

}
